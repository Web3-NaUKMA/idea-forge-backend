import { ICreateStartup } from "../../utils/DTO/startup.dto";

export interface IStartupService {
    createStartup(startup: ICreateStartup);
    getStartup(id: number);
}