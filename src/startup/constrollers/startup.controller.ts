import { Body, Controller, Inject, Post, Put } from "@nestjs/common";
import { ROUTES, SERVICES } from "../../utils/constants.util";
import { IStartupService } from "../interfaces/startup.interface";
import { ICreateStartup } from "../../utils/DTO/startup.dto";


@Controller(ROUTES.STARTUP)
export class StartupController {
    constructor(
        @Inject(SERVICES.STARTUP) private readonly startupService: IStartupService,
    ) { }

    @Post('startup')
    createStartup(@Body() startup: ICreateStartup) {
        return this.startupService.createStartup(startup);
    }

}