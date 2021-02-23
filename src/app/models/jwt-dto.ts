import {User} from './user';

export class JwtDTO {
  token: string;
  type: string;
  username: string;
  roles: string[];
  user: User;
}
