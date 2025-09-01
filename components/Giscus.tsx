'use client';

import Giscus from '@giscus/react';
import { usePathname } from 'next/navigation';

export function GiscusComments() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith('/en');

  return (
    <Giscus
      id="comments"
      repo={process.env.NEXT_PUBLIC_GISCUS_REPO || "your-username/your-repo"}
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID || ""}
      category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "Announcements"}
      categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || ""}
      mapping="pathname"
      term=""
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="light"
      lang={isEnglish ? "en" : "zh-TW"}
      loading="lazy"
    />
  );
}

// Export with alias for backwards compatibility
export { GiscusComments as Giscus };

