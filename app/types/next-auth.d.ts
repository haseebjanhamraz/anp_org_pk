import "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            name?: string | null
            email?: string | null
            image?: string | null
            role?: string
            id?: string
        }
    }

    interface User {
        id: string
        role: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string
        id?: string
    }
} 