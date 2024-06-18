import { Module } from '@nestjs/common';
import { SERVICES } from '../utils/constants/services.util';
import { DocumentService } from './services/document.service';
import { DocumentController } from './controllers/document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Startup } from '../typeorm/models/Startup';
import { LLMModule } from '../llm/llm.module';


@Module({
    imports: [LLMModule],
    controllers: [DocumentController],
    providers: [
        {
            provide: SERVICES.DOCUMENT,
            useClass: DocumentService,
        },
    ],

    exports: [
        {
            provide: SERVICES.DOCUMENT,
            useClass: DocumentService,
        },
    ],
})
export class DocumentModule { }
