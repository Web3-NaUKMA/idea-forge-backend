import { ICreateStartup, IUpdateStartup } from "../../utils/DTO/startup.dto";

export interface IStartupService {
    createStartup(startup: ICreateStartup);
    getStartupById(id: string);
    updateStartup(startup: IUpdateStartup);
    getAllStartups();
}