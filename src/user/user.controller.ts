import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
// import { promises } from 'dns';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    
    return this.userService.findAll();
  }


  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id:string):Promise<User>{
    return this.userService.findOne(Number(id))
  }
}
