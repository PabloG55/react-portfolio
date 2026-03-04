import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    console.log("API Route Hit - Environment Variables:");
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

    await transporter.verify(); // Test connection FIRST

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_EMAIL || "pgarcesb1@gmail.com",
      subject: `Portfolio Contact from ${name}`,
      text: message.toString(),
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message.toString().replace(/\n/g, "<br/>")}</p>`,
      replyTo: email.toString(),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API Route Email Error:", error.message || error);
    return NextResponse.json(
      {
        error: "Failed to send message: " + (error.message || "Unknown error"),
      },
      { status: 500 },
    );
  }
}
