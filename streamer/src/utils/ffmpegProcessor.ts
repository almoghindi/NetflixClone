import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import AWS from 'aws-sdk';
import { Readable } from 'stream';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

export async function processVideoFromS3(bucketName: string, movieName: string): Promise<void> {
  try {

    const s3Stream = s3.getObject({
      Bucket: bucketName,
      Key: `${movieName}.mp4`
    }).createReadStream();

    const outputDir = path.join(__dirname, `../../src/videos/${movieName}`);

    await new Promise((resolve, reject) => {
      ffmpeg(s3Stream as Readable, { timeout: 432000 })
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
          })
          .on('error', (err) => {
            console.error('Error during HLS conversion:', err);
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