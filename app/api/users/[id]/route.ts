import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/app/lib/mongodb';
import User from '@/app/models/User';
import { verifyAuth } from '@/app/middleware/auth';



// Get Individual User
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const authResult = await verifyAuth(req, ['admin', 'editor', 'subscriber']);
        if ('error' in authResult) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            );
        }

        const { user: authenticatedUser } = authResult;

        // Only allow users to view their own profile unless they're an admin
        if (authenticatedUser.role !== 'admin' && authenticatedUser._id.toString() !== id) {
            return NextResponse.json(
                { error: 'Unauthorized - Cannot view other users\' profiles' },
                { status: 403 }
            );
        }

        await connectToDatabase();

        const user = await User.findById(id, {
            password: 0 // Exclude password field
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}


// Update user profile
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {

        const authResult = await verifyAuth(req, ['admin', 'editor', 'subscriber']);
        if ('error' in authResult) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            );
        }

        const { user: authenticatedUser } = authResult;
        // Only allow users to update their own profile unless they're an admin
        if (authenticatedUser.role !== 'admin' && authenticatedUser._id.toString() !== id) {
            return NextResponse.json(
                { error: 'Unauthorized - Cannot modify other users\' profiles' },
                { status: 403 }
            );
        }

        const { name, email, currentPassword, newPassword } = await req.json();

        await connectToDatabase();
        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // If updating email, check if it's already taken
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return NextResponse.json(
                    { error: 'Email already in use' },
                    { status: 400 }
                );
            }
            user.email = email;
        }

        // Update name if provided
        if (name) {
            user.name = name;
        }

        // Handle password update
        if (newPassword) {
            // Verify current password before allowing password change
            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordValid) {
                return NextResponse.json(
                    { error: 'Current password is incorrect' },
                    { status: 400 }
                );
            }
            user.password = await bcrypt.hash(newPassword, 12);
        }

        await user.save();

        return NextResponse.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Profile update error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Delete user account
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const authResult = await verifyAuth(req, ['admin', 'editor', 'subscriber']);
        if ('error' in authResult) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            );
        }

        const { user: authenticatedUser } = authResult;

        // Only allow users to delete their own account unless they're an admin
        if (authenticatedUser.role !== 'admin' && authenticatedUser._id.toString() !== id) {
            return NextResponse.json(
                { error: 'Unauthorized - Cannot delete other users\' accounts' },
                { status: 403 }
            );
        }

        await connectToDatabase();
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'User account deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Account deletion error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 