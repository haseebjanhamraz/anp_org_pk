import { NextResponse } from "next/server"
import { connectToDatabase } from "../../../lib/mongodb"
import User from "../../../models/User"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import bcrypt from "bcryptjs"

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)
        
        // Check if user is authenticated and updating their own profile
        if (!session || session.user.id !== params.id) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        const { name, email, currentPassword, newPassword } = await request.json()
        
        await connectToDatabase()
        
        const user = await User.findById(params.id)
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            )
        }

        // If password change is requested
        if (currentPassword && newPassword) {
            const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
            if (!isPasswordValid) {
                return NextResponse.json(
                    { message: "Current password is incorrect" },
                    { status: 400 }
                )
            }
            
            const hashedPassword = await bcrypt.hash(newPassword, 12)
            user.password = hashedPassword
        }

        user.name = name
        user.email = email
        await user.save()

        return NextResponse.json({
            name: user.name,
            email: user.email
        })
    } catch (error) {
        console.error('Update error:', error)
        return NextResponse.json(
            { message: "Error updating user" },
            { status: 500 }
        )
    }
} 