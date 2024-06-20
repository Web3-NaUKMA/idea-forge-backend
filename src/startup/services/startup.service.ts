import { Inject, Injectable } from "@nestjs/common";
import { ICreateStartup, IUpdateStartup } from "../../utils/DTO/startup.dto";
import { SERVICES } from "../../utils/constants/services.util";
import { IStartupService } from "../interfaces/startup.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Startup } from "../../typeorm/models/Startup";
import { Repository } from "typeorm";
import { STAGES } from "../../utils/constants/stages.util";

@Injectable()
export class StartupService implements IStartupService {
    constructor(
        @InjectRepository(Startup) private readonly startupRepository: Repository<Startup>,
    ) { }


    getAllStartups() {
        return this.startupRepository.find();
    }

    getStartupById(id: string) {
        return this.startupRepository.findOne({ where: { id: id } });
    }

    createStartup(startup: ICreateStartup) {
        startup.dateCreated = new Date();
        startup.stage = STAGES.IDEA_DEVELOPMENT;
        return this.startupRepository.save(startup);
    }

    updateStartup(startup: IUpdateStartup) {
        return this.startupRepository.save(startup);
    }

}