import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminGymsService } from '../applications/admin-gyms.service';
import { AdminGuard } from '@libs/guards';
import { GymCreateDto } from './dto';

@Controller('admins/gyms')
@UseGuards(AdminGuard)
export class AdminGymsController {
  constructor(private readonly adminGymsService: AdminGymsService) {}

  @Post()
  async register(@Body() body: GymCreateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    // 4. Send response
  }
}
