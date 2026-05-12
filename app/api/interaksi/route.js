import { NextResponse } from "next/server";
import { getInteraksiRecords } from "../../../lib/lark";

export async function GET() {
  try {
    const records = await getInteraksiRecords();
    return NextResponse.json(records);
  } catch (error) {
    console.error("API Error (Interaksi):", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
