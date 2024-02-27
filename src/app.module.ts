import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { FilesModule } from "./files/files.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./users/entities/user.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "ep-yellow-cherry-a4x08hbk-pooler.us-east-1.aws.neon.tech",
      port: Number(process.env.DB_PORT) || 5432,
      username: "default",
      password: "wampPIUqd6l1",
      database: "verceldb",
      entities: [UserEntity],
      synchronize: true,
    }),
    UsersModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
