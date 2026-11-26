import NotFoundContent from "@/components/common/NotFoundContent";

import messages from "@/messages/tr.json";

export default function NotFound() {
  const t = messages.NotFoundPage;

  return (
    <NotFoundContent
      title={t.title}
      description={t.description}
      backToHome={t.backToHome}
      homeHref="/"
    />
  );
}