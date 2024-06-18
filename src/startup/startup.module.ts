import { Module } from '@nestjs/common';
import { SERVICES } from '../utils/constants.util';
import { StartupService } from './services/startup.service';
import { StartupController } from './constrollers/startup.controller';


@Module({
    imports: [],
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
