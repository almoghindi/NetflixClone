import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface EmailData {
  to: string;
  from: string;
  templateId: string;
  dynamicTemplateData: {
    [key: string]: string | number | boolean;
  };
}

export const sendEmail = async (emailData: EmailData): Promise<void> => {
  try {
    await sgMail.send(emailData);
    console.log('Email sent');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
};
