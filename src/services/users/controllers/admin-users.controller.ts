import { Controller, Get } from '@nestjs/common';
import { AdminUsersService } from '../applications/admin-users.service';

@Controller('/admins/users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()
  async list() {
    const data = await this.adminUsersService.list();

    return { data };
  }
}
