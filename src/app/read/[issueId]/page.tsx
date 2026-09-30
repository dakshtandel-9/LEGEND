import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { issues } from "@/data/issues";

type ReaderPageProps = { params: Promise<{ issueId: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return issues.map((issue) => ({ issueId: issue.id }));
}

export async function generateMetadata({ params }: ReaderPageProps): Promise<Metadata> {
  const { issueId } = await params;
  const issue = issues.find((item) => item.id === issueId);
  if (!issue) return {};
  return {
    title: `Read the ${issue.title} edition`,
    description: `Read LEGEND Issue ${issue.issueNumber}, ${issue.title}, online.`,
  };
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const { issueId } = await params;
  const issue = issues.find((item) => item.id === issueId);
  if (!issue) notFound();

  return (
    <div className="reader-shell">
      <header className="reader-intro">
        <Link href="/#editions" className="reader-back">← All editions</Link>
        <p className="reader-kicker">LEGEND / Issue {issue.issueNumber}</p>
        <h1>{issue.title}</h1>
        <p>Read the full edition below.</p>
        <span>{issue.pageCount} pages</span>
      </header>
      <div className={`reader-pages ${issue.pageWidth > issue.pageHeight ? "reader-wide" : "reader-portrait"}`}>
        {Array.from({ length: issue.pageCount }, (_, index) => {
          const page = index + 1;
          return (
            <figure className="reader-page" id={`page-${page}`} key={page}>
              <Image
                src={`/reader/${issue.id}/page-${String(page).padStart(2, "0")}.jpg`}
                alt={`Page ${page} of LEGEND ${issue.title}`}
                width={issue.pageWidth}
                height={issue.pageHeight}
                sizes={issue.pageWidth > issue.pageHeight ? "(max-width: 1300px) 100vw, 1300px" : "(max-width: 960px) 100vw, 960px"}
                priority={page === 1}
              />
              <figcaption>{String(page).padStart(2, "0")} / {String(issue.pageCount).padStart(2, "0")}</figcaption>
            </figure>
          );
        })}
      </div>
      <footer className="reader-end">
        <span>End of issue {issue.issueNumber}</span>
        <Link href="/#editions">Explore the editions ↗</Link>
      </footer>
    </div>
  );
}
