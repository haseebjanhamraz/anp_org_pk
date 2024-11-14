import { Cabinet } from '../../../models/Cabinet'
import { NextResponse } from "next/server";
import { verifyAuth } from '../../../middleware/auth';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const { error, status } = await verifyAuth(request, ['admin']);
        if (error) {
            return NextResponse.json({ error }, { status });
        }
        const deletedCabinet = await Cabinet.findByIdAndDelete(id);

        if (!deletedCabinet) {
            return NextResponse.json(
                { error: "Cabinet not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Cabinet deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error deleting cabinet:", error);
        return NextResponse.json(
            { error: "Error deleting cabinet" },
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
        const { error, status } = await verifyAuth(request, ['admin']);
        if (error) {
            return NextResponse.json({ error }, { status });
        }

        const body = await request.json();
        const { cabinetType } = body;

        if (!cabinetType) {
            return NextResponse.json(
                { error: "Cabinet type is required" },
                { status: 400 }
            );
        }

        const updatedCabinet = await Cabinet.findByIdAndUpdate(
            id,
            { cabinetType },
            { new: true }
        );

        if (!updatedCabinet) {
            return NextResponse.json(
                { error: "Cabinet not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { cabinet: updatedCabinet },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating cabinet:", error);
        return NextResponse.json(
            { error: "Error updating cabinet" },
            { status: 500 }
        );
    }
}



export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const { error, status } = await verifyAuth(request, ['admin']);
        if (error) {
            return NextResponse.json({ error }, { status });
        }
        const cabinet = await Cabinet.findById(id);

        if (!cabinet) {
            return NextResponse.json({ error: "Cabinet not found" }, { status: 404 });
        }

        return NextResponse.json({ cabinet }, { status: 200 });
    } catch (error) {
        console.error("Error getting cabinet:", error);
        return NextResponse.json(
            { error: "Error getting cabinet" },
            { status: 500 }
        );
    }
}