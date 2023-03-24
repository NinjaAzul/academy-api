import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ONLY_LETTERS_AND_NUMBERS } from 'src/@shared/regexHelper';

export class AuthDto {
  @IsString({
    message: 'User must be a string',
  })
  @IsNotEmpty({
    message: 'User is required',
  })
  @Matches(ONLY_LETTERS_AND_NUMBERS, {
    message: 'User must be only letters and numbers',
  })
  @Length(8, 20, {
    message: 'User must be between 8 and 20 characters',
  })
  user: string;

  @IsString({
    message: 'Password must be a string',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  @Length(8, 20, {
    message: 'Password must be between 8 and 20 characters',
  })
  password: string;
}
