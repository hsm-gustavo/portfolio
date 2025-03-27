import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND)

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()

  try {
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: "gustavo.hs.malaquias@gmail.com",
      subject: `New message from ${name}`,
      text: `Email: ${email}\nMessage: ${message}`,
    })
    return NextResponse.json({message: "Email sent succesfully"}, { status: 200 })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 })
    return NextResponse.json(
      {message: "There was an unknown error while trying to send the email"},
      { status: 500 }
    )
  }
}
