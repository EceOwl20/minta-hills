"use client";

import type { FormEvent } from "react";
import { useTranslations } from "next-intl";

import {
  contactSubjects,
  contactFormLimits,
} from "@/data/contact";

const labelClassName = `
  mb-2.5 block

  font-sans text-[11px]
  font-semibold uppercase
  tracking-[0.1em]
  text-text-label
`;

const inputClassName = `
  block w-full min-w-0
  h-12

  rounded-none
  border border-black/30
  bg-brand-paper

  px-4

  font-sans text-[16px]
  font-normal text-brand-dark

  outline-none

  transition-colors duration-200

  focus:border-brand-dark
  focus:ring-1 focus:ring-brand-dark

  motion-reduce:transition-none
`;

export default function ContactForm() {
  const t = useTranslations("ContactPage.form");

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    // Submission will be implemented with the contact API.
    event.preventDefault();
  }

  return (
    <form
      id="contactForm"
      method="post"
      onSubmit={handleSubmit}
      className="
        grid min-w-0
        grid-cols-1
        gap-x-6 gap-y-6

        border-t-2 border-brand-dark
        bg-white

        p-6

        sm:grid-cols-2
        md:p-9
        xl:p-12
      "
    >
      {/* Name */}
      <div className="min-w-0">
        <label
          htmlFor="contactName"
          className={labelClassName}
        >
          {t("fields.name")}
        </label>

        <input
          id="contactName"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={contactFormLimits.name}
          required
          className={inputClassName}
        />
      </div>

      {/* Email */}
      <div className="min-w-0">
        <label
          htmlFor="contactEmail"
          className={labelClassName}
        >
          {t("fields.email")}
        </label>

        <input
          id="contactEmail"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={contactFormLimits.email}
          required
          className={inputClassName}
        />
      </div>

      {/* Phone */}
      <div className="min-w-0">
        <label
          htmlFor="contactPhone"
          className={labelClassName}
        >
          {t("fields.phone")}
        </label>

        <input
          id="contactPhone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={contactFormLimits.phone}
          className={inputClassName}
        />
      </div>

      {/* Subject */}
      <div className="min-w-0">
        <label
          htmlFor="contactSubject"
          className={labelClassName}
        >
          {t("fields.subject")}
        </label>

        <select
          id="contactSubject"
          name="subject"
          defaultValue="reservation"
          required
          className={`
            ${inputClassName}
            cursor-pointer
          `}
        >
          {contactSubjects.map((subject) => (
            <option
              key={subject}
              value={subject}
            >
              {t(`subjects.${subject}`)}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="min-w-0 sm:col-span-2">
        <label
          htmlFor="contactMessage"
          className={labelClassName}
        >
          {t("fields.message")}
        </label>

        <textarea
          id="contactMessage"
          name="message"
          rows={5}
          maxLength={contactFormLimits.message}
          required
          className={`
            ${inputClassName}

            h-auto min-h-[132px]
            resize-y py-3
            leading-relaxed
          `}
        />
      </div>

      {/* Submit button */}
      <div className="mt-2 sm:col-span-2">
        <button
          type="submit"
          disabled
          aria-describedby="contactFormNote"
          className="
            group
            inline-flex items-center
            justify-center gap-7

            min-h-12
            rounded-full
            bg-brand-dark
            px-7 py-3.5

            font-sans text-[11px]
            font-semibold uppercase
            tracking-[0.08em]
            text-white

            transition-colors duration-300
            hover:bg-brand-charcoal

            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-brand-dark

            disabled:cursor-not-allowed
            disabled:opacity-60

            motion-reduce:transition-none
          "
        >
          {t("submit")}

          <span
            aria-hidden="true"
            className="
              text-[17px]
              leading-none

              transition-transform duration-300
              group-enabled:group-hover:translate-x-1

              motion-reduce:transition-none
              motion-reduce:transform-none
            "
          >
            →
          </span>
        </button>
      </div>

      {/* Form note */}
      <p
        id="contactFormNote"
        className="
          font-sans text-[12px]
          leading-[1.7]
          text-text-body

          sm:col-span-2
        "
      >
        {t("unavailable")}
      </p>
    </form>
  );
}