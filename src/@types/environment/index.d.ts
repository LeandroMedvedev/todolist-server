declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PG_PORT: number | undefined;
      }
    }
  }
  
  export {};
  