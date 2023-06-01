import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { format } from 'date-fns';
import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      accessKeyId: process.env.DIGITAL_OCEAN_ACCESS_KEY,
      secretAccessKey: process.env.DIGITAL_OCEAN_SECRET_ACCESS_KEY,
    });
  }

  public async saveFile(file: string, folder?: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = 'image';

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    file = `${format(new Date(), 'yyyy-MM-ddmmss')}${file}`;
    console.log({ file });
    if (folder) {
      file = `${folder}/${file}`;
    }
    console.log({ Bucket: uploadConfig.config.aws.bucket });
    try {
      await this.client
        .putObject({
          Bucket: uploadConfig.config.aws.bucket,
          Key: file,
          ACL: 'public-read',
          Body: fileContent,
          ContentType,
        })
        .promise();
    } catch (err) {
      console.log({ err });
      throw new AppError('Erro ao realizar upload');
    }

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    console.log({ Bucket: uploadConfig.config.aws.bucket, Key: file });
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
