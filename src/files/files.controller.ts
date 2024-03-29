import { Controller, Post, Body, UseInterceptors, UploadedFile } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

import { FilesService } from "./files.service";
import { CreateFileDto } from "./dto/create-file.dto";
import { fileStorage } from "./storage";

@Controller("files")
@ApiTags("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: fileStorage,
    }),
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  create(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
