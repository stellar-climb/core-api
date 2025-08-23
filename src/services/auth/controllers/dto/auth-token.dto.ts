import { IsNotEmpty, IsString } from 'class-validator';

export class AuthTokenDto {
  @IsString()
  @IsNotEmpty()
  googleToken: string;
}
