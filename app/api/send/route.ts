import { EmailTemplate } from '../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(JSON.stringify(body));
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Awami National Party <contact@anp.org.pk>',
      to: ['haseebjanhamraz@gmail.com'],
      subject: 'New Awami National Party Contact',
      react: EmailTemplate({ name, email, message }),
    });

    if (error) {
      console.error('Error sending email:', error);
      return Response.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('Error handling request:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}