"use server";

import nodemailer from "nodemailer";

export async function submitContact(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return { error: "Missing required fields" };
  }

  // Create transporter (Note: In a real environment, you'd use real SMTP credentials from env vars)
  // For demonstration/testing, we'll simulate success, but structure it properly for actual environments
  try {
    console.log("Checking ENV vars inside Server Action:");
    console.log("Host:", process.env.SMTP_HOST);
    console.log("Port:", process.env.SMTP_PORT);
    console.log("User:", process.env.SMTP_USER);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_EMAIL || "pgarcesb1@gmail.com",
      subject: `Portfolio Contact from ${name}`,
      text: message.toString(),
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message.toString().replace(/\n/g, "<br/>")}</p>`,
      replyTo: email.toString(),
    });

    return { success: true };
  } catch (error) {
    console.error("Email submission error:", error);
    return { error: "Failed to send message" };
  }
}
