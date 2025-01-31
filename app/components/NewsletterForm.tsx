"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function NewsletterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Implement newsletter signup logic
    console.log(values)
  }

  return (
    <Form {...form}>
      <h1 className="text-center text-lg font-bold py-4 mb-3 bg-slate-600 rounded-md text-white dark:bg-red-500 p-2">Subscribe to our Newsletter</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                disabled
                  placeholder="Enter your email"
                  type="email"
                  className="bg-white dark:bg-slate-700"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white"
          disabled
        >
          Subscribe
        </Button>
      </form>
    </Form>
  )
}
