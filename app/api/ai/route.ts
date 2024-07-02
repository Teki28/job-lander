import { NextRequest } from "next/server";
import { headers } from "next/headers";
const rateLimitMap = new Map();
export async function GET(req: Request) {
  // const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const headersList = headers()
  const ip = headersList.get('request-ip')
  console.log(req.headers.entries().next);
  for (const element of req.headers.entries()) {
    console.log(element);
  }

  const limit = 3; // Limiting requests to 5 per minute per IP
  const windowMs = 60 * 1000; // 1 minute
  
  if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, {
          count: 0,
          lastReset: Date.now(),
      });
  }
  
  const ipData = rateLimitMap.get(ip);
  
  if (Date.now() - ipData.lastReset > windowMs) {
      ipData.count = 0;
      ipData.lastReset = Date.now();
  }
  
  if (ipData.count >= limit) {
    return new Response(JSON.stringify({ hello: "to many responses" }))
  }
  
  ipData.count += 1;
  return new Response(JSON.stringify({ hello: "hello" }));
}
