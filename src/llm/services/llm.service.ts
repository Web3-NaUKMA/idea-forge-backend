import { Inject, Injectable } from "@nestjs/common";
import { ICreateStartup } from "../../utils/DTO/startup.dto";
import { SERVICES } from "../../utils/constants/services.util";
import { InjectRepository } from "@nestjs/typeorm";
import { Startup } from "../../typeorm/models/Startup";
import { Repository } from "typeorm";
import { ILLMService } from "../interfaces/llm.interface";
import OpenAI from "openai";


@Injectable()
export class LLMService implements ILLMService {
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


        return completion.choices[0].message.content;
    }
}