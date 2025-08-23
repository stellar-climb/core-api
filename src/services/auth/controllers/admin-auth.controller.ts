import { Body, Controller, Post } from '@nestjs/common';
import { AuthTokenDto } from './dto';
import { AdminAuthService } from '../applications/admin-auth.service';

@Controller('admins/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('token')
  async createToken(@Body() body: AuthTokenDto) {
    const data = await this.adminAuthService.createToken(body);

    return { data };
  }
}
