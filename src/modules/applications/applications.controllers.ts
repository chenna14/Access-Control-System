import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateApplicationBody } from './applications.schemas';

import { CreateApplicationService, GetApplicationsService } from './applications.services';
import { ALL_PERMISSIONS, SYSTEM_ROLE, USER_ROLE } from '../../config/permissions';

import { CreateRoleService } from '../roles/roles.services';

export async function CreateApplicationHandler(

    request: FastifyRequest<{
        Body:CreateApplicationBody,
    }>,
    reply: FastifyReply
) {
    

    const {name} = request.body;

    const application = await CreateApplicationService({
        name,
    });

    const superAdminRole = await CreateRoleService({
        applicationId:application.id,
        name:SYSTEM_ROLE.SUPER_ADMIN,
        Permissions:ALL_PERMISSIONS as unknown as Array<string>,
    });

    const applicationUserRole = await CreateRoleService({
        applicationId:application.id,
        name:SYSTEM_ROLE.APPLICATION_USER,
        Permissions:USER_ROLE as unknown as Array<string>,
    });

    return{
        application,
        superAdminRole,
        applicationUserRole,
    };

}

export async function GetApplicationsHandler() {
    return GetApplicationsService();
}