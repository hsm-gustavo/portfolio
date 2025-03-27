"use client"

import { ContactForm, ContactFormType } from "@/lib/validations"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { Loader2, Mail, Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { motion } from "motion/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { BASE_URL } from "@/lib/constants"
import { toast } from "sonner"

export default function Contact() {
  const form = useForm<ContactFormType>({
    resolver: zodResolver(ContactForm),
    defaultValues: {
      email: "",
      name: "",
      message: "",
    },
  })

  const handleSubmit = async (values: ContactFormType) => {
    try {
      const response = await fetch(`${BASE_URL}/api/email`, {
        method: "POST",
        body: JSON.stringify(values),
      })
      const data: { message: string } = await response.json()
      toast.success("Sucess!", {
        description: data.message,
      })
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error!", {
          description: error.message,
        })
      }
      toast.error("Error!", {
        description:
          "There was an unknown error while trying to send the email.",
      })
    }
  }

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "gustavo.hs.malaquias@gmail.com",
      href: "mailto:gustavo.hs.malaquias@gmail.com",
    },
    {
      icon: <SiGithub className="h-6 w-6" />,
      title: "GitHub",
      value: "hsm-gustavo",
      href: "https://github.com/hsm-gustavo",
    },
  ]

  return (
    <section
      id="contact"
      className="py-20 bg-muted/30 flex justify-center items-center"
    >
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 font-mono">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-none shadow-sm">
              <CardHeader>
                <CardTitle className="font-mono">Contact Information</CardTitle>
                <CardDescription>
                  Choose your preferred method of communication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {contactMethods.map((method) => (
                    <Link
                      key={method.title}
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="shrink-0 text-primary">{method.icon}</div>
                      <div>
                        <h3 className="font-medium">{method.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {method.value}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-none shadow-sm">
              <CardHeader>
                <CardTitle className="font-mono">Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I&apos;ll get back to you as soon as
                  possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormControl>
                            <Input
                              placeholder="Your Name"
                              {...field}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormControl>
                            <Input
                              placeholder="Your Email"
                              type="email"
                              {...field}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormControl>
                            <Textarea
                              placeholder="Your Message"
                              {...field}
                              rows={4}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        <p className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </p>
                      ) : (
                        <p className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </p>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
