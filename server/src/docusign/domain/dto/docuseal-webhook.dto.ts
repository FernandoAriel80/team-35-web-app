export interface DocuSealWebhookDto {
  event_type: string
  timestamp: Date
  data: Data
}

export interface Data {
  id: number
  name: null
  slug: string
  source: string
  submitters_order: string
  expire_at: null
  created_at: Date
  updated_at: Date
  archived_at: null
  submitters: Submitter[]
  template: Template
  created_by_user: CreatedByUser
  variables: Variables
  submission_events: SubmissionEvent[]
  documents: Document[]
  audit_log_url: string
  combined_document_url: null
  status: string
  completed_at: Date
}

export interface CreatedByUser {
  id: number
  email: string
  first_name: string
  last_name: string
}

export interface Document {
  name: string
  url: string
}

export interface SubmissionEvent {
  id: number
  submitter_id: number
  event_type: string
  event_timestamp: Date
  data: Variables
}

export interface Variables { }

export interface Submitter {
  id: number
  email: string
  phone: null
  name: null
  ua: string
  ip: string
  sent_at: Date
  opened_at: Date
  declined_at: null
  completed_at: Date
  created_at: Date
  updated_at: Date
  external_id: null
  metadata: Metadata
  status: string
  application_key: null
  decline_reason: null
  preferences: Preferences
  values: Value[]
  role: string
  documents: Document[]
}

export interface Metadata {
  credit_app_id: string
}

export interface Preferences {
  send_email: boolean
  send_sms: boolean
}

export interface Value {
  field: string
  value: null | string
}

export interface Template {
  id: number
  name: string
  external_id: null
  created_at: Date
  updated_at: Date
  folder_name: string
}
