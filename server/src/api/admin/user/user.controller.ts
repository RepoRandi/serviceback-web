import {
  Body,
  Controller,
  Get,
  Put,
  Post,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { UserCreateDto, User, UserUpdateDto } from './user.dto';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/common/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@entities/User';

@ApiTags('Users')
@ApiSecurity('bearer')
@UseGuards(AuthGuard('firebase'), RolesGuard)
@Controller()
export class UserController {
  constructor(public service: UserService) {}

  @Roles(UserRole.ADMIN)
  @Get()
  async getUserList(
    @Query() query: { limit: string; pageToken: string },
  ): Promise<{ data: User[]; count: number; pageToken: string }> {
    const limit = query.limit ? parseInt(query.limit) : 100;
    const data: User[] = await this.service.getUserList(limit, query.pageToken);
    const count = data.length;
    const pageToken = data[count - 1].id;
    return {
      data,
      count,
      pageToken,
    };
  }

  @Roles(UserRole.ADMIN)
  @Post()
  createUser(@Body() userCreateDto: UserCreateDto): Promise<User> {
    return this.service.createUser(userCreateDto);
  }

  @Roles(UserRole.ADMIN)
  @Get(':id')
  getUserById(@Param() params: { id: string }): Promise<User> {
    return this.service.getUserById(params.id);
  }

  @Roles(UserRole.ADMIN)
  @Put(':id')
  updateUserById(
    @Param() params: { id: string },
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<User> {
    return this.service.updateUserById(params.id, userUpdateDto);
  }
}
