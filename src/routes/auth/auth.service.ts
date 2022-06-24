import { Injectable } from '@nestjs/common';

// import { User } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
// import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  /**
   * validate user - approach passport strategy
   * @param user
   * @returns
   */
  async validateUser(userRequest: LoginUserDto) {
    const users = await this.usersService.findEmailToAuthentication(
      userRequest,
    );
    return users;
  }
}
