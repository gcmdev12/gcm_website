import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from '../app.service';
import { CausesService } from '../causes/causes.service';

interface ContactForm {
  name?: string;
  email?: string;
  message?: string;
}

@Controller('contact')
export class ContactController {
  constructor(
    private readonly appService: AppService,
    private readonly causesService: CausesService,
  ) {}

  @Get()
  @Render('contact')
  page() {
    return {
      title: 'Contact Us | Glory Children Ministry',
      site: this.appService.getSiteInfo(),
      causes: this.causesService.findAll(),
    };
  }

  @Post()
  @Render('contact')
  submit(@Body() body: ContactForm) {
    return {
      title: 'Contact Us | Glory Children Ministry',
      site: this.appService.getSiteInfo(),
      causes: this.causesService.findAll(),
      submitted: true,
      form: body,
    };
  }
}
