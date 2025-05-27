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
  info: string;
  infoEs: string | null | undefined;
  infoDe: string | null | undefined;      
  infoFr: string | null | undefined;       
  repo: string;
  media: string[];
  date: Date;
};