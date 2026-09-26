import { Controller, Get, Param, Render, NotFoundException } from '@nestjs/common';
import { AppService } from '../app.service';
import { CausesService } from './causes.service';

@Controller('causes')
export class CausesController {
  constructor(
    private readonly causesService: CausesService,
    private readonly appService: AppService,
  ) {}

  @Get()
  @Render('causes')
  list() {
    return {
      title: 'Our Causes | Glory Children Ministry',
      site: this.appService.getSiteInfo(),
      causes: this.causesService.findAll(),
    };
  }

  @Get(':slug')
  @Render('cause')
  detail(@Param('slug') slug: string) {
    const cause = this.causesService.findOne(slug);
    if (!cause) throw new NotFoundException('Cause not found');
    return {
      title: `${cause.title} | Glory Children Ministry`,
      site: this.appService.getSiteInfo(),
      causes: this.causesService.findAll(),
      cause,
    };
  }
}
