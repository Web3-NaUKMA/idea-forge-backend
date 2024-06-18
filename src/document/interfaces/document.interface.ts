import { ICreateStartup } from "../../utils/DTO/startup.dto";

export interface IDocumentService {

    preprocess(text: string);
}