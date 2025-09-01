import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class DeleteFileProvider {
  constructor(private readonly configService: ConfigService) {}

  async deleteFile(path: string) {
    try {
      const s3 = new S3();
      await s3
        .deleteObject({
          Bucket: this.configService.get('appConfig.awsBucketName') ?? '',
          Key: path,
        })
        .promise();
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }
}
