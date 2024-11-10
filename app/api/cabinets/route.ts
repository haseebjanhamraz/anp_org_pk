import { Cabinet } from "@/app/models/Cabinet";
import { CabinetType } from "@/app/types/Cabinets";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/app/middleware/auth";


export async function GET(request: Request) {
    const { error, status } = await verifyAuth(request, ['admin']);
    if (error) {
        return NextResponse.json({ error }, { status });
    }

    const cabinets: CabinetType[] = await Cabinet.find();
    console.log(cabinets);
    return NextResponse.json(
        {
            cabinets
        },
        { status: 200 }

    );
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