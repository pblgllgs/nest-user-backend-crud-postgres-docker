import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw new HttpException(
        'Puppies not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'Error reading puppies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(newUser: UserDto): Promise<UserDto> {
    try {
      const user = await this.userRepository.create(newUser);
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new HttpException(
        'Error registering user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async findAll(): Promise<User[]> {}

  // create(user: UserDto) {
  //   return {};
  // }

  // update(user: Partial<UserDto>, id: string) {
  //   return {};
  // }
  // delete(id: string) {
  //   return {};
  // }
}
