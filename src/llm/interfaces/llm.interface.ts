export interface ILLMService {
    prepareParagraphs(text: string);
    preprocessText(userInput: string);
    test();
}
