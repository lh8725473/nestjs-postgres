import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findQuery(query) {
    const { pageNum = 1, pageSize = 10, ...params } = query;
    const skip = pageSize * (pageNum - 1);
    const take = pageSize;
    const [list, total] = await this.userRepository.findAndCount({
      skip: skip,
      take: take,
      relations: ['cat'],
      // where:
      //   name: Like(`%${query.name}%`),
      //   age: Like(`%${query.age}%`),
      // },
      where: [
        { name: Like(`%${query.name}%`) },
        { age: Like(`%${query.age}%`) },
      ],
    });

    return {
      list: list,
      total: total,
    };

    // return await this.userRepository.findAndCount({
    //   skip: skip,
    //   take: take,
    //   relations: ['cat'],
    //   where: {
    //     name: Like(`%${query.name}%`),
    //     age: Like(`%${query.age}%`),
    //   },
    // });
  }

  async findOne(id: number) {
    // return await this.userRepository.findOneBy({
    //   id: id,
    // });

    return await this.userRepository.findOne({
      relations: ['cat'],
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
