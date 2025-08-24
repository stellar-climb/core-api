import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AdminUsersService } from '../applications/admin-users.service';
import { Context, ContextKey } from '@libs/context';
import { AdminGuard } from '@libs/guards/admin.guard';

@Controller('/admins/users')
@UseGuards(AdminGuard)
export class AdminUsersController {
  constructor(
    private readonly context: Context,
    private readonly adminUsersService: AdminUsersService
  ) {}

  @Get()
  async list() {
    const data = await this.adminUsersService.list();

    return { data };
  }

  @Get('self')
  async self() {
    const user = this.context.get<ContextKey.USER>(ContextKey.USER);

    return { data: user };
  }

  @Get(':id')
  async retrieve(@Param('id') id: string) {
    const data = await this.adminUsersService.retrieve({ id });

    return { data };
  }
}
