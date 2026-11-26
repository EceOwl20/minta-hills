import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  backToHome: string;
  homeHref: string;
};

export default function NotFoundContent({
  title,
  description,
  backToHome,
  homeHref,
}: Props) {
  return (
    <main
      id="main"
      className="
        flex min-h-screen min-h-svh
        items-center justify-center

        bg-[#111111]
        px-6 py-24

        text-center text-white
      "
    >
      <div className="mx-auto w-full max-w-[620px]">
        {/* Minta Hills logo */}
        <Image
          src="/images/branding/logo-crest.png"
          alt="Minta Hills"
          width={150}
          height={150}
          preload
          className="
            mx-auto mb-7
            h-[150px] w-[150px]
            object-contain
          "
        />

        {/* Error code */}
        <p
          className="
            mb-4

            font-sans text-[12px]
            font-medium
            tracking-[0.35em]
            text-white/60
          "
        >
          404
        </p>

        {/* Heading */}
        <h1
          className="
            font-sans font-light
            text-[clamp(34px,7vw,72px)]
            leading-[1.1]
            tracking-[-0.035em]
          "
        >
          {title}
        </h1>

        {/* Description */}
        <p
          className="
            mx-auto mt-5 max-w-[480px]

            font-sans text-[15px]
            font-light leading-[1.8]
            text-white/65

            md:text-[17px]
          "
        >
          {description}
        </p>

        {/* Back to homepage */}
        <Link
          href={homeHref}
          className="
            group
            mt-8 inline-flex
            min-h-[48px]
            items-center justify-center gap-4

            rounded-full
            border border-white/45
            px-7 py-3

            font-sans text-[11px]
            font-medium uppercase
            tracking-[0.1em]

            transition-colors duration-300

            hover:border-white
            hover:bg-white
            hover:text-brand-dark

            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-white

            motion-reduce:transition-none
          "
        >
          <span
            aria-hidden="true"
            className="
              text-[17px] leading-none

              transition-transform duration-300
              group-hover:-translate-x-1

              motion-reduce:transition-none
              motion-reduce:transform-none
            "
          >
            ←
          </span>

          {backToHome}
        </Link>
      </div>
    </main>
  );
}