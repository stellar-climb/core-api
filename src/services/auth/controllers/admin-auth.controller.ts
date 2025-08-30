import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Get('bull-dashboard')
  async getBullDashboard() {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.adminAuthService.accessBullDashboard();

    // 4. Send response
    return { data };
  }
}
