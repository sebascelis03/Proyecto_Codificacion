declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly NEXT_PUBLIC_API_URL: string;
    readonly NEXT_PUBLIC_APP_VERSION: string;
  }
}
