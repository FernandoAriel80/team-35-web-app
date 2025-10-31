import { useEffect, useState } from "react"

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table"

import { Table } from "../../components/Table"
import type { Data, StatusRequest } from "../../interfaces"
import { changeRequestState, createSubmission, getAllRequests } from "../../services/requests.service"
import { DocumentsModal } from "../../components/modals/DocumentsModal"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "@tanstack/react-router"

interface DocumentLink {
  url: string
  name: string
}

export const Dashboard = () => {
  const navigate = useNavigate()

  const [requests, setRequests] = useState<Data[]>([])

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [documentLinks, setDocumentLinks] = useState<DocumentLink[]>([])

  const { onLogout } = useAuth()

  const columnHelper = createColumnHelper<Data>()


  const handleCreateSubmission = (data: { creditApplicationId: string, email: string }) => {
    const token = window.localStorage.getItem('token')
    if (!token) return

    createSubmission(token, data)
      .then(() => {
        getAllRequests(token)
          .then(({ data }) => setRequests(data))
          .catch(error => console.error(error))
      })

  }

  const handleChangeRequestState = (data: { creditApplicationId: string, status: StatusRequest }) => {
    const token = window.localStorage.getItem('token')

    if (!token) return

    changeRequestState(token, data)
      .then(() => {
        getAllRequests(token)
          .then(({ data }) => setRequests(data))
          .catch(error => console.error(error))
      })
  }

  const handleLogout = () => {
    onLogout()
    navigate({ to: '/' })
  }

  const columns = [
    columnHelper.accessor('id', {
      header: 'Id de Solicitud',
    }),
    columnHelper.accessor('company.name', {
      header: 'Compania',
    }),
    columnHelper.accessor('company.email', {
      header: 'Email (Compania)',
    }),
    columnHelper.accessor('company.user.name', {
      header: 'Cliente',
    }),
    columnHelper.accessor('company.user.email', {
      header: 'Email (Cliente)',
    }),
    columnHelper.accessor('createdAt', {
      header: 'Fecha',
      cell: ({ getValue }) => {
        const date = getValue()

        return date
      }
    }),
    columnHelper.accessor('requestedAmount', {
      header: 'Monto',
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      },
    }),
    columnHelper.accessor('status', {
      header: 'Estado',
      cell: ({ getValue, row }) => {
        let status = getValue() as StatusRequest

        const { digitalSignature }: Data = row.original

        const hasSignature = digitalSignature.length > 0

        if (hasSignature && status !== 'APPROVED') status = 'PENDING'

        const styles = {
          PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
          APPROVED: "bg-green-100 text-green-800 border-green-300",
          REJECTED: "bg-red-100 text-red-800 border-red-300",
          PENDING_SIGN: "bg-blue-100 text-blue-800 border-blue-300",
        }

        const statusSpanishMap = {
          PENDING: 'Pendiente',
          APPROVED: 'Aprobado',
          REJECTED: 'Rechazado',
          PENDING_SIGN: 'Pendiente de Firma',
        };

        return (
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full border ${styles[status] || "bg-gray-100 text-gray-800 border-gray-300"
              }`}
          >
            {statusSpanishMap[status]}
          </span>
        );
      },
    }),
    columnHelper.accessor('documents', {
      header: 'Documentos',
      cell: ({ getValue }) => {
        const documentsData = getValue()

        if (documentsData.length <= 0) return null

        return (
          <button
            className="text-blue-900 hover:underline hover:cursor-pointer"
            onClick={() => {
              const documentsMap = documentsData.map(({ url }, index) => ({
                url,
                name: `Documento ${index + 1}`
              }))

              setDocumentLinks(documentsMap)
              setIsOpenModal(true)
            }}
          >
            Ver Documentos
          </button>
        )
      }
    }),
    columnHelper.display({
      header: 'Documento Firmado',
      cell: ({ row }) => {
        const { digitalSignature } = row.original;

        if (!digitalSignature || !digitalSignature[0]?.url) {
          return <span className="text-slate-400">No disponible</span>;
        }

        const url = digitalSignature[0].url;

        return (
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-900">
            <h1>Ver Documento</h1>
          </a>
        );
      }
    }),

    columnHelper.display({
      header: 'Acciones',
      cell: ({ row }) => {
        const { status, id, company, digitalSignature }: Data = row.original

        const hasSignature = digitalSignature.length > 0

        const inputData = {
          creditApplicationId: id.toString(),
          email: company.user.email
        }


        if (hasSignature && status !== 'APPROVED') {
          return (
            <div className="flex gap-2">
              <button
                onClick={() => handleChangeRequestState({ creditApplicationId: inputData.creditApplicationId, status: 'APPROVED' })}
                className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors hover:cursor-pointer"
              >
                Aprobar
              </button>

              <button
                className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-100 hover:bg-red-200 rounded-lg transition-colors hover:cursor-pointer"
                onClick={() => handleChangeRequestState({ creditApplicationId: inputData.creditApplicationId, status: 'REJECTED' })}
              >
                Rechazar
              </button>
            </div>
          )
        }

        if (status === 'PENDING') {
          return (
            <div className="flex gap-2">
              <button
                onClick={() => handleCreateSubmission(inputData)}
                className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors hover:cursor-pointer"
              >
                Enviar a firmar
              </button>

              <button
                className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-100 hover:bg-red-200 rounded-lg transition-colors hover:cursor-pointer"
                onClick={() => handleChangeRequestState({ creditApplicationId: inputData.creditApplicationId, status: 'REJECTED' })}
              >
                Rechazar
              </button>
            </div>
          )
        }

        return null
      },
    }),
  ] as ColumnDef<Data>[]


  useEffect(() => {
    const token = window.localStorage.getItem('token')

    if (!token) return

    getAllRequests(token)
      .then(({ data }) => setRequests(data))
      .catch(error => console.error(error))
  }, [])

  return (
    <div className="flex min-h-screen bg-background-light font-sans text-background-dark">
      {/* Sidebar */}
      <aside className="flex h-screen w-64 flex-col border-r border-slate-300 bg-background-light p-6">
        <h1 className="text-lg font-bold text-center w-full">Fintech Solutions</h1>
        <button className="gap-3 rounded-lg bg-primary/20 px-3 py-2 text-sm font-medium text-primary mt-8 bg-blue-200 text-blue-500">
          Solicitudes de Usuarios
        </button>

        <button
          className='px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-blue-50 transition text-center cursor-pointer mt-auto'
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Solicitudes de Crédito</h1>
          <p className="mt-1 text-background-dark/60">
            Revisa y gestiona todas las solicitudes de crédito de tus clientes.
          </p>
        </div>

        {/* Table */}
        <Table data={requests} columns={columns} />
      </main>

      <DocumentsModal
        documents={documentLinks}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </div>
  )
}
