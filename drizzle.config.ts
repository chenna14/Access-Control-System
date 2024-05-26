import {defineConfig} from "drizzle-kit";


export default defineConfig({
    
    schema:"./src/db/schema.ts",
    out:"./migrations",
    dialect:"postgresql",
    breakpoints:false,

    dbCredentials:{
        url:'postgresql://user-api_owner:l1BUyJPeX9mj@ep-lucky-paper-a1vyntr4-pooler.ap-southeast-1.aws.neon.tech/user-api?sslmode=require',
    }
});