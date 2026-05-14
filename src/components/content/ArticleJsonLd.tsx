import { siteName, siteUrl } from "@/lib/seo";

type ArticleJsonLdProps = {
  title: string;
  description: string;
  path: `/${string}`;
};

export default function ArticleJsonLd({
  title,
  description,
  path,
}: ArticleJsonLdProps) {
  const canonicalPath = path.endsWith("/") ? path : `${path}/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: "2026-05-15",
    dateModified: "2026-05-15",
    inLanguage: "en-AU",
    mainEntityOfPage: `${siteUrl}${canonicalPath}`,
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
