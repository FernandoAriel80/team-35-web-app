export interface DocuSealWebhookDto<T> {
  submitter: {
    id: string
    email: string
    name?: string
    phone?: string
    metadata?: {
      credit_app_id?: string
    }
    values: Record<string, T>
  }
  submission: {
    id: string
    template_id: string
    source: string
    created_at: string
    updated_at: string
    completed_at?: string
    status: string
  }
  document: {
    id: string
    url: string
    download_url: string
    created_at: string
  }
}
