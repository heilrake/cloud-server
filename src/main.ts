import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  app.enableCors({ credentials: true, origin: true });

  const config = new DocumentBuilder()
    .setTitle("cloud service")
    .setDescription("The cCloud API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  //http://localhost:7777/swagger
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document, {
    swaggerOptions: {
      persistAuthorizations: true,
    },
  });

  await app.listen(process.env.PORT_DEV, () => {
    console.log(`App listening ${process.env.PORT_DEV} port `);
  });
}
bootstrap();
