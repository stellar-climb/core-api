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

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: UsersCreateDto) {
    await this.adminUsersService.register(body);
  }
}
