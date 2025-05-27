import { EmailError } from "@/utils/errors/EmailError";
import { transporter } from ".";

type EmailOptions = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

export async function sendEmailOTP({ to, subject, text, html }: EmailOptions) {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    throw new EmailError("Failed to send email", 500, error);
  }
}
