import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AdminUsersService } from '../applications/admin-users.service';
import { UsersCreateDto } from './dto';

@Controller('/admins/users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()
  async list() {
    const data = await this.adminUsersService.list();

    return { data };
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: UsersCreateDto) {
    const data = await this.adminUsersService.googleSignIn(body);

    return { data };
  }
}
