import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<UserDto[]> {
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

  async findOne(id: string): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: id
        } // where id is your column name
      })
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
  async create(newUser: UserDto): Promise<User> {
    try {
      const user = this.userRepository.create(newUser);
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new HttpException(
        'Error registering user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.delete({ id });
    return user;
  }

  async update(id: string, data: Partial<UserDto>) {
    let user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.update(id, data);
    user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    return user;
  }
}

