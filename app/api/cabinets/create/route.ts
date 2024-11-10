import { Cabinet } from "@/app/models/Cabinet";
import { NextResponse } from "next/server";
import { CabinetType } from "@/app/types/Cabinets";
import { verifyAuth } from "@/app/middleware/auth";

export async function POST(request: Request) {
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

        const cabinet: CabinetType = await Cabinet.create({
            cabinetType
        });

        return NextResponse.json(
            { cabinet },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error creating cabinet:", error);
        return NextResponse.json(
            {
                error: "Error creating cabinet"
            },
            { status: 500 }
        );
    }
}
