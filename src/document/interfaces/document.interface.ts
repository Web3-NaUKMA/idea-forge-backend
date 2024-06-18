import { ICreateStartup } from "../../utils/DTO/startup.dto";

export interface IDocumentService {
    prepareParagraphs(text: string);
}