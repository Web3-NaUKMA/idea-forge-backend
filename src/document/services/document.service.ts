import { Inject, Injectable } from "@nestjs/common";
import { ICreateStartup } from "../../utils/DTO/startup.dto";
import { SERVICES } from "../../utils/constants/services.util";
import { IDocumentService } from "../interfaces/document.interface";
import { OpenAI } from "openai";
import * as fs from 'fs';
import { ILLMService } from "../../llm/interfaces/llm.interface";

@Injectable()
export class DocumentService implements IDocumentService {
    constructor(
        @Inject(SERVICES.LLM) private readonly llmService: ILLMService,
    ) { }
    preprocess(text: string) {
        return this.llmService.prepareParagraphs(text);
    }

}