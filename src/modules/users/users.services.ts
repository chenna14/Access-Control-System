import { InferModel } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";

import argon2 from 'argon2';

import { eq } from "drizzle-orm";

import { usersToRoles } from "../../db/schema";

import { and } from "drizzle-orm";

import { roles } from "../../db/schema";



export async function CreateUser(data:InferModel<typeof users,"insert">) {

    const hashedPassword = await argon2.hash(data.password);
    const result = await db.insert(users).values({
        ...data,
        password:hashedPassword,
    })
    .returning({
        id:users.id,
        name:users.name,
        email:users.email,
        applicationId:users.applicationId,
    });

    return result[0];
    
}


export async function GetUsersByApplication(applicationId:string) {

    const result = await db
    .select({
        id:users.id,
        name:users.name,
        email:users.email,
        applicationId:users.applicationId,
        roleId:roles.id,
        password:users.password,
        Permissions:roles.Permissions,
    }
    )
    .from(users)
    .where(eq(users.applicationId,applicationId));

    return result;
}

export async function assignRoleToUser(

    data: InferModel<typeof usersToRoles, "insert">,
){
    const result = await db.insert(usersToRoles).values(data).returning();
    return result[0];
}

export async function GetUserByEmail({

    email,applicationId
}:{
    email:string,
    applicationId:string,
}) {
    const result = await db
    .select()
    .from(users)
    .where(
        and (eq(users.email,email), eq(users.applicationId,applicationId)))
    .leftJoin(usersToRoles,
        and(
            eq(usersToRoles.userId,users.id),
            eq(usersToRoles.applicationId,users.applicationId)
        )
        )
    .leftJoin(roles,eq(roles.id,usersToRoles.roleId));

    if(!result.length)
    {
        return null;
    }

   
    return result;
}


