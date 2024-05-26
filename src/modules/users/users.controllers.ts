import { FastifyRequest, FastifyReply } from 'fastify';

import { CreateUserBody, LoginBody } from './users.schemas';
import { SYSTEM_ROLE } from '../../config/permissions';
import { GetRoleByName } from '../roles/roles.services';
import { GetUsersByApplication } from './users.services';

import { CreateUser } from './users.services';

import { assignRoleToUser } from './users.services';

import { GetUserByEmail } from './users.services';

import jwt from 'jsonwebtoken';

import { users } from '../../db/schema';

export async function createUserHandler(

    request:FastifyRequest<{
        Body:CreateUserBody,
    }>,
    reply:FastifyReply
){

    const {initialUser, ...data} = request.body;

    const roleName = initialUser ? SYSTEM_ROLE.SUPER_ADMIN : SYSTEM_ROLE.APPLICATION_USER;

    const role = GetRoleByName({
        name:roleName,
        applicationId:data.applicationId,
    });

    if(roleName === SYSTEM_ROLE.SUPER_ADMIN){
        

        const appUsers = await GetUsersByApplication(data.applicationId);

        if(appUsers.length > 0){
           
            return reply.status(400).send({
                message:"Application already has a super admin",

                extensions:{
                    code:"APPLICATION_ALREADY_HAS_SUPER_ADMIN",
                    applicationId:data.applicationId,
                },
            });
        }
    }


    const Role = await GetRoleByName({
        name:roleName,
        applicationId:data.applicationId,
    });


    if(!Role){
        return reply.status(404).send({
            message:"Role not found",
            extensions:{
                code:"ROLE_NOT_FOUND",
                roleName,
                applicationId:data.applicationId,
            },
        });
    }


    try{

        const user = await CreateUser(data);

        // assign a role to the user

        await assignRoleToUser({
            userId:user.id,
            roleId:Role.id,
            
            applicationId:data.applicationId,
        });

        return user;
    }catch(e){


    }


}


export async function loginHandler(

    request:FastifyRequest<{
        Body:LoginBody,
    }>,
    reply:FastifyReply
){

    const {applicationId,email,password} = request.body;

    const user = await GetUserByEmail({
        email,
        applicationId,
    });

    if(!user){
        return reply.status(400).send({
            message:"Invalid email or password",
            extensions:{
                code:"USER_NOT_FOUND",
                email,
                applicationId,
            },
        });
    }

    // return user;
     

    const token = jwt.sign({
        // id:user.id,
        email,
        applicationId,
        // scops:user.permissions, 
    },"secret");

    return{
        token,
    };
}