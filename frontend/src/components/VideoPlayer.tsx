// VideoPlayer.tsx
import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  return (
    <div className='player-wrapper'>
      <ReactPlayer
        url={url}
        className='react-player'
        playing
        controls
        width='100%'
        height='100%'
      />
    </div>
  );
};

export default VideoPlayer;
