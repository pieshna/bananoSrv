import { Resend } from 'resend'
import { envToConst } from '../../envToConst'

const resend = new Resend(envToConst.RESEND_KEY)

export const sendEmailByFunction = async (
  to: string,
  subject: string,
  html: string
) => {
  try {
    const data = await resend.emails.send({
      from: 'noreply@pieshna.me',
      to,
      subject,
      html
    })
    if (data) {
      return true
    }
  } catch (error) {
    return false
  }
}
