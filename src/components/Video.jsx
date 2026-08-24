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
                    <button onClick={handleLike} 
                    style={{ ...styles.actionBtn, backgroundColor: isLiked ? '#3ea6ff' : '#272727', color: isLiked ? '#0f0f0f' : '#ffffff' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 640 640"
                        style={{ width: '16px', height: '16px', fill: 'currentColor' }}>
                        <path d="M235.5 102.8C256.3 68 300.5 54 338 71.6L345.2 75.4C380 96.3 394 140.5 376.4 178L376.4 178L362.3 208L472 208L479.4 208.4C515.7 212.1 544 242.8 544 280C544 293.2 540.4 305.4 534.2 316C540.3 326.6 543.9 338.8 544 352C544 370.3 537.1 386.8 526 399.5C527.3 404.8 528 410.3 528 416C528 441.1 515.1 463 495.8 475.9C493.9 511.4 466.4 540.1 431.4 543.6L424 544L319.9 544C301.9 544 284 540.6 267.3 534.1L260.2 531.1L259.5 530.8L252.9 527.6L252.2 527.3L240 520.8C227.7 514.3 216.7 506.1 207.1 496.7C203 523.6 179.8 544.1 151.8 544.1L119.8 544.1C88.9 544.1 63.8 519 63.8 488.1L64 264C64 233.1 89.1 208 120 208L152 208C162.8 208 172.9 211.1 181.5 216.5L231.6 110L232.2 108.8L234.9 103.8L235.5 102.9zM120 256C115.6 256 112 259.6 112 264L112 488C112 492.4 115.6 496 120 496L152 496C156.4 496 160 492.4 160 488L160 264C160 259.6 156.4 256 152 256L120 256zM317.6 115C302.8 108.1 285.3 113.4 276.9 127L274.7 131L217.9 251.9C214.4 259.4 212.4 267.4 211.9 275.6L211.8 279.8L211.8 392.7L212 400.6C214.4 433.3 233.4 462.7 262.7 478.3L274.2 484.4L280.5 487.5C292.9 493.1 306.3 496 319.9 496L424 496L426.4 495.9C438.5 494.7 448 484.4 448 472L447.8 469.4C447.7 468.5 447.6 467.7 447.4 466.8C444.7 454.7 451.7 442.6 463.4 438.8C473.1 435.7 480 426.6 480 416C480 411.7 478.9 407.8 476.9 404.2C470.6 393.1 474.1 379 484.9 372.2C491.7 367.9 496.1 360.4 496.1 352C496.1 344.9 493 338.5 487.9 334C482.7 329.4 479.7 322.9 479.7 316C479.7 309.1 482.7 302.6 487.9 298C493 293.5 496.1 287.1 496.1 280L496 277.6C494.9 266.3 485.9 257.3 474.6 256.2L472.2 256.1L324.7 256.1C316.5 256.1 308.9 251.9 304.5 245C300.1 238.1 299.5 229.3 303 221.9L333 157.6C340 142.6 334.4 124.9 320.5 116.6L317.6 115z"/>
                        </svg> 
                        {likes}
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