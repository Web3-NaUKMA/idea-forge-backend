import { Module } from '@nestjs/common';
import { SERVICES } from '../utils/constants/services.util';
import { StartupService } from './services/startup.service';
import { StartupController } from './controllers/startup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Startup } from '../typeorm/models/Startup';


@Module({
    imports: [TypeOrmModule.forFeature([Startup])],
    controllers: [StartupController],
    providers: [
        {
            provide: SERVICES.STARTUP,
            useClass: StartupService,
        },
    ],

    exports: [
        {
            provide: SERVICES.STARTUP,
            useClass: StartupService,
        },
    ],
})
export class StartupModule { }
