import { useEffect, useState } from 'react';

import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';

import { Table } from '../../components/Table';
import type { Request } from '../../interfaces';
import { getRequestsByUserId } from '../../services/requests.service';

const columnHelper = createColumnHelper<Request>()

const columns = [
  columnHelper.accessor('id', {
    header: 'Id de Solicitud',
  }),
  columnHelper.accessor('date', {
    header: 'Fecha',
  }),
  columnHelper.accessor('amount', {
    header: 'Monto',
    cell: ({ getValue }) => `$${getValue().toLocaleString('es-CL')}`,
  }),
  columnHelper.accessor('documents', {
    header: 'Documentos',
    cell: ({ getValue }) => {
      const url = getValue();
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-900 hover:underline"
        >
          Ver Documentos
        </a>
      );
    },
  }),
  columnHelper.accessor('status', {
    header: 'Estado',
    cell: ({ getValue }) => {
      const status = getValue();

      const styles = {
        pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
        approved: "bg-green-100 text-green-800 border-green-300",
        rejected: "bg-red-100 text-red-800 border-red-300",
      };

      const statusSpanishMap = {
        pending: 'Pendiente',
        approved: 'Aprobado',
        rejected: 'Rechazado',
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
] as ColumnDef<Request>[]

export const Requests = () => {
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const [requests, setRequests] = useState<Request[]>([])

  useEffect(() => {
    const token = window.localStorage.getItem('token')

    if (!token) return

    getRequestsByUserId(token)
      .then(data => setRequests(data))
      .catch(error => console.log(error))
  }, [])

  const handleChange = (v: unknown, colId: string) => {
    setFilters(prev => ({ ...prev, [colId]: v || undefined }));
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
          value={(filters.date as string) ?? ""}
          onChange={e => handleChange(e.target.value, 'date')}
          className="bg-white py-2 px-4 rounded-lg border border-blue-300 text-sm text-slate-600 w-full sm:w-fit"
        />
      </div>

      <Table data={requests} columns={columns} columnFilters={filters} />
    </section>
  )
}