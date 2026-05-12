import { NextResponse } from "next/server";
import { getAktivitasRecords } from "../../../lib/lark";

export async function GET() {
  try {
    const records = await getAktivitasRecords();
    return NextResponse.json(records);
  } catch (error) {
    console.error("API Error (Aktivitas):", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
