import "server-only";

import {
  contactSubjects,
  contactFormLimits,
  type ContactSubject,
} from "@/data/contact";

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: ContactSubject;
  message: string;
};

export type ContactFormField = keyof ContactFormData;

export type ContactFormErrors = Partial<
  Record<ContactFormField, true>
>;

type ValidationResult =
  | {
      ok: true;
      data: ContactFormData;
    }
  | {
      ok: false;
      errors: ContactFormErrors;
    };

function readString(value: unknown): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function isContactSubject(
  value: string
): value is ContactSubject {
  return contactSubjects.some(
    (subject) => subject === value
  );
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  if (value === "") return true;

  const digits = value.replace(/\D/g, "");

  return (
    /^[+0-9().\-\s]+$/.test(value) &&
    digits.length >= 7 &&
    digits.length <= 15
  );
}

function hasInvalidControlCharacters(
  value: string
): boolean {
  return /[\u0000-\u001F\u007F]/.test(value);
}

export function validateContactForm(
  input: unknown
): ValidationResult {
  if (
    typeof input !== "object" ||
    input === null ||
    Array.isArray(input)
  ) {
    return {
      ok: false,
      errors: {
        name: true,
        email: true,
        subject: true,
        message: true,
      },
    };
  }

  const payload = input as Record<string, unknown>;

  const name = readString(payload.name);
  const email = readString(payload.email);
  const phone = readString(payload.phone);
  const subject = readString(payload.subject);
  const message = readString(payload.message);

  const errors: ContactFormErrors = {};

  // Name
  if (
    !name ||
    name.length > contactFormLimits.name ||
    hasInvalidControlCharacters(name)
  ) {
    errors.name = true;
  }

  // Email
  if (
    !email ||
    email.length > contactFormLimits.email ||
    !isValidEmail(email) ||
    hasInvalidControlCharacters(email)
  ) {
    errors.email = true;
  }

  // Phone — optional
  if (
    (payload.phone !== undefined &&
      typeof payload.phone !== "string") ||
    phone.length > contactFormLimits.phone ||
    !isValidPhone(phone) ||
    hasInvalidControlCharacters(phone)
  ) {
    errors.phone = true;
  }

  // Message
  if (
    !message ||
    message.length > contactFormLimits.message ||
    hasInvalidControlCharacters(
      message.replace(/[\r\n\t]/g, "")
    )
  ) {
    errors.message = true;
  }

  // Subject — allowlist
  if (!isContactSubject(subject)) {
    errors.subject = true;

    return {
      ok: false,
      errors,
    };
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
    };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      phone,
      subject,
      message,
    },
  };
}