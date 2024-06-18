import { Body, Controller, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { SERVICES } from "../../utils/constants/services.util";
import { ROUTES } from "../../utils/constants/routes.util";

import { IStartupService } from "../interfaces/startup.interface";
import { ICreateStartup } from "../../utils/DTO/startup.dto";


@Controller(ROUTES.STARTUP)
export class StartupController {
    constructor(
        @Inject(SERVICES.STARTUP) private readonly startupService: IStartupService,
    ) { }

    @Post()
    createStartup(@Body() startup: ICreateStartup) {
        return this.startupService.createStartup(startup);
    }

    @Get(':id')
    getStartup(@Param('id') id: number) {
        return this.startupService.getStartup(id);
    }

}