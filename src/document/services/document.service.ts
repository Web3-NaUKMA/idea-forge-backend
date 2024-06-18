import { Inject, Injectable } from "@nestjs/common";
import { ICreateStartup } from "../../utils/DTO/startup.dto";
import { SERVICES } from "../../utils/constants/services.util";
import { IDocumentService } from "../interfaces/document.interface";
import { OpenAI } from "openai";
import * as fs from 'fs';
import { ILLMService } from "../../llm/interfaces/llm.interface";
import { ICreateResponse } from "../../utils/DTO/response.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LLMResponse } from "../../typeorm/models/Response";

@Injectable()
export class DocumentService implements IDocumentService {
    constructor(
        @InjectRepository(LLMResponse) private readonly responseRepository: Repository<LLMResponse>,
        @Inject(SERVICES.LLM) private readonly llmService: ILLMService,
    ) { }
    preprocess(text: string) {
        // this.llmService.test();

        const resp: ICreateResponse = {
            stageId: 1,
            content: "huy",
            prompt: "huy"
        }

        this.responseRepository.save(resp);
        return this.llmService.prepareParagraphs(text);
    }

}