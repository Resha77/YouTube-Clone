import React, { useState, useEffect } from 'react';

function VideoPreview() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/videos')
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return (
    <div className="video-container">
      {videos.map((video) => (
        <div key={video.id} className="video-card">
          <img src={video.thumbnail} alt={video.title} className="thumbnail" />
          <div className="video-details">
            <img src={video.channelAvatar} alt={video.channelName} className="avatar" />
            <div>
              <h4>{video.title}</h4>
              <p>{video.channelName}</p>
              <span>{video.views} • {video.uploadtedAt}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideoPreview;