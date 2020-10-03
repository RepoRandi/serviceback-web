import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { fUserToUserDto } from 'src/api/admin/user/user.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = fUserToUserDto(await admin.auth().getUser(request.user.uid));

    return matchRoles(roles, user.role);
  }
}

const matchRoles = (roles: string[], userRole: string) => {
  return roles.includes(userRole);
};
