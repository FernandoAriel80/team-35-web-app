import { useEffect, useState } from 'react';

import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';

import { DocumentsModal } from '../../components/modals/DocumentsModal';
import { Table } from '../../components/Table';
import type { Request, StatusRequest } from '../../interfaces';
import { getRequestsByUserId } from '../../services/requests.service';


interface DocumentLink {
  url: string
  name: string
}

const columnHelper = createColumnHelper<Request>()

export const Requests = () => {
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const [requests, setRequests] = useState<Request[]>([])

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [documentLinks, setDocumentLinks] = useState<DocumentLink[]>([])

  const columns = [
    columnHelper.accessor('id', {
      header: 'Id de Solicitud',
    }),
    columnHelper.accessor('createdAt', {
      header: 'Fecha',
      cell: ({ getValue }) => {
        const date = getValue()

        return new Date(date).toISOString().split('T')[0]
      }
    }),
    columnHelper.accessor('requestedAmount', {
      header: 'Monto',
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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
    columnHelper.accessor('status', {
      header: 'Estado',
      cell: ({ getValue }) => {
        const status: StatusRequest = getValue();

        const styles = {
          PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
          APPROVED: "bg-green-100 text-green-800 border-green-300",
          REJECTED: "bg-red-100 text-red-800 border-red-300",
          PENDING_SIGN: "bg-blue-100 text-blue-800 border-blue-300",
        }

        const statusSpanishMap: Record<StatusRequest, string> = {
          PENDING: 'Pendiente',
          APPROVED: 'Aprobado',
          REJECTED: 'Rechazado',
          PENDING_SIGN: 'Pendiente de Firma (Revise su Correo)',
        }

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
  ] as ColumnDef<Request>[]


  useEffect(() => {
    const token = window.localStorage.getItem('token')

    if (!token) return

    getRequestsByUserId(token)
      .then(data => setRequests(data))
      .catch(error => console.log(error))
  }, [])

  const handleChange = (value: string, colId: string) => {
    setFilters(prev => ({ ...prev, [colId]: value }));
  }

  return (
    <section className='w-full max-w-[1200px] mx-auto flex flex-col gap-10 p-8 sm:p-20'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-semibold'>Solicitudes de Credito</h1>
        <p className='text-md text-slate-600'>Revisa el estado de tus solicitudes</p>
      </div>

      <div className='flex flex-wrap gap-4'>
        {/* Filtro por ID */}
        <input
          className='bg-white py-2 px-4 rounded-lg w-full sm:w-fit border border-blue-300'
          placeholder='Filtrar por id'
          type="text"
          onChange={e => handleChange(e.target.value, 'id')}
        />

        {/* Filtro por Estado */}
        <select
          value={(filters.status as string) ?? ""}
          onChange={e => handleChange(e.target.value, 'status')}
          className="bg-white py-2 px-4 rounded-lg border border-blue-300 text-sm text-slate-600 w-full sm:w-fit"
        >
          <option value="">Estado</option>
          <option value="pending">Pendiente</option>
          <option value="approved">Aprobado</option>
          <option value="rejected">Rechazado</option>
        </select>

        {/* Filtro por Fecha */}
        <input
          type="date"
          value={(filters.createdAt as string) ?? ""}
          onChange={e => handleChange(e.target.value, 'createdAt')}
          className="bg-white py-2 px-4 rounded-lg border border-blue-300 text-sm text-slate-600 w-full sm:w-fit"
        />
      </div>

      <DocumentsModal
        documents={documentLinks}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />

      <Table data={requests} columns={columns} columnFilters={filters} />
    </section>
  )
}