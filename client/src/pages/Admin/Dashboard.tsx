import { useEffect, useState } from "react"

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table"

import { Table } from "../../components/Table"
import type { Data, StatusRequest } from "../../interfaces"
import { getAllRequests } from "../../services/requests.service"
import { DocumentsModal } from "../../components/modals/DocumentsModal"

interface DocumentLink {
  url: string
  name: string
}

export const Dashboard = () => {
  const columnHelper = createColumnHelper<Data>()

  const [requests, setRequests] = useState<Data[]>([])

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [documentLinks, setDocumentLinks] = useState<DocumentLink[]>([])

  useEffect(() => {
    const token = window.localStorage.getItem('token')

    if (!token) return

    getAllRequests(token)
      .then(({ data }) => setRequests(data))
      .catch(error => console.error(error))

  }, [])


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
      cell: ({ getValue }) => {
        const status = getValue() as StatusRequest

        const styles = {
          PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
          APPROVED: "bg-green-100 text-green-800 border-green-300",
          REJECTED: "bg-red-100 text-red-800 border-red-300",
        };

        const statusSpanishMap = {
          PENDING: 'Pendiente',
          APPROVED: 'Aprobado',
          REJECTED: 'Rechazado',
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
      header: 'Acciones',
      cell: ({ row }) => {
        const { status }: Data = row.original

        if (status !== 'PENDING') return null

        return (
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors hover:cursor-pointer"
            >
              Enviar a firmar
            </button>

            <button
              className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-100 hover:bg-red-200 rounded-lg transition-colors hover:cursor-pointer"
            >
              Rechazar
            </button>
          </div>
        )
      },
    }),
  ] as ColumnDef<Data>[]


  return (
    <div className="flex min-h-screen bg-background-light font-sans text-background-dark">
      {/* Sidebar */}
      <aside className="flex h-screen w-64 flex-col border-r border-slate-300 bg-background-light p-6">
        <h1 className="text-lg font-bold text-center w-full">Fintech Solutions</h1>
        <button className="gap-3 rounded-lg bg-primary/20 px-3 py-2 text-sm font-medium text-primary mt-8 bg-blue-200 text-blue-500">
          Solicitudes de Usuarios
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
