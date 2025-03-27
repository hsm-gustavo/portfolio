import { z } from "zod"

export const ContactForm = z.object({
  name: z.string().min(1, { message: "This field cannot be empty" }),
  email: z.string().email().min(1, { message: "This field cannot be empty" }),
  message: z.string().min(1, { message: "This field cannot be empty" }),
})

export type ContactFormType = z.infer<typeof ContactForm>
