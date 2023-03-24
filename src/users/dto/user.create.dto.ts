import { IsString, IsNotEmpty, Length, Matches, IsUUID } from 'class-validator';

// Regex
import {
  ONLY_LETTERS_AND_NUMBERS,
  ONLY_LETTERS_AND_GAPS,
} from 'src/@shared/regexHelper';

export class UserCreateDto {
  @IsString({
    message: 'Name must be a string',
  })
  @Matches(ONLY_LETTERS_AND_GAPS, {
    message: 'User must be only letters',
  })
  name: string;

  @IsUUID('4', {
    message: 'Role must be a valid UUID',
  })
  roleId: string;

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
