import Image from "next/image";

import type { BlogPostSummary } from "@/lib/blog";

type Props = {
  post: BlogPostSummary;
};

export default function ArticleCover({
  post,
}: Props) {
  return (
    <div
      className="
        relative mx-auto
        w-[calc(100%_-_40px)]
        max-w-[1140px]

        aspect-video
        overflow-hidden

        bg-brand-mist
      "
    >
      <Image
        src={post.image}
        alt={post.imageAlt}
        fill
        sizes="
          (max-width: 1180px) calc(100vw - 40px),
          1140px
        "
        className="object-cover object-center"
      />
    </div>
  );
}