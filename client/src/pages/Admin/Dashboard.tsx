import { useState } from "react"

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table"

import { Table } from "../../components/Table"
import type { Request, StatusRequest } from "../../interfaces"

const columnHelper = createColumnHelper<Request>()

export const Dashboard = () => {
  const [requests, setRequests] = useState<Request[]>([])

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
    columnHelper.accessor('status', {
      header: 'Estado',
      cell: ({ getValue }) => {
        const status: StatusRequest = getValue();

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
  ] as ColumnDef<Request>[]

  // useEffect(() => {
  //   const token = window.localStorage.getItem('token')

  //   if (!token) return

  //   getRequestsByUserId(token)
  //     .then(data => setRequests(data))
  //     .catch(error => console.log(error))
  // }, [])

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
    </div>
  )
}
