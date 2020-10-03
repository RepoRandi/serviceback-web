import { UserRole } from '@entities/User';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import {
  fUserToUserDto,
  User,
  UserCreateDto,
  userDtoToFUser,
  UserUpdateDto,
} from './user.dto';

@Injectable()
export class UserService {
  async getUserList(limit: number, pageToken?: string): Promise<User[]> {
    const fUsers = pageToken
      ? await (await admin.auth().listUsers(limit, pageToken)).users
      : await (await admin.auth().listUsers(limit)).users;
    const users: User[] = fUsers.map(fu => {
      return fUserToUserDto(fu);
    });
    return users;
  }

  async getUserById(id: string): Promise<User> {
    return fUserToUserDto(await admin.auth().getUser(id));
  }

  async updateUserById(
    id: string,
    userUpdateDto: UserUpdateDto,
  ): Promise<User> {
    const fUser = userDtoToFUser(userUpdateDto);
    delete fUser.email; // Prevent Email Change - Should handle via validation later
    if (userUpdateDto.role) {
      await admin.auth().setCustomUserClaims(id, { role: userUpdateDto.role });
    }
    const fUserUpdated = await admin.auth().updateUser(id, fUser);

    return fUserToUserDto(fUserUpdated);
  }

  async createUser(userCreateDto: UserCreateDto): Promise<User> {
    const fUser = userDtoToFUser(userCreateDto);
    const fUserCreated = await admin.auth().createUser(fUser);
    const role = userCreateDto.role || UserRole.CUSTOMER;
    await admin.auth().setCustomUserClaims(fUserCreated.uid, { role });

    return fUserToUserDto(await admin.auth().getUser(fUserCreated.uid));
  }
}
