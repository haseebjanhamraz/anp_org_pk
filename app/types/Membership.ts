import { z } from "zod";

export const membershipFormSchema = z.object({
    name: z.string().min(2, { message: "Name must not be too short" }).max(50, { message: "Name characters must be at most 50 characters" }),
    email: z.string().email({ message: "Email is not valid" }),
    password: z.string().min(8, { message: "Password must not be too short" }).max(50, { message: "Password characters must be at most 50 characters" }),
  });

export type MembershipFormSchema = z.infer<typeof membershipFormSchema>;