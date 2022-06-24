import {
  IsDefined,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
    message: 'Email is not valid',
  })
  emailAddress: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @Length(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: 'password too weak',
    },
  )
  password: string;
}
