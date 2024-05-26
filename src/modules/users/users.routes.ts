import { FastifyInstance } from "fastify";
import { CreateUserBodyJsonSchema, LoginBodyJsonSchema } from "./users.schemas";
import { createUserHandler, loginHandler } from "./users.controllers";

export async function userRoutes(app:FastifyInstance) {

    app.post('/',{
        schema:CreateUserBodyJsonSchema,
    },
    createUserHandler
    );

    app.post(
        '/login',
    {
        schema:LoginBodyJsonSchema,
    },
    loginHandler
    );
    
}

