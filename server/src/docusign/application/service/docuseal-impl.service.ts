import { Injectable } from '@nestjs/common'

import docuseal from '@docuseal/api'
import { DocusealService } from '../../domain/service/docuseal.service'

@Injectable()
export class DocusealImplService implements DocusealService {
  constructor() {
    docuseal.configure({
      key: process.env.DOCUSEAL_API_KEY,
      url: 'https://api.docuseal.com/',
    })
  }

  async sendContract(emailAddress: string, creditAppId: number): Promise<any> {
    const submission = await docuseal.createSubmission({
      template_id: 1908211,
      send_email: true,
      submitters: [
        {
          email: emailAddress,
          metadata: {
            credit_app_id: creditAppId,
          },
        },
      ],
    })
    return submission
  }
}
