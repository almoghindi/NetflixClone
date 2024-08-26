import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const bucketName = 'netflixclonee';
const directoryPath = 'C:\\Users\\David\\Desktop\\Programming\\Diamond\\Netflix-Clone\\NetflixClone\\streamer\\src\\videos\\The_Last_Breath';

// Function to upload a file to S3
const uploadFile = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath);
  const key = `The_Last_Breath/${path.basename(filePath)}`; // S3 key for the file

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileContent,
    ContentType: getContentTypeByExtension(path.extname(filePath)),
  };

  return s3.upload(params).promise();
};

// Function to determine the content type based on file extension
const getContentTypeByExtension = (extension: string): string => {
  switch (extension) {
    case '.m3u8':
      return 'application/vnd.apple.mpegurl';
    case '.ts':
      return 'video/MP2T';
    default:
      return 'application/octet-stream';
  }
};

// Upload all files in the directory
fs.readdir(directoryPath, (err: NodeJS.ErrnoException | null, files: string[]) => {
  if (err) throw err;

  const uploadPromises = files.map((file: string) =>
    uploadFile(path.join(directoryPath, file))
  );

  Promise.all(uploadPromises)
    .then(() => console.log('All files uploaded successfully.'))
    .catch((error) => console.error('Error uploading files:', error));
});
