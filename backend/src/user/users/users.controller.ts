import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(): any {
    return { id: 1 };
  }

  @Get(':id')
  getUser(@Param('id') id: string): any {
    return { id: id };
  }
}
