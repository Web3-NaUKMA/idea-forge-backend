import { Inject, Injectable } from "@nestjs/common";
import { ICreateStartup } from "../../utils/DTO/startup.dto";
import { SERVICES } from "../../utils/constants/services.util";
import { IDocumentService } from "../interfaces/document.interface";
import { OpenAI } from "openai";
import * as fs from 'fs';

@Injectable()
export class DocumentService implements IDocumentService {
    constructor(
    ) { }

    async prepareParagraphs(text: string) {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const req = `split this markdown by logical blocks, with content inside, 
                     and return it using xml, where tag is <block id="{id}">{block content}</block>
                     markdown is below, return clear xml string ${text}`;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: req }],
            model: "gpt-3.5-turbo",
        });

        // const xml: string = fs.readFileSync('./ex.xml', 'utf8');

        const response = completion.choices[0].message.content;
        console.log(response)

    }

}