import { Module } from '@nestjs/common';
import { AppModule } from '../app.module';
import { CausesController } from './causes.controller';
import { CausesService } from './causes.service';

@Module({
  imports: [AppModule],
  controllers: [CausesController],
  providers: [CausesService],
  exports: [CausesService],
})
export class CausesModule {}
