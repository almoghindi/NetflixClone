import React, { useState } from 'react';
import axios from 'axios';

const VideoProcessor: React.FC = () => {
  const [movieName, setMovieName] = useState('');
  const [processStatus, setProcessStatus] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleProcessVideo = async () => {
    try {
      setProcessStatus('Processing...');
      await axios.post('http://localhost:3000/api/video/process', { movieName });
      setProcessStatus('Processed successfully');
      setVideoUrl(`http://localhost:3000/api/video/stream/${movieName}`);
    } catch (error) {
      setProcessStatus('Error processing video');
      console.error('Error:', error);
    }
  };

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
        <video controls>
          <source src={videoUrl} type="application/x-mpegURL" />
        </video>
      )}
    </div>
  );
};

export default VideoProcessor;