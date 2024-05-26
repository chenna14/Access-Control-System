// console.log("Hello chenna")

import { env } from "./config/env";
import { logger } from "./utills/logger";
import { createServer } from "./utills/sever";

import { db } from "./db";

import {migrate} from "drizzle-orm/node-postgres/migrator"
async function gratefullShutdown({
    app,
}:{
    app:Awaited<ReturnType<typeof createServer>>;
}){
    logger.info("Gracefully shutting down the server");

    await app.close();

    // process.exit(0);
}

async function main()
{
    const app = await createServer();

    await app.listen({
        port: env.PORT,
        host: env.HOST,
    });

    await migrate(db,{
        migrationsFolder: "./migrations",
    });

    logger.info("Server is running at 3000 port local host")

    const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

    logger.debug(env,"using dev");

    signals.forEach((signal) => {

        
        process.on(signal, async () => {
            console.log("Got signal", signal);
            await gratefullShutdown({ app });
        });
    });
}

main();