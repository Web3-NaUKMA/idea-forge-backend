import { Module } from '@nestjs/common';
import { SERVICES } from '../utils/constants/services.util';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Startup } from '../typeorm/models/Startup';
import { LLMService } from './services/llm.service';


@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: SERVICES.LLM,
            useClass: LLMService,
        },
    ],

    exports: [
        {
            provide: SERVICES.LLM,
            useClass: LLMService,
        },
    ],
})
export class LLMModule { }
