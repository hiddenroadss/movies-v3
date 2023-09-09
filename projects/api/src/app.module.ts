import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MovieModule } from './movie/movie.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MovieModule,
    ConfigModule.forRoot({
      isGlobal: true, // Set this to true to make the ConfigService accessible everywhere
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
