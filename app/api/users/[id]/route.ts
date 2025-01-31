import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../../lib/mongodb";
import User from "../../../models/User";
import { verifyAuth } from "../../../middleware/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// Get Individual User
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const authResult = await verifyAuth(req, ["admin", "editor", "subscriber"]);
    if ("error" in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const { user: authenticatedUser } = authResult;

    // Only allow users to view their own profile unless they're an admin
    if (
      authenticatedUser.role !== "admin" &&
      authenticatedUser._id.toString() !== id
    ) {
      return NextResponse.json(
        { error: "Unauthorized - Cannot view other users' profiles" },
        { status: 403 }
      );
    }

    await connectToDatabase();

    const user = await User.findById(id, {
      password: 0, // Exclude password field
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update user profile
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = params;
    const updates = await request.json();
    
    await connectToDatabase();
    
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Update user fields
    Object.assign(user, updates);
    await user.save();

    return NextResponse.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 }
    );
  }
}

// Delete user account
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = params;
    
    await connectToDatabase();
    
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { message: "Error deleting user" },
      { status: 500 }
    );
  }
}
