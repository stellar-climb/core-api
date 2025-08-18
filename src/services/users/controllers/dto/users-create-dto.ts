import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UsersCreateDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Matches(/^[a-zA-Z\d`~!@#$%^&*()-_=+]{8,24}$/, {
    message: '비밀번호는 8~24자리의 영문, 숫자, 특수문자(`~!@#$%^&*()-_=+)만 사용할 수 있습니다.',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
