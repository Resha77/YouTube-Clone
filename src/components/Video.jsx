import { useRef, useState } from 'react';

export default function Video({ video }) {
    // The MP4 and MP3 are separate files, so the audio must follow the video controls.
    const audioRef = useRef(null);
    // likes tracks the current number of likes shown on the video.
    const [likes, setLikes] = useState(video?.likes || 0);

    // isLiked tells us whether the current user has already liked this video.
    const [isLiked, setIsLiked] = useState(false);

    // Toggle the like status and update the like count accordingly.
    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes(prev => isLiked ? prev - 1 : prev + 1);
    };

    const videoSource = video?.videoUrl || video?.video_url || video?.url || '/subscriptions/Video.mp4';
    const audioSource = video?.audioUrl || video?.audio_url || video?.audio || '/subscriptions/Audio.mp3';

    // If no video information is passed in, show a simple fallback message.
    if (!video) return <div style={styles.notFound}>No video selected</div>;

    return (
        <div style={styles.container}>
            {/* The actual video player. It uses the video's URL and poster image. */}
            <div style={styles.videoWrapper}>
                <video
                    poster={video.thumbnail}
                    controls
                    style={styles.videoPlayer}
                    // Start and stop the separate audio track with the video.
                    onPlay={() => {
                        audioRef.current?.play().catch((error) => {
                            console.error('Audio playback error:', error);
                        });
                    }}
                    onPause={() => audioRef.current?.pause()}
                    // Keep both tracks at the same position after the user seeks.
                    onSeeked={(event) => {
                        if (audioRef.current) {
                            audioRef.current.currentTime = event.currentTarget.currentTime;
                        }
                    }}
                    // Reset the audio so replay starts from the beginning.
                    onEnded={() => {
                        if (audioRef.current) {
                            audioRef.current.pause();
                            audioRef.current.currentTime = 0;
                        }
                    }}
                >
                    {videoSource && <source src={videoSource} type="video/mp4" />}
                    Your browser does not support HTML video.
                </video>
                <audio ref={audioRef} preload="auto">
                    {audioSource && <source src={audioSource} type="audio/mpeg" />}
                </audio>
            </div>

            {/* Title and metadata section for the video. */}
            <h1 style={styles.title}>{video.title}</h1>

            <div style={styles.metaRow}>
                {/* Channel row: avatar, name, subscriber count, and subscribe button. */}
                <div style={styles.channelInfo}>
                    <img 
                        src={video.channelAvatar} 
                        alt={video.channelName} 
                        style={styles.avatar} 
                    />
                    <div>
                        <h3 style={styles.channelName}>{video.channelName || 'Channel Name'}</h3>
                        <span style={styles.subCount}>{video.subscribers || '100K'} subscribers</span>
                    </div>
                    <button style={styles.subscribeBtn}>Subscribe</button>
                </div>

                {/* Action buttons like, share, and save. */}
                <div style={styles.actionsGroup}>
                    <button onClick={handleLike} style={{ ...styles.actionBtn, backgroundColor: isLiked ? '#3ea6ff' : '#272727', color: isLiked ? '#0f0f0f' : '#ffffff' }}>
                        👍 {likes}
                    </button>
                    <button style={styles.actionBtn}>
                        ↪ Share
                    </button>
                    <button style={styles.actionBtn}>
                        💾 Save
                    </button>
                </div>
            </div>

            {/* Description box that shows stats and the full video summary. */}
            <div style={styles.descriptionBox}>
                <div style={styles.stats}>
                    <span>{video.views || '0'} views</span>
                    <span>•</span>
                    <span>{video.uploadedAt || 'Recently'}</span>
                </div>
                <p style={styles.descriptionText}>
                    {video.description || 'No description available for this video.'}
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '16px',
        color: '#ffffff',
        boxSizing: 'border-box',
        cursor: 'default',
    },
    videoWrapper: {
        width: '100%',
        backgroundColor: '#000000',
        borderRadius: '12px',
        overflow: 'hidden',
        aspectRatio: '16/9',
    },
    videoPlayer: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        margin: '16px 0',
        padding: '16px 0',
        width: '100%',
        textAlign: 'left',
    },
    metaRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '16px',
    },
    channelInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    channelName: {
        fontSize: '16px',
        fontWeight: 'bold',
        margin: 0,
    },
    subCount: {
        fontSize: '12px',
        color: '#aaa',
    },
    subscribeBtn: {
        backgroundColor: '#ffffff',
        color: '#0f0f0f',
        border: 'none',
        borderRadius: '18px',
        padding: '10px 16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginLeft: '12px',
    },
    actionsGroup: {
        display: 'flex',
        gap: '8px',
    },
    actionBtn: {
        backgroundColor: '#272727',
        color: '#ffffff',
        border: 'none',
        borderRadius: '18px',
        padding: '8px 16px',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    },
    descriptionBox: {
        backgroundColor: '#272727',
        borderRadius: '12px',
        padding: '12px 16px',
        fontSize: '14px',
        lineHeight: '1.5',
    },
    stats: {
        display: 'flex',
        gap: '8px',
        fontWeight: 'bold',
        marginBottom: '8px',
    },
    descriptionText: {
        margin: 0,
        whiteSpace: 'pre-line',
    },
    notFound: {
        color: '#fff',
        padding: '20px',
        textAlign: 'center',
    },
};