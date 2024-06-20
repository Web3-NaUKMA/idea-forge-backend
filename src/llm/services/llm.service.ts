import { Inject, Injectable } from "@nestjs/common";
import { ICreateStartup } from "../../utils/DTO/startup.dto";
import { SERVICES } from "../../utils/constants/services.util";
import { InjectRepository } from "@nestjs/typeorm";
import { Startup } from "../../typeorm/models/Startup";
import { Repository } from "typeorm";
import { ILLMService } from "../interfaces/llm.interface";
import OpenAI from "openai";
import * as fs from 'fs';
import * as readline from 'readline';
import { LLMResponse } from "../../typeorm/models/Response";
import {ICreateResponse} from  "../../utils/DTO/response.dto";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

@Injectable()
export class LLMService implements ILLMService {
    private openai: OpenAI;

    constructor(
      @InjectRepository(LLMResponse) private readonly responseRepository: Repository<LLMResponse>,

    ) {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async prepareParagraphs(text: string) {
        const req = `Please summarize the following text, response should be a markdown file: ${text}`;

        const completion = await this.openai.chat.completions.create({
            messages: [{ role: "user", content: req }],
            model: "gpt-4",
        });

        return completion.choices[0].message.content;
    }

    async chatWithOpenAI(messages: any[]) {
        const response = await this.openai.chat.completions.create({
            model: 'gpt-4',
            messages,
            max_tokens: 500,
            temperature: 0.5,
        });
        return response.choices[0].message?.content?.trim();
    }

    async gatherAndConfirmInfo(userId: string, key: string, question: string, userData: any) {
        while (true) {
            const userInput = await new Promise<string>((resolve) => rl.question(`${question}\n> `, resolve));
            const messages = [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: question },
                { role: "assistant", content: "Please provide a detailed description. If you need help, I can generate a suggestion for you." }
            ];

            const generatedInput = userInput || await this.chatWithOpenAI(messages);
            const summaryMessages = [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: `Summarize the following response: ${generatedInput}` },
                { role: "assistant", content: "Please provide a concise summary of the user's response, ensuring clarity and completeness." }
            ];

            const summary = await this.chatWithOpenAI(summaryMessages);

            const resp: ICreateResponse = {
                stageId: 1,
                content: summary,
                prompt: 'dasjhdkja'
            }

            console.log(`Summary: ${summary}`);
            const confirm = await new Promise<string>((resolve) => rl.question("Do you approve this summary? (yes/no)\n> ", resolve));
            if (confirm.toLowerCase() === 'yes') {
                this.saveUserResponse(userId, key, summary, userData);
                break;
            } else {
                console.log("Let's try again.");
            }
        }



    }

    loadUserData(userId: string): any {
        try {
            const data = fs.readFileSync(`./${userId}_data.json`, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            return {};
        }
    }

    saveUserData(userId: string, data: any): void {
        fs.writeFileSync(`./${userId}_data.json`, JSON.stringify(data, null, 2));
    }

    saveUserResponse(userId: string, key: string, response: string, userData: any): void {
        if (!userData[userId]) {
            userData[userId] = {};
        }
        userData[userId][key] = response;
        this.saveUserData(userId, userData);
    }

    getUserResponse(userId: string, key: string, userData: any): string {
        return userData[userId]?.[key] || '';
    }

    async test() {
        const userId = await new Promise<string>((resolve) => rl.question("Enter your user ID: ", resolve));
        const userData = this.loadUserData(userId);

        const questions = {
            "idea": "Describe your idea in as much detail as possible.",
            "passions": "Why are you passionate about the product?",
            "complaints": "What complaints can you fix with your product?",
            "ego": "How will this product help you grow and project your expertise?"
        };

        for (const key in questions) {
            await this.gatherAndConfirmInfo(userId, key, questions[key], userData);
        }

        this.saveUserData(userId, userData);

        console.log(`All data saved for user ${userId}.`);
        rl.close();
    }
}










// import { Inject, Injectable } from "@nestjs/common";
// import { ICreateStartup } from "../../utils/DTO/startup.dto";
// import { SERVICES } from "../../utils/constants/services.util";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Startup } from "../../typeorm/models/Startup";
// import { Repository } from "typeorm";
// import { ILLMService } from "../interfaces/llm.interface";
// import OpenAI from "openai";
// // import { chatWithOpenAI } from '../../helpers';
// // import readline from 'readline';

// // const rl = readline.createInterface({
// //   input: process.stdin,
// //   output: process.stdout
// // });



// @Injectable()
// export class LLMService implements ILLMService {
//     constructor(
//     ) { }

//     async prepareParagraphs(text: string) {
//         const openai = new OpenAI({
//             apiKey: process.env.OPENAI_API_KEY
//         });

//         const req = `  `

//         const completion = await openai.chat.completions.create({
//             messages: [{ role: "user", content: req }],
//             model: "gpt-3.5-turbo",
//         });


//         return completion.choices[0].message.content;
//     }



//     test(){

//     }
// }
