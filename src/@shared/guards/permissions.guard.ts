
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt.guard';
import { PrismaService } from '@libs/prisma-client';


@Injectable()
export class PermissionsGuard extends JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const permissions = this.reflector.get(
      'permissions',
      context.getHandler(),
    );

    if (!permissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const userValidate = await this.prismaService.user.findUnique({
      where: {
        id: user.userId,
      },
      select: {
        permissions: true,
        role: {
          select: {
            permissions: true,
          },
        },
        groups: {
          select: {
            roles: {
              select: {
                permissions: true,
              },
            },
          },
        },
      },
    });


    const userPermissions = userValidate.permissions.map(
      (permission) => permission.name,
    );

    const rolePermissions = userValidate.role.permissions.map(
      (permission) => permission.name,
    );

    const groupPermissions = userValidate.groups.reduce(
      (acc, group) => {
        return [
          ...acc,
          ...group.roles.reduce((acc, role) => {
            return [
              ...acc,
              ...role.permissions.map((permission) => permission.name),
            ];
          }, []),
        ];
      },

      [],
    );


    const allPermissions = [
      ...userPermissions,
      ...rolePermissions,
      ...groupPermissions,
    ];

    return permissions.every((permission) =>
      allPermissions.includes(permission),
    );
  }
}
