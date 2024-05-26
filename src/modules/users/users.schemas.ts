import {z} from "zod";

import zodToJsonSchema from "zod-to-json-schema";

const CreateUserBodySchema = z.object({

    name:z.string(),
    email:z.string().email(),
    password:z.string().min(6),
    applicationId:z.string().uuid(),
    initialUser:z.boolean().optional(),
});

export type CreateUserBody = z.infer<typeof CreateUserBodySchema>;

export const CreateUserBodyJsonSchema = {

    body:zodToJsonSchema(
        CreateUserBodySchema,
        "CreateUserBodySchema",
        ),
}


// Login

const LoginBodySchema = z.object({

    email:z.string().email(),
    password:z.string().min(6),
    applicationId:z.string(),
});

export type LoginBody = z.infer<typeof LoginBodySchema>;

export const LoginBodyJsonSchema = {

    body:zodToJsonSchema(
        LoginBodySchema,
        "LoginBodySchema",
        ),
}