import { Body, Controller, Inject, Post, Put } from "@nestjs/common";
import { SERVICES } from "../../utils/constants/services.util";
import { ROUTES } from "../../utils/constants/routes.util";
import { IDocumentService } from "../interfaces/document.interface";
import { ICreateStartup } from "../../utils/DTO/startup.dto";
import { ICreateDocument, ISummarizeRequest } from "../../utils/DTO/document.dto";
import { LLMService } from "../../llm/services/llm.service";
import { ILLMService } from "../../llm/interfaces/llm.interface";
import { IStartupService } from "../../startup/interfaces/startup.interface";


@Controller(ROUTES.DOCUMENT)
export class DocumentController {
    constructor(
        @Inject(SERVICES.DOCUMENT) private readonly documentService: IDocumentService,
        @Inject(SERVICES.LLM) private readonly llmService: ILLMService,
        @Inject(SERVICES.STARTUP) private readonly startupService: IStartupService,
     ) { }

    @Post()
    createDoc(@Body() doc: ICreateDocument) {
        return this.documentService.preprocess(doc.text);
    }

    @Post("summarize")
    summarize(@Body() data: ISummarizeRequest) {
        const startup = this.startupService.getStartupById(data.startupId)
        const promptText =
          `${startup.description}\n` +
          `${data.passionQuestion}\n` +
          `${data.complaintsQuestion}`

        return this.llmService.prepareParagraphs(promptText)
    }
}
