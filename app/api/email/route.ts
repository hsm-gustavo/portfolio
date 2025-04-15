import { MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_USER } from "@/lib/constants"
import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()

  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: MAIL_USER,
      subject: `New contact message from ${name}`,
      text: message,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Message:</strong><br/>${message}</p>`,
    })
    return NextResponse.json(
      { message: "Email sent succesfully" },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 })
    return NextResponse.json(
      { message: "There was an unknown error while trying to send the email" },
      { status: 500 }
    )
  }
}
