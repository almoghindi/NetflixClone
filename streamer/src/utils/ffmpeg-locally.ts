// import ffmpeg from "fluent-ffmpeg";
// import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
// import path from "path";
// import fs from "fs";

// ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// // Correct paths
// const inputFilePath = path.join(__dirname, `../../src/videos/lastbreate.mp4`);
// const outputDir = path.join(__dirname, `../../src/videos/The_Last_Breath`);
// const outputFilePath = path.join(outputDir, 'output.m3u8');

// // Ensure the output directory exists
// if (!fs.existsSync(outputDir)) {
//   fs.mkdirSync(outputDir, { recursive: true });
// }

// // ffmpeg processing
// ffmpeg(inputFilePath, { timeout: 432000 })
//   .addOptions([
//     '-profile:v baseline',
//     '-level 3.0',
//     '-start_number 0',
//     '-hls_time 10',
//     '-hls_list_size 0',
//     '-f hls',
//   ])
//   .output(outputFilePath)
//   .on('end', () => {
//     console.log('HLS conversion completed successfully.');
//   })
//   .on('error', (err) => {
//     console.error('Error during HLS conversion:', err);
//   })
//   .run();


  //Locally 480p
  import ffmpeg from "fluent-ffmpeg";
  import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
  import path from "path";
  import fs from "fs";
  
  ffmpeg.setFfmpegPath(ffmpegInstaller.path);
  
  // Correct paths
  const inputFilePath = path.join(__dirname, `../../src/videos/lastbreate.mp4`);
  const outputDir = path.join(__dirname, `../../src/videos/The_Last_Breath/480p`);
  const outputFilePath = path.join(outputDir, 'output_480p.m3u8');
  
  // Ensure the output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // ffmpeg processing for 480p
  ffmpeg(inputFilePath, { timeout: 432000 })
    .videoCodec('libx264')
    .audioCodec('aac')
    .size('854x480')
    .addOptions([
      '-preset veryfast',
      '-profile:v baseline',
      '-level 3.0',
      '-start_number 0',
      '-hls_time 10',
      '-hls_list_size 0',
      '-hls_segment_filename', path.join(outputDir, 'segment_%03d.ts'),
      '-f hls'
    ])
    .output(outputFilePath)
    .on('end', () => {
      console.log('480p HLS conversion completed successfully.');
    })
    .on('error', (err) => {
      console.error('Error during 480p HLS conversion:', err);
    })
    .run();
  