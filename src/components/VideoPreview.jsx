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
        <div style={styles.container}>
            {videos.map((video) => (
                <div key={video.id} style={styles.card}>
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        style={styles.thumbnail}
                    />
                    <div style={styles.details}>
                        <img
                            src={video.channelAvatar}
                            alt={video.channelName}
                            style={styles.avatar}
                        />
                        <div style={styles.textContainer}>
                            <h4 style={styles.title}>
                                {(video.title.length > 50) ? `${video.title.substring(0, 50)}...` : video.title}
                            </h4>
                            <p style={styles.channel}>{video.channelName}</p>
                            <span style={styles.meta}>
                                {video.views} • {video.uploadedAt}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        rowGap: '80px',
        columnGap: '16px',
        margin: '32px 16px',
    },
    card: {
        color: '#ffffff',
    },
    thumbnail: {
        width: '100%',
        aspectRatio: '16 / 9',
        marginBottom: '12px',
        borderRadius: '10px',
        objectFit: 'cover',
    },
    details: {
        display: 'flex',
        gap: '12px',
    },
    avatar: {
        flex: '0 0 40px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlign: 'left',
    },
    title: {
        fontSize: '16px',
        margin: 0,
        padding: 0,
    },
    channel: {
        fontSize: '14px',
        marginTop: '4px',
        marginBottom: 0,
    },
    meta: {
        fontSize: '14px',
        color: '#aaaaaa',
    },
};

export default VideoPreview;