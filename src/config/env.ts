import Zennv from "zennv";
import { z } from "zod";

export const env = Zennv({
    dotenv: true,

    schema: z.object({
        PORT: z.number().default(3003),
        HOST: z.string().default("0.0.0.0"),
        DATABASE_CONNECTION: z.string(),
    }),
});

if (!env.DATABASE_CONNECTION) {
    console.error("DATABASE_CONNECTION environment variable is required but not set.");
    process.exit(1);
}

console.log(env);
