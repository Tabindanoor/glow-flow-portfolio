import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, message } = req.body;

      // Send email to you
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "tabindanoor415@gmail.com",
        subject: `New Contact Form Message from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

      // Confirmation email to sender
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: email,
        subject: "Thank you for your message",
        html: `
          <h2>Thank you for contacting me!</h2>
          <p>Dear ${name},</p>
          <p>I have received your message and will get back to you soon.</p>
          <p>Best regards,<br>Tabinda Noor</p>
        `,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
