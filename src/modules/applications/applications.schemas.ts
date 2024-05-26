import {z} from "zod";

import zodToJsonSchema from "zod-to-json-schema";

const CreateApplicationBodySchema = z.object({
    name : z.string({

        required_error:"Name is required",
    }),
});


export type CreateApplicationBody = z.infer<typeof CreateApplicationBodySchema>;

export const CreateApplicationBodyJsonSchema = {

    body :zodToJsonSchema(
        CreateApplicationBodySchema,
        "CreateApplicationBodySchema",
        ),
}