import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MovieModule } from './movie/movie.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MovieModule,
    ConfigModule.forRoot({
      isGlobal: true, // Set this to true to make the ConfigService accessible everywhere
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'uploads/posters'),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
