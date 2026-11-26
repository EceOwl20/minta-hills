import "server-only";

import nodemailer from "nodemailer";

import type { ContactFormData } from "./validation";
import type { ContactSubject } from "@/data/contact";

const subjectLabels: Record<ContactSubject, string> = {
  reservation: "Rezervasyon",
  villaInformation: "Villa bilgisi",
  availabilityAndPrice: "Müsaitlik ve fiyat",
  directions: "Yol tarifi",
  other: "Diğer",
};

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value?.trim()) {
    throw new Error(
      `Missing SMTP configuration: ${name}`
    );
  }

  return value;
}

function createMailTransporter() {
  const host = getRequiredEnv("SMTP_HOST");

  const port = Number(
    getRequiredEnv("SMTP_PORT")
  );

  const secureValue = getRequiredEnv("SMTP_SECURE");

  if (
    secureValue !== "true" &&
    secureValue !== "false"
  ) {
    throw new Error("Invalid SMTP secure configuration.");
  }

  const secure = secureValue === "true";

  if (
    (port !== 465 && port !== 587) ||
    (port === 465 && !secure) ||
    (port === 587 && secure)
  ) {
    throw new Error("Invalid SMTP port configuration.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,

    requireTLS: !secure,

    auth: {
      user: getRequiredEnv("SMTP_USER"),
      pass: getRequiredEnv("SMTP_PASSWORD"),
    },

    tls: {
      rejectUnauthorized: true,
      minVersion: "TLSv1.2",
    },

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,

    disableFileAccess: true,
    disableUrlAccess: true,

    logger: false,
    debug: false,
  });
}

export async function sendContactEmail(
  data: ContactFormData
): Promise<void> {
  const transporter = createMailTransporter();

  const from = getRequiredEnv("CONTACT_MAIL_FROM");
  const to = getRequiredEnv("CONTACT_MAIL_TO");

  const subject = subjectLabels[data.subject];

  const text = [
    "MINTA HILLS — YENİ İLETİŞİM TALEBİ",
    "",
    `Ad Soyad: ${data.name}`,
    `E-posta: ${data.email}`,
    `Telefon: ${data.phone || "-"}`,
    `Konu: ${subject}`,
    "",
    "Mesaj:",
    data.message,
    "",
    "Bu mesaj Minta Hills web sitesindeki",
    "iletişim formu üzerinden gönderilmiştir.",
  ].join("\n");

  const result = await transporter.sendMail({
    from: {
      name: "Minta Hills Website",
      address: from,
    },

    to,

    replyTo: {
      address: data.email,
      name: data.name,
    },

    subject: `Minta Hills | ${subject}`,

    text,
  });

  if (
    result.accepted.length === 0 ||
    result.rejected.length > 0
  ) {
    throw new Error("SMTP recipient was not accepted.");
  }
}