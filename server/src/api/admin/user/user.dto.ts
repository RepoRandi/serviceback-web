import { UserRole } from 'src/entities/User';
import { OmitType } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import { StringDtoProperty, DtoProperty } from 'src/common/dto.helpers';

@Exclude()
export class User {
  @StringDtoProperty()
  id: string;

  @StringDtoProperty()
  name: string;

  @IsEmail()
  @DtoProperty()
  email: string;

  @DtoProperty({ enum: UserRole })
  role: UserRole;

  @DtoProperty()
  emailVerified: boolean;

  @DtoProperty()
  disabled: boolean;
}

export class UserCreateDto extends OmitType(User, ['id']) {}

export class UserUpdateDto extends OmitType(UserCreateDto, ['email']) {}

export const fUserToUserDto: any = (fUser: any) => {
  const user: User = {
    id: fUser.uid,
    name: fUser.displayName,
    email: fUser.email,
    role: (fUser.customClaims || {}).role || UserRole.CUSTOMER,
    disabled: fUser.disabled,
    emailVerified: fUser.emailVerified,
  };

  return user;
};

export const userDtoToFUser: any = (user: any) => {
  const fUser: any = {
    uid: user.id,
    displayName: user.name,
    email: user.email,
    disabled: user.disabled,
    emailVerified: user.emailVerified,
  };

  return fUser;
};
