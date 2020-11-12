import { Controller, Param, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UsersRepository } from '@/users/UsersRepository';
import { User } from '@/users/ineterfaces/UserInterface';

@Controller('/users')
export class UsersController {
    constructor(readonly usersRepository: UsersRepository) {}

    @Get('/:username')
    @ApiOperation({ description: 'Get user details' })
    async getUser(@Param('username') username: string): Promise<User> {
        return this.usersRepository.findByUsername(username);
    }

    @Get(':username/photos')
    @ApiOperation({ description: 'Get user photos' })
    async findUserPhotos(@Param('username') username: string): Promise<any[]> {
        return this.usersRepository.findUserPhotos(username);
    }
}
