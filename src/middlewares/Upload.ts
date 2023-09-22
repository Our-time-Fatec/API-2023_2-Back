import multer from 'multer';
import AWS from 'aws-sdk';
import path from 'path';

const diretorio = process.env.FOLDERPHOTOS || '';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

const uploadToS3 = (file: Express.Multer.File) => {
  return new Promise<string>((resolve, reject) => {
    if (!file) {
      reject('Nenhum arquivo fornecido');
    }

    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;

    const params = {
      Bucket: 'api2023awsbucket',
      Key: filename,
      Body: file.buffer,
      ACL: 'public-read',
    };

    s3.upload(params, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location); 
      }
    });
  });
};

export { upload, uploadToS3 };
