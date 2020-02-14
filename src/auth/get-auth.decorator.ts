import { createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

export const GetAuthDecorator = createParamDecorator((data, req): User => {
  return req.user;
});