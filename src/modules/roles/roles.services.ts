import { db } from "../../db";

import { roles } from "../../db/schema";

import { InferModel } from "drizzle-orm";

import { and, eq } from "drizzle-orm";

export async function CreateRoleService(data: InferModel<typeof roles, "insert">) {

    const result = await db.insert(roles).values(data).returning();

    return result[0];

}

export async function GetRoleByName({
    name,
    applicationId,
}:{
    name:string,
    applicationId:string,
}) {

    const result = await db
    .select()
    .from(roles)
    .where(and(eq(roles.name,name),eq(roles.applicationId,applicationId)))
    .limit(1);
    
    return result[0];
}
