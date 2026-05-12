/**
 * LARK SERVICE - Modular & Scalable Architecture
 * Supports multiple bases and tables dynamically.
 */

const LARK_APP_ID = process.env.LARK_APP_ID;
const LARK_APP_SECRET = process.env.LARK_APP_SECRET;

// Base & Table IDs from Environment
const DASHBOARD_BASE = process.env.LARK_DASHBOARD_BASE_TOKEN;
const TABLE_INTERAKSI = process.env.LARK_TABLE_ID_INTERAKSI;
const TABLE_AKTIVITAS = process.env.LARK_TABLE_ID_AKTIVITAS;

const KUNJUNGAN_BASE = process.env.LARK_BASE_TOKEN;
const TABLE_KUNJUNGAN = process.env.LARK_TABLE_ID;

// Log environment status (only key presence, not values)
console.log("Environment Status:", {
  LARK_APP_ID: !!LARK_APP_ID,
  LARK_APP_SECRET: !!LARK_APP_SECRET,
  DASHBOARD_BASE: !!DASHBOARD_BASE,
  TABLE_INTERAKSI: !!TABLE_INTERAKSI,
  TABLE_AKTIVITAS: !!TABLE_AKTIVITAS
});

// Token Cache
let cachedToken = {
  token: null,
  expiry: 0
};

// --- CORE UTILS ---

/**
 * Get Tenant Access Token with automatic caching
 */
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

/**
 * Generic Fetcher for any Lark Bitable table
 */
async function fetchLarkTable(baseToken, tableId, pageSize = 100) {
  if (!baseToken || !tableId) return { code: -1, msg: "Missing Base/Table ID" };
  
  const token = await getTenantAccessToken();
  const response = await fetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${baseToken}/tables/${tableId}/records?page_size=${pageSize}`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  
  return await response.json();
}

/**
 * Sanitizer: Extracts plain text from complex Lark objects (Location, Link, User, etc.)
 */
const extractLarkText = (val) => {
  if (!val) return "";
  if (typeof val === 'string') {
    // If Lark sends a stringified JSON of record IDs, suppress it
    if (val.includes('LINK_RECORD_ID') || val.includes('record_id')) return "";
    return val;
  }
  if (typeof val === 'number') return String(val);
  
  if (Array.isArray(val)) {
    if (val.length === 0) return "";
    return val.map(v => extractLarkText(v))
              .filter(t => t && !t.includes('LINK_RECORD_ID'))
              .join(", ");
  }
  
  if (typeof val === 'object') {
    if (val.full_address) return val.full_address;
    if (val.address) return val.address;
    if (val.text) return val.text;
    if (val.name) return val.name;
    
    const str = JSON.stringify(val);
    if (str.includes('LINK_RECORD_ID')) return "";
    return ""; 
  }
  
  return String(val);
};

// --- FEATURE SPECIFIC FUNCTIONS ---

/**
 * FETCH AKTIVITAS (Dashboard)
 */
export async function getAktivitasRecords() {
  const token = await getTenantAccessToken();
  const response = await fetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${DASHBOARD_BASE}/tables/${TABLE_AKTIVITAS}/records/search?page_size=100`, {
    method: "POST",
    headers: { 
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sort: [
        {
          field_name: "Submitted on",
          desc: true
        }
      ]
    })
  });

  const data = await response.json();
  console.log("Lark Aktivitas Raw Data:", JSON.stringify(data).substring(0, 500));
  if (data.code !== 0) {
    console.error("Lark Aktivitas Error:", data.msg);
    return [];
  }

  return data.data.items.map(record => {
    const fields = record.fields;
    let fotoUrl = null;
    if (Array.isArray(fields["Foto"]) && fields["Foto"].length > 0) {
      fotoUrl = fields["Foto"][0].url || fields["Foto"][0].tmp_url;
    }

    return {
      id: record.record_id,
      submittedOn: fields["Submitted on"] ? new Date(fields["Submitted on"]).toLocaleDateString('ja-JP').replace(/-/g, '/') : "",
      salesName: extractLarkText(fields["Sales"]),
      jenisKegiatan: extractLarkText(fields["Jenis Kegiatan"]),
      namaKegiatan: extractLarkText(fields["Nama Kegiatan"]),
      kondisi: extractLarkText(fields["Kondisi"]),
      proposal: extractLarkText(fields["Proposal"]) || "Tidak",
      catatan: extractLarkText(fields["Catatan"]),
      lokasi: extractLarkText(fields["Lokasi"]),
      foto: fotoUrl
    };
  });
}

