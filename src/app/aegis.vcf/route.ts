import {
  buildVCard,
  contactCard,
  contactCardFilename,
} from "@/lib/contact-card";

export function GET() {
  return new Response(buildVCard(contactCard), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `inline; filename="${contactCardFilename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
