export interface Company {
  id: number
  name: string
  type: string
  taxId: string
  activity: string
  employeeCount: number
  address: string
  website?: string
  email: string
}

export const companies: Company[] = [
  {
    id: 1,
    name: 'InovaTech Solutions',
    type: 'Sociedad limitada',
    taxId: '76.123.456-7',
    activity: 'Servicios de software',
    employeeCount: 25,
    address: 'Av. Providencia 1234, Santiago',
    website: 'https://innovatech.cl',
    email: 'contacto@innovatech.cl',
  },
  {
    id: 2,
    name: 'EcoVerde Ltda',
    type: 'Sociedad por acciones',
    taxId: '78.987.654-3',
    activity: 'Producción agrícola sustentable',
    employeeCount: 12,
    address: 'Camino Los Olivos 455, Rancagua',
    website: 'https://ecoverde.cl',
    email: 'info@ecoverde.cl',
  },
  {
    id: 3,
    name: 'ConstruMax Chile',
    type: 'E.I.R.L.',
    taxId: '77.555.444-1',
    activity: 'Construcción e infraestructura',
    employeeCount: 48,
    address: 'Av. Los Presidentes 2211, La Florida',
    website: 'https://construmax.cl',
    email: 'ventas@construmax.cl',
  },
]
