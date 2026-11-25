import "server-only";

type Props = {
  data: Record<string, unknown>;
};

export default function JsonLd({ data }: Props) {
  const json = JSON.stringify(data).replace(
    /</g,
    "\\u003c"
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: json,
      }}
    />
  );
}

