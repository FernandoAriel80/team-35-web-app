type StatusRequest = "pending" | "approved" | "rejected"

export interface Request {
  id: number
  date: string
  amount: number
  status: StatusRequest
  documents: string
}