// import nodemailer from 'nodemailer';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).end('Method Not Allowed');
//   }

//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ success: false, error: 'Missing fields' });
//   }

//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"${name}" <${email}>`,
//       to: process.env.RECEIVER_EMAIL,
//       subject: 'New Contact Form Submission',
//       text: message,
//       html: `<p><strong>Name:</strong> ${name}</p>
//              <p><strong>Email:</strong> ${email}</p>
//              <p><strong>Message:</strong> ${message}</p>`,
//     });

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error('Email error:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// }



// import nodemailer from 'nodemailer';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { name, email, message } = req.body;

//     // Create reusable transporter object using SMTP transport
//     const transporter = nodemailer.createTransport({
//       service: 'gmail', // or any other email service you prefer
//       auth: {
//         user: process.env.EMAIL_USER, // Your email address (e.g., 'your-email@gmail.com')
//         pass: process.env.EMAIL_PASS, // Your email password or application-specific password
//       },
//     });

//     const mailOptions = {
//       from: email, // Sender address (email from which the message is sent)
//       to: 'tabindanoor415@gmail.com', // Receiver's email address
//       subject: `Message from ${name} via Contact Form`,
//       text: message,
//       html: `<p><strong>Name:</strong> ${name}</p>
//              <p><strong>Email:</strong> ${email}</p>
//              <p><strong>Message:</strong> ${message}</p>`,
//     };

//     try {
//       // Send email
//       await transporter.sendMail(mailOptions);
//       return res.status(200).json({ message: 'Email sent successfully!' });
//     } catch (error) {
//       console.error('Error sending email:', error);
//       return res.status(500).json({ message: 'Error sending email. Please try again later.' });
//     }
//   } else {
//     // Handle any non-POST request
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }


import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { welcomeTemplate } from "./templates/welcome";

export async function sendMail({
  to,
  name,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}

export function compileWelcomeTemplate(name: string, url: string) {
  const template = handlebars.compile(welcomeTemplate);
  const htmlBody = template({
    name: name,
    url: url,
  });
  return htmlBody;
}