import { text, unique } from "drizzle-orm/pg-core";
import { primaryKey } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { pgTable, uuid } from "drizzle-orm/pg-core";

import { timestamp } from "drizzle-orm/pg-core";

import { uniqueIndex } from "drizzle-orm/pg-core";




export const applications = pgTable("applications", {
    id:uuid("id").primaryKey().defaultRandom(),
    
    name:varchar("name",{length:255}).notNull(),

    created_at:timestamp("created_at").notNull().defaultNow(),

    updated_at:timestamp("updated_at").notNull().defaultNow(),

});


export const users = pgTable("users", {
    id: uuid("id").defaultRandom().notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    applicationId: uuid('applicationId').references(() => applications.id).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
}, (users) => {
    return {
        cpk: primaryKey(users.email, users.applicationId),
        idIndex: uniqueIndex("users_id_index").on(users.id),
    };
});

export const roles = pgTable("roles", {
    id: uuid("id").defaultRandom().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    applicationId: uuid('applicationId').references(() => applications.id).notNull(),
    Permissions:text("permissions").array().$type<Array<string>>(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
}, (roles) => {
    return {
        cpk: primaryKey(roles.name, roles.applicationId),
        idIndex: uniqueIndex("roles_id_index").on(roles.id),
    };
});

export const usersToRoles = pgTable("usersToRoles", {

    applicationId: uuid('applicationId').references(() => applications.id).notNull(),

    userId: uuid('userId').references(() => users.id).notNull(),

    roleId: uuid('roleId').references(() => roles.id).notNull(),
},

    (usersToRoles) => {
        return {
            cpk: primaryKey(usersToRoles.userId, usersToRoles.roleId, usersToRoles.applicationId),
        };
    }


);


