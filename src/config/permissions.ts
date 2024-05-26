export const ALL_PERMISSIONS = [

    // users

    "users:roles:write",
    "users:roles:delete",

    // posts

    "posts:write",
    "posts:delete",
    "posts:read",
    "posts:edit-own",
] as const;

export const PERMISSIONS = ALL_PERMISSIONS.reduce((acc, permission) => {
    acc[permission] = permission;
    return acc;

}, {} as Record<(typeof ALL_PERMISSIONS)[number],(typeof ALL_PERMISSIONS)[number]>
);

export const USER_ROLE = [
    PERMISSIONS["posts:write"],
    PERMISSIONS["posts:delete"],
];

export const SYSTEM_ROLE = {
    
    SUPER_ADMIN:"SUPER_ADMIN",
    APPLICATION_USER:"APPLICATION_USER",

};