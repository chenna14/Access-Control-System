import fastify from "fastify";
import { logger } from "./logger";
import { applicationRoutes } from "../modules/applications/applications.routes";
import { userRoutes } from "../modules/users/users.routes";

import { roleRoutes } from "../modules/roles/roles.routes";

export async function createServer() {
    const server = fastify({ logger,});

    server.register(applicationRoutes, { prefix: "/api/applications" });

    server.register(userRoutes, { prefix: "/api/users" });

    server.register(roleRoutes, { prefix: "/api/roles" });


    return server;
}