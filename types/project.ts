export type Project = {
    id: string;
    title: string;
    slug: string;
    link: string;
    summary: string;
    summaryEs: string | null | undefined;  
    info: string;
    infoEs: string | null | undefined;     
    repo: string;
    media: string[];
    date: Date;
  };