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
    return { data: await this.usersService.create(createUserDto) }
  }

  @Get()
  @Throttle({ read: {} })
  async findAll() {
    return { data: await this.usersService.findAll() }
  }

  @Get(':id')
  @Throttle({ read: {} })
  async findOne(@Param('id') id: string) {
    return { data: await this.usersService.findOne(id) }
  }

  @Patch(':id')
  @Throttle({ write: {} })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return { data: await this.usersService.update(id, updateUserDto) }
  }

  @Delete(':id')
  @Throttle({ write: {} })
  async remove(@Param('id') id: string) {
    return { data: await this.usersService.remove(id) }
  }
}
