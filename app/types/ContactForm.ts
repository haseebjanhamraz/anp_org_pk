import { z } from "zod";

export const contactFormSchema = z.object({
    name: z.string().min(2, { message: "Name must not be too short" }).max(50, { message: "Name characters must be at most 50 characters" }),
    email: z.string().email({ message: "Email is not valid" }),
    message: z.string().min(10, { message: "Message must not be too short" }).max(500, { message: "Message characters must be at most 500 characters" }),
  });

export type ContactFormSchema = z.infer<typeof contactFormSchema>;