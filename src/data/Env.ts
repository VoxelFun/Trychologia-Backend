export const DEV = process.env.DEV === "true";

export const Database = {
    HOST: process.env.DATABASE_HOST,
    NAME: process.env.DATABASE_NAME,
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD
};

export const Network = {
    PORT: process.env.NETWORK_PORT
};