export interface DocuSealWebhookDto {
  event_type: string
  timestamp: Date
  data: Data
}

export interface Data {
  id: number
  submission_id: number
  email: string
  ua: string
  ip: string
  sent_at: Date
  opened_at: Date
  completed_at: Date
  declined_at: null
  created_at: Date
  updated_at: Date
  name: null
  phone: null
  role: string
  external_id: null
  application_key: null
  decline_reason: null
  status: string
  preferences: Preferences
  submission: Submission
  template: Template
  values: Value[]
  metadata: Metadata
  audit_log_url: string
  submission_url: string
  documents: Document[]
}

export interface Document {
  name: string
  url: string
}

export interface Metadata {
  credit_app_id: string
}

export interface Preferences {
  send_email: boolean
  send_sms: boolean
}

export interface Submission {
  id: number
  audit_log_url: string
  combined_document_url: string
  status: string
  url: string
  variables: Variables
  created_at: Date
}

export interface Variables {
  custom_variable: string
}

export interface Template {
  id: number
  name: string
  external_id: null
  created_at: Date
  updated_at: Date
  folder_name: string
}

export interface Value {
  field: string
  value: string
}
