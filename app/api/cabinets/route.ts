import { Cabinet } from "@/app/models/Cabinet";
import { CabinetType } from "@/app/types/Cabinets";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/app/middleware/auth";


export async function GET(request: Request) {
    try {
        const cabinets: CabinetType[] = await Cabinet.find();

        return NextResponse.json(
            { cabinets },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching cabinets:", error);
        return NextResponse.json(
            { error: "Error fetching cabinets" },
            { status: 500 }
        );
    }
}

// Delete All Cabinets
export async function DELETE(request: Request) {
    const { error, status } = await verifyAuth(request, ['admin']);
    if (error) {
        return NextResponse.json({ error }, { status });
    }

    await Cabinet.deleteMany();
    return NextResponse.json({ message: "All cabinets deleted successfully" }, { status: 200 });
}