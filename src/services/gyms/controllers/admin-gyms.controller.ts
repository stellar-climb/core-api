import { Body, Controller, Get, Post, UseGuards, Query } from '@nestjs/common';
import { AdminGymsService } from '../applications/admin-gyms.service';
import { AdminGuard } from '@libs/guards';
import { GymCreateDto } from './dto';
import type { PaginationOptions } from '@libs/utils';

@Controller('admins/gyms')
@UseGuards(AdminGuard)
export class AdminGymsController {
  constructor(private readonly adminGymsService: AdminGymsService) {}

  @Post()
  async register(@Body() body: GymCreateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminGymsService.register({ ...body });

    // 4. Send response
    return { data: {} };
  }

  @Get()
  async list(@Query() query: PaginationOptions) {
    // 1. Destructure body, params, query
    const { ...options } = query;

    // 2. Get context
    // 3. Get result
    const data = await this.adminGymsService.list({}, options);

    // 4. Send response
    return { data };
  }
}
