import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@Body() body, @UploadedFile() file) {
    // 注意：必须在form的属性中配置enctype="multipart/form-data"
    console.log('文件: ', file);
    // 校验
    // TODO 校验文件是否存在、文件格式白名单、文件大小校验、文件名称校验（特殊字符过滤）
    // fieldname: 'pic',
    // originalname: 'phpStorm.png', 文件名特殊字符过滤
    // encoding: '7bit',
    // mimetype: 'image/png',        文件格式白名单校验
    // size: 10332                   文件大小校验
    // buffer: <Buffer 89 50 4e...   魔数校验

    // 将上传的图片放到某个文件夹， TODO 上传目录是否存在
    const writeStream = createWriteStream(
      join(__dirname, '../public', `${Date.now()}-${file.originalname}`),
    );
    const res = writeStream.write(file.buffer);
    if (res) {
      return '上传图片成功';
    } else {
      return '上传图片失败';
    }
  }
}
