import { useEffect, useState } from 'react';
import { Queue } from '../utils/PlaylistQueue';

/**
 * LikedPage Component
 * Displays a grid of all liked videos with shuffle and play next functionality.
 * Users can shuffle the order of videos or reorganize them with the play next feature.
 */
export default function LikedPage({ likedVideos = [], onVideoClick }) {
    // Queue data structure to manage video playback order
    const [queue, setQueue] = useState(new Queue());
    // Videos currently displayed to the user (may be shuffled or reordered)
    const [displayedVideos, setDisplayedVideos] = useState([]);

    // Reinitialize queue when liked videos list changes
    useEffect(() => {
        const nextQueue = Queue.fromVideos(likedVideos);
        setQueue(nextQueue);
        setDisplayedVideos(nextQueue.toArray());
    }, [likedVideos]);

    // Move the first video to the end of the queue (rotates the queue)
    const handlePlayNext = () => {
        const nextQueue = queue.clone();
        const nextVideo = nextQueue.dequeue();

        if (!nextVideo) return;

        // Rotate: move dequeued video to the end
        const rotatedQueue = new Queue([...nextQueue.toArray(), nextVideo]);
        setQueue(rotatedQueue);
        setDisplayedVideos(rotatedQueue.toArray());
    };

    // Randomly shuffle the order of videos using Fisher-Yates algorithm
    const handleShuffle = () => {
        const nextVideos = [...displayedVideos];

        // Fisher-Yates shuffle: swap each element with a random element
        for (let index = nextVideos.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [nextVideos[index], nextVideos[randomIndex]] = [nextVideos[randomIndex], nextVideos[index]];
        }

        const shuffledQueue = new Queue(nextVideos);
        setQueue(shuffledQueue);
        setDisplayedVideos(nextVideos);
    };

    // Show empty state when no videos are liked
    if (!likedVideos || likedVideos.length === 0) {
        return (
            <div style={styles.emptyState}>
                <h1 style={styles.heading}>Liked videos</h1>
                <p>Like a video to see it here.</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header section with title and action buttons */}
            <div style={styles.actionsRow}>
                <h1 style={styles.heading}>Liked videos</h1>
                {/* Only show shuffle and play next buttons if there are multiple videos */}
                {likedVideos.length > 1 && (
                    <>
                        <button type="button" style={styles.shuffleButton} onClick={handleShuffle}>
                            Shuffle
                        </button>
                        <button type="button" style={styles.queueButton} onClick={handlePlayNext}>
                            Play next
                        </button>
                    </>
                )}
            </div>

            {/* Grid of video cards */}
            <div style={styles.videoGrid}>
                {displayedVideos.map((video) => (
                    <button key={video.id} style={styles.videoCard} onClick={() => onVideoClick(video)}>
                        <img src={video.thumbnail} alt="" style={styles.thumbnail} />
                        <span style={styles.videoTitle}>{video.title}</span>
                        <span style={styles.channel}>{video.channelName}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

const styles = {
    // Main container for the page
    container: {
        padding: '24px',
        color: '#fff',
    },
    // Styling for empty state message
    emptyState: {
        padding: '48px 24px',
        color: '#fff',
        textAlign: 'center',
    },
    // Page title styling
    heading: {
        color: '#fff',
        fontSize: '28px',
        margin: '0',
    },
    // Row containing header and action buttons
    actionsRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px',
        flexWrap: 'wrap',
    },
    // Shuffle button (secondary action)
    shuffleButton: {
        padding: '8px 14px',
        border: '1px solid #606060',
        borderRadius: '4px',
        background: 'transparent',
        color: '#fff',
        cursor: 'pointer',
    },
    // Play next button (primary action)
    queueButton: {
        padding: '8px 14px',
        border: '1px solid #3ea6ff',
        borderRadius: '4px',
        background: '#3ea6ff',
        color: '#0f0f0f',
        cursor: 'pointer',
        fontWeight: '600',
    },
    // Responsive grid for video cards
    videoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '20px 16px',
    },
    // Individual video card
    videoCard: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        padding: 0,
        border: 0,
        background: 'none',
        color: '#fff',
        textAlign: 'left',
        cursor: 'pointer',
    },
    // Video thumbnail image
    thumbnail: {
        width: '100%',
        aspectRatio: '16 / 9',
        objectFit: 'cover',
        borderRadius: '8px',
    },
    // Video title text
    videoTitle: {
        fontSize: '15px',
        fontWeight: '600',
    },
    // Channel name text (secondary)
    channel: {
        color: '#aaa',
        fontSize: '13px',
    },
};
