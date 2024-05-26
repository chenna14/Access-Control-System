import { InferModel } from "drizzle-orm";
import {db} from "../../db";

import {applications} from "../../db/schema";

export async function CreateApplicationService(data:InferModel<typeof applications,"insert">) {

    const result = await db.insert(applications).values(data).returning();

    return result[0];

}


export async function GetApplicationsService() {

    const result = await db.select({

        id:applications.id,
        name:applications.name,
        created_at:applications.created_at,
    }).from(applications);

    return result;

}
    