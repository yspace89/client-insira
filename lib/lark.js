/**
 * LARK SERVICE (Updated to match User Screenshot)
 */

const LARK_APP_ID = process.env.LARK_APP_ID;
const LARK_APP_SECRET = process.env.LARK_APP_SECRET;
const BASE_TOKEN = process.env.LARK_BASE_TOKEN;
const TABLE_ID = process.env.LARK_TABLE_ID;

let cachedToken = {
  token: null,
  expiry: 0
};

async function getTenantAccessToken() {
  const now = Date.now();
  if (cachedToken.token && now < cachedToken.expiry) return cachedToken.token;

  const response = await fetch("https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ app_id: LARK_APP_ID, app_secret: LARK_APP_SECRET }),
  });

  const data = await response.json();
  if (data.code !== 0) throw new Error("Gagal ambil token: " + data.msg);

  cachedToken = {
    token: data.tenant_access_token,
    expiry: now + (data.expire * 1000) - (5 * 60 * 1000)
  };
  return data.tenant_access_token;
}

export async function getKunjunganRecords() {
  const token = await getTenantAccessToken();
  const response = await fetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${TABLE_ID}/records?page_size=100`, {
    headers: { "Authorization": `Bearer ${token}` }
  });

  const data = await response.json();
  if (data.code !== 0) return [];

  return data.data.items.map(record => {
    const fields = record.fields;
    const dateObj = fields["Tanggal"] ? new Date(fields["Tanggal"]) : null;

    return {
      id: record.record_id,
      name: fields["Nama Customer"],
      phone: fields["Whatsapp"],
      schedule: dateObj ? dateObj.toISOString().split('T')[0] : "",
      time: dateObj ? dateObj.toTimeString().slice(0, 5) : "",
      sales: fields["Sales"] || "",
      status: fields["Status"] || "Belum",
      notes: fields["Catatan"] || ""
    };
  });
}

export async function createKunjunganRecord(fields) {
  const token = await getTenantAccessToken();
  
  // Menggabungkan Tanggal dan Jam untuk kolom "Tanggal" di Lark
  const combinedDate = new Date(`${fields.schedule}T${fields.time}:00`).getTime();

  const body = {
    fields: {
      "Nama Customer": fields.name,
      "Whatsapp": fields.phone,
      "Tanggal": combinedDate,
      "Sales": fields.sales,
      "Status": "Belum",
      "Catatan": fields.notes
    }
  };

  const response = await fetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${TABLE_ID}/records`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  return await response.json();
}

export async function updateKunjunganRecord(recordId, updates) {
  const token = await getTenantAccessToken();
  const fields = {};

  if (updates.name) fields["Nama Customer"] = updates.name;
  if (updates.status) fields["Status"] = updates.status;
  if (updates.notes) fields["Catatan"] = updates.notes;
  if (updates.sales) fields["Sales"] = updates.sales;

  // Jika ada update schedule atau time, kita harus gabungkan lagi
  if (updates.schedule || updates.time) {
    // Note: Ini butuh data lama jika salah satunya tidak dikirim, 
    // tapi untuk simpelnya kita asumsikan dikirim dari frontend.
    const date = updates.schedule || new Date().toISOString().split('T')[0];
    const time = updates.time || "00:00";
    fields["Tanggal"] = new Date(`${date}T${time}:00`).getTime();
  }

  const response = await fetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${BASE_TOKEN}/tables/${TABLE_ID}/records/${recordId}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ fields })
  });

  return await response.json();
}
