import {
  IsDefined,
  IsEmpty,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

export class CreateUserDto {
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
  
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  lastName: string;

  access_token: string;

  isDelete: boolean = false;

  isActive: boolean = false;
}
