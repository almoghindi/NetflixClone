import React, { useState, useEffect, useRef } from 'react';
import Hls, { Level } from 'hls.js';

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [availableQualities, setAvailableQualities] = useState<Level[]>([]);
  const [, setSelectedQuality] = useState<number | null>(null);
  const [showQualityOptions, setShowQualityOptions] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTimeDisplay, setShowTimeDisplay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (Hls.isSupported()) {
      hlsRef.current = new Hls();
      const hls = hlsRef.current;
      const video = videoRef.current;
      
      const s3M3u8Url = import.meta.env.VITE_LAST_BREATH_URL;

      if (video) {
        hls.loadSource(s3M3u8Url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const levels = hls.levels;
          setAvailableQualities(levels);
          if (levels.length > 0) {
            setSelectedQuality(hls.currentLevel);
          }
        });

        hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
          setSelectedQuality(data.level);
        });
      }

      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };

      document.addEventListener('fullscreenchange', handleFullscreenChange);

      return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        hls.destroy();
      };
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setShowTimeDisplay(true);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  };

  const handleQualityChange = (levelIndex: number) => {
    setSelectedQuality(levelIndex);
    if (hlsRef.current) {
      hlsRef.current.currentLevel = levelIndex;
    }
    setShowQualityOptions(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && videoRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      const newTime = clickPosition * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeHover = () => {
    setShowVolumeSlider(true);
    setTimeout(() => setShowVolumeSlider(false), 2000);
  };

  const handleQualityHover = () => {
    setShowQualityOptions(true);
    setTimeout(() => setShowQualityOptions(false), 2000);
  };

  return (
    <div className="relative w-full h-auto aspect-video">
      <video
        ref={videoRef}
        className="w-full h-full bg-black"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
      ></video>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
        <div 
          ref={progressBarRef}
          className="w-full bg-gray-600 h-1 rounded-full cursor-pointer"
          onClick={handleProgressBarClick}
        >
          <div 
            className="bg-red-600 h-1 rounded-full" 
            style={{width: `${(currentTime / duration) * 100}%`}}
          ></div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4 mt-2 mb-1">
          <button onClick={togglePlay} className="focus:outline-none">
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="white" viewBox="0 0 24 24">
              {isPlaying ? (
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              ) : (
                <path d="M8 5v14l11-7z"/>
              )}
            </svg>
          </button>
          <div className={`text-white text-xs sm:text-sm transition-opacity duration-500 ${showTimeDisplay ? 'opacity-100' : 'opacity-0'}`}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          {!isMobile && (
            <>
              <div className="relative" onMouseEnter={handleVolumeHover}>
                <button className="focus:outline-none">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="white" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                </button>
                {showVolumeSlider && (
                  <div className="absolute bottom-full left-0 mb-2 bg-black rounded p-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-24"
                    />
                    <span className="text-white text-xs ml-2">{volume}%</span>
                  </div>
                )}
              </div>
              <div className="relative" onMouseEnter={handleQualityHover}>
                <button className="focus:outline-none">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="white" viewBox="0 0 24 24">
                    <path d="M19.5 12c0-1.1-.9-2-2-2H4v4h13.5c1.1 0 2-.9 2-2zm-18-4h16v8H1.5V8zm20.5 4c0 1.1-.9 2-2 2h-1v-4h1c1.1 0 2 .9 2 2z"/>
                  </svg>
                </button>
                {showQualityOptions && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black rounded p-2">
                    {availableQualities.map((level, index) => (
                      <button
                        key={index}
                        className="block text-white hover:bg-gray-700 px-2 py-1 text-xs"
                        onClick={() => handleQualityChange(index)}
                      >
                        {level.height}p
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
          <span className="text-white text-xs sm:text-sm flex-grow truncate">The Last Breath</span>
          <button onClick={toggleFullscreen} className="focus:outline-none">
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="white" viewBox="0 0 24 24">
              {isFullscreen ? (
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
              ) : (
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3z"/>
              )}
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;