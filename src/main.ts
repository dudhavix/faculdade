import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { join } from "path";
import * as express from "express";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(express.static(join("public")));
    app.enableCors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
    })

    await app.listen(process.env.PORT);
}
bootstrap();
