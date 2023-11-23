import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { AwsCredentialIdentity } from '@aws-sdk/types';
import { Request, Response } from 'express';
import path from 'path';

const customCredentials: AwsCredentialIdentity = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
};

const s3Client = new S3Client({
  credentials: customCredentials,
  region: process.env.AWS_REGION,
});

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

const uploadToS3 = (file: Express.Multer.File) => {
  return new Promise<string>((resolve, reject) => {
    if (!file) {
      reject('Nenhum arquivo fornecido');
    }

    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;

    const params = {
      Bucket: 'api2023awsbucket',
      Key: 'UploadsApi/' + filename,
      Body: file.buffer,
      ACL: 'public-read',
    };

    s3Client.send(new PutObjectCommand(params))
      .then((data) => {
        resolve(`https://api2023awsbucket.s3.amazonaws.com/UploadsApi/${filename}`);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { upload, uploadToS3 };
