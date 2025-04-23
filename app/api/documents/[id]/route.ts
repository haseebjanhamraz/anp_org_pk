import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Document } from "@/models/Downloads";
import { getSignedUrl, listFiles } from "@/hooks/getBucket";
import { deleteBucketItem } from "@/hooks/deleteBucketItem";
import { Types } from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectToDatabase();
    const document = await Document.findById(new Types.ObjectId(id));

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    // Get Bucket File
    const pdfFile = listFiles(process.env.BUCKET_NAME);

    // Get public URL
    const publicUrl = await getSignedUrl(
      process.env.BUCKET_NAME || "",
      document.filepath
    );

    // Return document with public URL
    return NextResponse.json({
      ...document.toObject(),
      filepath: publicUrl,
    });
  } catch (error) {
    console.error("Error fetching document:", error);
    return NextResponse.json(
      { error: "Failed to fetch document" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectToDatabase();
    // First fetch the document to get the filepath
    const document = await Document.findById(new Types.ObjectId(id));
    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }
    // Delete from database
    await Document.findByIdAndDelete(new Types.ObjectId(id));
    // Delete from bucket using the correct filepath
    await deleteBucketItem(process.env.BUCKET_NAME || "", document.filepath);
    return NextResponse.json({ message: "Document deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();

    await connectToDatabase();

    const updatedDoc = await Document.findByIdAndUpdate(
      new Types.ObjectId(id),
      {
        name: body.name,
        category: body.category,
        filepath: body.filepath,
        publishYear: body.publishYear,
      },
      { new: true, runValidators: true }
    );

    if (!updatedDoc) {
      return NextResponse.json(
        { message: "Document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedDoc);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { message: "Error updating document" },
      { status: 500 }
    );
  }
}
