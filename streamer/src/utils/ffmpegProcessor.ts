import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import AWS from 'aws-sdk';
import { Readable } from 'stream';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const bufferToStream = (buffer: Buffer): Readable => {
  const readable = new Readable();
  readable._read = () => {}; // No-op
  readable.push(buffer);
  readable.push(null); // Signal the end of the stream
  return readable;
};

export async function processVideoFromS3(
  bucketName: string,
  movieName: string
): Promise<void> {
  try {
    const s3Stream = s3
      .getObject({
        Bucket: bucketName,
        Key: `${movieName}.mp4`,
      })
      .createReadStream();

    const bufferedStream = await streamToBuffer(s3Stream); // Buffer the stream
    const videoStream = bufferToStream(bufferedStream); // Convert buffer to a readable stream

    const outputDir = path.join(__dirname, `../../src/videos/${movieName}`);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    await new Promise((resolve, reject) => {
      ffmpeg(videoStream)
        .addOptions([
          '-profile:v baseline',
          '-level 3.0',
          '-start_number 0',
          '-hls_time 10',
          '-hls_list_size 0',
          '-f hls',
        ])
        .output(`${outputDir}/output.m3u8`)
        .on('end', () => {
          console.log('HLS conversion completed successfully.');
          resolve(null);
        })
        .on('error', (err) => {
          console.error('Error during HLS conversion:', err);
          reject(err);
        })
        .on('stderr', (stderrLine) => {
          console.log('Stderr output:', stderrLine);
        })
        .run();
    });
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}

const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', (err) => reject(err));
  });
};
