/**
 * AFS-63 digital contact card.
 *
 * Client-approved fields: name, phone, and email.
 * Address, title, website, and social profiles stay off the card until the
 * client approves them.
 */
export const contactCard = {
  fullName: "Cassandra Chavez",
  phone: "(956) 405-2891",
  email: "cc.aegisfs@gmail.com",
} as const;

export const contactCardHref = "/aegis.vcf";
export const contactCardFilename = "Cassandra-Chavez.vcf";

function escapeVCard(value: string) {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll("\n", "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

/** vCard 3.0 with CRLF lines so iOS and Android can import the file. */
export function buildVCard(card: {
  fullName: string;
  phone: string;
  email: string;
}) {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "PRODID:-//Aegis Financial Services//Contact Card//EN",
    `N:;${escapeVCard(card.fullName)};;;`,
    `FN:${escapeVCard(card.fullName)}`,
  ];

  if (digits(card.phone).length >= 10) {
    lines.push(`TEL;TYPE=WORK,VOICE:${escapeVCard(card.phone)}`);
  }

  lines.push(`EMAIL;TYPE=INTERNET:${escapeVCard(card.email)}`);
  lines.push("END:VCARD");

  return `${lines.join("\r\n")}\r\n`;
}
