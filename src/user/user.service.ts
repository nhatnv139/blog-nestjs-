import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private useRepository: Repository<User>,
  ) {}
  async findAll(query: FilterUserDto): Promise<User[]> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';
    const [res, total] = await this.useRepository.findAndCount({
      where: [
        { first_name: Like('%' + keyword + '%') },
        { last_name: Like('%' + keyword + '%') },
        { email: Like('%' + keyword + '%') },
      ],
      order: { create_at: 'DESC' },
      take: items_per_page,
      skip: skip,
      select: [
        'id',
        'first_name',
        'last_name',
        'email',
        'status',
        'create_at',
        'update_at',
      ],
    });
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
      data: res,
      total,
      currenPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
  }

  async findOne(id: number): Promise<User> {
    return await this.useRepository.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    // const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    // const hashPassword = await bcrypt.hash
    return await this.useRepository.save({
      ...createUserDto,
      password: hashPassword,
    });
  }
}
