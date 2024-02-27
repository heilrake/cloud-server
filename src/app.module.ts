import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { FilesModule } from "./files/files.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./users/entities/user.entity";
import { FileEntity } from "./files/entities/file.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      entities: [UserEntity, FileEntity],
      synchronize: true,
      url: "postgres://default:wampPIUqd6l1@ep-yellow-cherry-a4x08hbk-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
      ssl: true,
    }),
    UsersModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
