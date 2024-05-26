import { FastifyReply, FastifyRequest } from "fastify";
import { CreateRoleBody } from "./roles.schemas";
import { createRole } from "./roles.services";

import { FastifyInstance } from "fastify";



export async function createRoleHandler(
  request: FastifyRequest<{
    Body: CreateRoleBody;
  }>,
  reply: FastifyReply
) {
 
  const { name, permissions, applicationId } = request.body;

  const role = await createRole({
    name,
    Permissions: permissions,
    applicationId,
  });

  return role;
}