declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string;
        PORT: string;
        ALLOWED_ORIGIN: string;
    }
}
