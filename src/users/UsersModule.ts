import { Module } from '@nestjs/common';
import { UsersController } from './UsersController';
import { UsersRepository } from './UsersRepository';

@Module({
    imports: [],
    providers: [UsersRepository],
    controllers: [UsersController],
    exports: []
})
export class UsersModule {}
