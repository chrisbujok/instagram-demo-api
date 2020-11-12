import { Module } from '@nestjs/common';
import { HealthModule } from './health/HealthModule';
import { DrivineModule, DrivineModuleOptions } from '@liberation-data/drivine/DrivineModule';
import { DatabaseRegistry } from '@liberation-data/drivine/connection/DatabaseRegistry';
import { UsersModule } from '@/users/UsersModule';

@Module({
    imports: [
        DrivineModule.withOptions(<DrivineModuleOptions>{
            connectionProviders: [DatabaseRegistry.buildOrResolveFromEnv()]
        }),
        HealthModule,
        UsersModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
