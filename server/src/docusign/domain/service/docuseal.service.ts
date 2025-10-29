export const DOCUSEAL_SERVICE = 'DOCUSEAL_SERVICE'
export interface DocusealService {
  sendContract(emailAddress: string, creditAppId: number): Promise<any>
}
