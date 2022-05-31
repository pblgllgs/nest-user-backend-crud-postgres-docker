import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  getUsers() {
    return this.userService.findAll();
  }

  @Get('/:id')
  getUser(@Param('id')id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body() body: UserDto) {
    return this.userService.create(body);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() newUser: Partial<UserDto>) {
    return this.userService.update(id, newUser);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
