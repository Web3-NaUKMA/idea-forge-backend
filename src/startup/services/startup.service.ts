import { Inject, Injectable } from "@nestjs/common";
import { ICreateStartup } from "../../utils/DTO/startup.dto";
import { SERVICES } from "../../utils/constants/services.util";
import { IStartupService } from "../interfaces/startup.interface";


@Injectable()
export class StartupService implements IStartupService {
    constructor(
    ) { }
    createStartup(startup: ICreateStartup) {
        console.log(startup)

    }

}