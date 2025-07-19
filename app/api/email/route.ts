import { MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_USER } from "@/lib/constants"
import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

const ORIGIN =
  process.env.NODE_ENV === "production" ? "https://hsm-gustavo.dev" : "*"

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": ORIGIN,
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "false",
    },
  })
}

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()

  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: true,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
    logger: true,
  })

  try {
    await transporter.verify()

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: MAIL_USER,
      subject: `New contact message from ${name}`,
      text: message,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Message:</strong><br/>${message}</p>`,
    })
    return NextResponse.json(
      { message: "Email sent succesfully" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": ORIGIN,
          "Access-Control-Allow-Credentials": "false",
        },
      }
    )
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 })
    return NextResponse.json(
      { message: "There was an unknown error while trying to send the email" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": ORIGIN,
          "Access-Control-Allow-Credentials": "false",
        },
      }
    )
  }
}
