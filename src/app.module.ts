import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { FilesModule } from "./files/files.module";
import { UserEntity } from "./users/entities/user.entity";
import { FileEntity } from "./files/entities/file.entity";
import * as process from "process";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env.local",
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      entities: [UserEntity, FileEntity],
      synchronize: true,
      url: process.env.POSTGRES_URL,
      ssl: true,
    }),
    UsersModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
