"use client"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "../types/ContactForm";
import { toast, Toaster } from "sonner";

export default function ContactForm() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })
  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    console.log(values)
    try {
      await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })
      toast.success("Message sent")
      // Reset form
      form.reset()
    } catch (error) {
      toast.error("Message not sent")
    }
  }
  return (
    <div className="px-4 py-8">
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-white">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} className="dark:text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-white">Email</FormLabel>
                <FormControl >
                  <Input placeholder="Enter your email" {...field} className="dark:text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-white">Message</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your message" {...field} className="dark:text-white h-36 text-inherit" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-black text-white" type="submit">Submit</Button>
        </Form>
      </form>
    </div>
  )
}
