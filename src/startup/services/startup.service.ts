import { Inject, Injectable } from "@nestjs/common";
import { ICreateStartup } from "../../utils/DTO/startup.dto";
import { SERVICES } from "../../utils/constants/services.util";
import { IStartupService } from "../interfaces/startup.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Startup } from "../../typeorm/models/Startup";
import { Repository } from "typeorm";


@Injectable()
export class StartupService implements IStartupService {
    constructor(
        @InjectRepository(Startup) private readonly startupRepository: Repository<Startup>,
    ) { }
    getStartup(id: number) {
        throw new Error("Method not implemented.");
    }
    createStartup(startup: ICreateStartup) {
        return this.startupRepository.save(startup);
    }

}