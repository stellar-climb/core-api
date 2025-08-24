import { Controller } from '@nestjs/common';
import { AdminGymsService } from '../applications/admin-gyms.service';

@Controller('admins/gyms')
export class AdminGymsController {
  constructor(private readonly adminGymsService: AdminGymsService) {}
}
