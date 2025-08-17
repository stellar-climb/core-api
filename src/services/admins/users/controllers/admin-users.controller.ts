import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class AdminUsersController {
  @Get('/')
  getUsers() {
    return 'hi';
  }
}
