declare module 'next' {
    export interface Metadata {
      title?: string | { default?: string; template?: string; absolute?: string };
      description?: string;
    }
  
    export namespace MetadataRoute {
      export type Sitemap = Array<{
        url: string;
        lastModified?: string | Date;
        changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
        priority?: number;
      }>;
    }
  }