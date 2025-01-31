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
        
        if (!session || session.user.id !== params.id) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        const { updateField, ...data } = await request.json()
        
        await connectToDatabase()
        
        const user = await User.findById(params.id)
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            )
        }

        if (updateField === 'password') {
            const { currentPassword, newPassword } = data
            const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
            if (!isPasswordValid) {
                return NextResponse.json(
                    { message: "Current password is incorrect" },
                    { status: 400 }
                )
            }
            user.password = await bcrypt.hash(newPassword, 12)
        } else {
            user[updateField] = data[updateField]
        }

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