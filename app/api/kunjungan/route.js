import { NextResponse } from "next/server";
import { auth } from "../../../auth"; // Import sistem login
import { 
  getKunjunganRecords, 
  createKunjunganRecord, 
  updateKunjunganRecord 
} from "../../../lib/lark";

/**
 * SMART VALIDATION
 * Mengizinkan akses jika:
 * 1. User sudah login (Session) -> Orang Dalem
 * 2. ATAU Mengirim API Key yang benar -> Engineer Luar
 */
async function validateAccess(request) {
  // Cek apakah ada session (User yang login di web)
  const session = await auth();
  if (session) return true;

  // Cek apakah ada API Key di header (Engineer luar)
  const apiKey = request.headers.get("x-api-key");
  const validKey = process.env.SPACE_CLIENTINS_KEY;
  
  if (apiKey && apiKey === validKey) {
    return true;
  }

  return false;
}

/**
 * [GET] /api/kunjungan
 */
export async function GET(request) {
  if (!(await validateAccess(request))) {
    return NextResponse.json({ error: "Unauthorized: Butuh Login atau API Key" }, { status: 401 });
  }

  try {
    const data = await getKunjunganRecords();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

/**
 * [POST] /api/kunjungan
 */
export async function POST(request) {
  if (!(await validateAccess(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = await createKunjunganRecord(body);
    
    if (result.code !== 0) {
      return NextResponse.json({ error: result.msg }, { status: 400 });
    }

    return NextResponse.json({ message: "Berhasil menyimpan jadwal", data: result.data });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
  }
}

/**
 * [PATCH] /api/kunjungan
 */
export async function PATCH(request) {
  if (!(await validateAccess(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, ...fields } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: "Record ID wajib ada" }, { status: 400 });
    }

    const result = await updateKunjunganRecord(id, fields);

    if (result.code !== 0) {
      return NextResponse.json({ error: result.msg }, { status: 400 });
    }

    return NextResponse.json({ message: "Berhasil update data" });
  } catch (error) {
    console.error("API PATCH Error:", error);
    return NextResponse.json({ error: "Gagal update data" }, { status: 500 });
  }
}