/**
 * FETCH INTERAKSI (Dashboard)
 */
export async function getInteraksiRecords() {
  const token = await getTenantAccessToken();
  const response = await fetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${DASHBOARD_BASE}/tables/${TABLE_INTERAKSI}/records/search?page_size=100`, {
    method: "POST",
    headers: { 
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sort: [
        {
          field_name: "Tanggal Interaksi",
          desc: true
        }
      ]
    })
  });

  const data = await response.json();
  console.log("Lark Interaksi Raw Data:", JSON.stringify(data).substring(0, 500));
  if (data.code !== 0) {
    console.error("Lark Interaksi Error:", data.msg);
    return [];
  }

  return data.data.items
    .map(record => {
      const fields = record.fields;
      return {
        id: record.record_id,
        tanggalInteraksi: fields["Tanggal Interaksi"] ? new Date(fields["Tanggal Interaksi"]).toLocaleDateString('id-ID') : "",
        leadsName: extractLarkText(fields["Leads"]),
        salesName: extractLarkText(fields["Sales"]),
        status: extractLarkText(fields["Status"]),
        kendala: extractLarkText(fields["Kendala"]),
        catatan: extractLarkText(fields["Catatan"]),
        followUp: extractLarkText(fields["Follow Up"]) || "No"
      };
    })
    .filter(item => item.followUp === 'Yes' && item.salesName !== 'Base Assistant');
}

/**
 * KUNJUNGAN SITE (Legacy / Other Base)
 */
export async function getKunjunganRecords() {
  const data = await fetchLarkTable(KUNJUNGAN_BASE, TABLE_KUNJUNGAN);
  if (data.code !== 0) return [];

  return data.data.items.map(record => {
    const fields = record.fields;
    const dateObj = fields["Tanggal"] ? new Date(fields["Tanggal"]) : null;

    return {
      id: record.record_id,
      name: extractLarkText(fields["Nama Customer"]),
      phone: extractLarkText(fields["Whatsapp"]),
      schedule: dateObj ? dateObj.toISOString().split('T')[0] : "",
      time: dateObj ? dateObj.toTimeString().slice(0, 5) : "",
      sales: extractLarkText(fields["Sales"]),
      status: extractLarkText(fields["Status"]) || "Belum",
      notes: extractLarkText(fields["Catatan"])
    };
  });
}

/**
 * CREATE KUNJUNGAN (Write Operation)
 */
export async function createKunjunganRecord(fields) {
  const token = await getTenantAccessToken();
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

  const response = await fetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${KUNJUNGAN_BASE}/tables/${TABLE_KUNJUNGAN}/records`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  return await response.json();
}

/**
 * UPDATE KUNJUNGAN (Update Operation)
 */
export async function updateKunjunganRecord(recordId, updates) {
  const token = await getTenantAccessToken();
  const fields = {};

  if (updates.name) fields["Nama Customer"] = updates.name;
  if (updates.status) fields["Status"] = updates.status;
  if (updates.notes) fields["Catatan"] = updates.notes;
  if (updates.sales) fields["Sales"] = updates.sales;

  if (updates.schedule || updates.time) {
    const date = updates.schedule || new Date().toISOString().split('T')[0];
    const time = updates.time || "00:00";
    fields["Tanggal"] = new Date(`${date}T${time}:00`).getTime();
  }

  const response = await fetch(`https://open.larksuite.com/open-apis/bitable/v1/apps/${KUNJUNGAN_BASE}/tables/${TABLE_KUNJUNGAN}/records/${recordId}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ fields })
  });

  return await response.json();
}
