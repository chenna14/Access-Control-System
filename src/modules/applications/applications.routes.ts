import { FastifyInstance } from "fastify";
import { CreateApplicationBodyJsonSchema } from "./applications.schemas";
import { CreateApplicationHandler } from "./applications.controllers";
import { GetApplicationsHandler } from "./applications.controllers";

export async function applicationRoutes(app:FastifyInstance){

    app.post("/",{
        schema:CreateApplicationBodyJsonSchema,
    },
    CreateApplicationHandler);
    app.get("/",GetApplicationsHandler);

}