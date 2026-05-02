// app/api/hello/route.js

export async function GET() {
  return Response.json({ 
    status: "success",
    message: "Halo! Ini adalah Endpoint pertama lo yang jalan di Backend.",
    timestamp: new Date().toISOString(),
    creator: "Antigravity AI"
  });
}
