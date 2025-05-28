// Updated Project type with German and French support
export type Project = {
  id: string;
  title: string;
  slug: string;
  link: string;
  summary: string;
  summaryEs: string | null | undefined;
  summaryDe: string | null | undefined;
  summaryFr: string | null | undefined;

  summaryZh?: string | null;
  summaryAr?: string | null;
  summaryJa?: string | null;
  summaryRu?: string | null;
  info: string;
  infoEs: string | null | undefined;
  infoDe: string | null | undefined;
  infoFr: string | null | undefined;
  infoZh?: string | null;
  infoAr?: string | null;
  infoJa: string | null | undefined;
  infoRu: string | null | undefined;
  repo: string;
  media: string[];
  date: Date;
};
