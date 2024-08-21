import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Hls from 'hls.js';

const VideoProcessor: React.FC = () => {
  const [movieName, setMovieName] = useState('');
  const [processStatus, setProcessStatus] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleProcessVideo = async () => {
    try {
      setProcessStatus('Processing...');

      // Start processing the video
      await axios.post('http://localhost:3000/api/video/process', {movieName});
      setProcessStatus('Processed successfully');

      // Get the processed video URL for streaming
      const response = await axios.get(`http://localhost:3000/api/video/stream/${movieName}`);
      
      // Ensure response.data is a string representing the URL
      console.log(response.config.url);
      setVideoUrl(`http://localhost:3000/videos/${movieName}/output.m3u8`);  // Assuming the backend returns a plain URL string
    } catch (error) {
      setProcessStatus('Error processing video');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (videoUrl && videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play();
        });
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = videoUrl;
        videoRef.current.addEventListener('loadedmetadata', () => {
          videoRef.current?.play();
        });
      }
    }
  }, [videoUrl]);

  return (
    <div>
      <input 
        type="text" 
        value={movieName} 
        onChange={(e) => setMovieName(e.target.value)} 
        placeholder="Enter movie name"
      />
      <button onClick={handleProcessVideo}>Process Video</button>
      <p>{processStatus}</p>
      {videoUrl && (
        <video ref={videoRef} width="500" height="500" controls />
      )}
    </div>
  );
};

export default VideoProcessor;
