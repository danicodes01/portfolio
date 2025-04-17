declare module 'better-sqlite3' {
    const content: any;
    export default content;
  }
  
  declare namespace NodeJS {
    interface Process {
      env: ProcessEnv;
    }
    
    interface ProcessEnv {
      [key: string]: string | undefined;
      NODE_ENV?: 'development' | 'production' | 'test';
    }
  }