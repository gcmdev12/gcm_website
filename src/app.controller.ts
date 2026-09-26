import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { CausesService } from './causes/causes.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly causesService: CausesService,
  ) {}

  @Get()
  @Render('home')
  home() {
    return {
      title: 'Glory Children Ministry | Hope, Education & Opportunity',
      site: this.appService.getSiteInfo(),
      causes: this.causesService.findAll(),
    };
  }
}
