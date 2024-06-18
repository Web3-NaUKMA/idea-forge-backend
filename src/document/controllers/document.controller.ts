import { Body, Controller, Inject, Post, Put } from "@nestjs/common";
import { SERVICES } from "../../utils/constants/services.util";
import { ROUTES } from "../../utils/constants/routes.util";
import { IDocumentService } from "../interfaces/document.interface";
import { ICreateStartup } from "../../utils/DTO/startup.dto";
import { ICreateDocument } from "../../utils/DTO/document.dto";


@Controller(ROUTES.DOCUMENT)
export class DocumentController {
    constructor(
        @Inject(SERVICES.DOCUMENT) private readonly documentService: IDocumentService,
    ) { }

    @Post()
    createDoc(@Body() doc: ICreateDocument) {
        return this.documentService.preprocess(doc.text);
    }

}