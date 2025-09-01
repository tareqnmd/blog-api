import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  awsBucketName: process.env.AWS_BUCKET_NAME,
  awsRegion: process.env.AWS_REGION,
  awsCloudfrontUrl: process.env.AWS_CLOUDFRONT_URL,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
}));
