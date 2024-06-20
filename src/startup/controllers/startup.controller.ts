import { Body, Controller, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { SERVICES } from "../../utils/constants/services.util";
import { ROUTES } from "../../utils/constants/routes.util";

import { IStartupService } from "../interfaces/startup.interface";
import { ICreateStartup, IUpdateStartup } from "../../utils/DTO/startup.dto";


@Controller(ROUTES.STARTUP)
export class StartupController {
    constructor(
        @Inject(SERVICES.STARTUP) private readonly startupService: IStartupService,
    ) { }

    @Get(':id')
    getStartupById(@Param('id') id: string) {
        return this.startupService.getStartupById(id);
    }

    @Get()
    getAllStartups() {
        return this.startupService.getAllStartups();
    }

    @Post()
    createStartup(@Body() startup: ICreateStartup) {
        return this.startupService.createStartup(startup);
    }

    @Post(':id')
    updateStartup(@Body() startup: IUpdateStartup, @Param('id') id: string) {
        startup.id = id;
        return this.startupService.updateStartup(startup);
    }
}