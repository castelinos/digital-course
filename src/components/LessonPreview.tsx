// VideoPlayer.tsx
import React from 'react';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  return (
    <div className='previewLessonContainer'>
        <h1>{url}</h1>
    </div>
  );
};

export default VideoPlayer;
