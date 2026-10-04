import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@UseGuards(AuthenticatedGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Throttle({ write: {} })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @Throttle({ read: {} })
  async findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @Throttle({ read: {} })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  @Throttle({ write: {} })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @Throttle({ write: {} })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
