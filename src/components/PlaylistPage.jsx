import { useEffect, useState } from 'react';
import { Queue } from '../utils/PlaylistQueue';

export default function PlaylistPage({ playlists, onVideoClick }) {
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
    const [displayedVideos, setDisplayedVideos] = useState([]);
    const [playlistQueue, setPlaylistQueue] = useState(new Queue());
    const selectedPlaylist = playlists.find((playlist) => playlist.id === selectedPlaylistId);

    useEffect(() => {
        if (selectedPlaylist) {
            const queue = Queue.fromVideos(selectedPlaylist.videos);
            setPlaylistQueue(queue);
            setDisplayedVideos(queue.toArray());
        }
    }, [selectedPlaylist]);

    const handlePlayNext = () => {
        const nextQueue = playlistQueue.clone();
        const nextVideo = nextQueue.dequeue();

        if (!nextVideo) return;

        const updatedQueue = new Queue([...nextQueue.toArray(), nextVideo]);
        setPlaylistQueue(updatedQueue);
        setDisplayedVideos(updatedQueue.toArray());
    };

    const handleShuffle = () => {
        const nextVideos = [...displayedVideos];

        for (let index = nextVideos.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [nextVideos[index], nextVideos[randomIndex]] = [nextVideos[randomIndex], nextVideos[index]];
        }

        const shuffledQueue = new Queue(nextVideos);
        setPlaylistQueue(shuffledQueue);
        setDisplayedVideos(nextVideos);
    };

    if (playlists.length === 0) {
        return (
            <div style={styles.emptyState}>
                <h1 style={styles.heading}>Your playlists</h1>
                <p>Save a video to a playlist to see it here.</p>
            </div>
        );
    }

    if (selectedPlaylist) {
        return (
            <div style={styles.container}>
                <div style={styles.actionsRow}>
                    <button type="button" style={styles.backButton} onClick={() => setSelectedPlaylistId(null)}>
                        Back to playlists
                    </button>
                    {selectedPlaylist.videos.length > 1 && (
                        <>
                            <button type="button" style={styles.shuffleButton} onClick={handleShuffle}>
                                Shuffle
                            </button>
                            <button type="button" style={styles.queueButton} onClick={handlePlayNext}>
                                Next
                            </button>
                        </>
                    )}
                </div>

                <div style={styles.detailHeader}>
                    <h1 style={styles.heading}>{selectedPlaylist.name}</h1>
                    <span style={styles.count}>{selectedPlaylist.videos.length} video{selectedPlaylist.videos.length === 1 ? '' : 's'}</span>
                </div>
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

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Your playlists</h1>
            <div style={styles.playlistGrid}>
                {playlists.map((playlist) => {
                    const coverVideo = playlist.videos[0];
                    return (
                        <button
                            key={playlist.id}
                            type="button"
                            style={styles.playlistCard}
                            onClick={() => setSelectedPlaylistId(playlist.id)}
                        >
                            {coverVideo ? (
                                <img src={coverVideo.thumbnail} alt="" style={styles.coverImage} />
                            ) : (
                                <div style={styles.emptyCover}>No videos yet</div>
                            )}
                            <span style={styles.playlistName}>{playlist.name}</span>
                            <span style={styles.count}>{playlist.videos.length} video{playlist.videos.length === 1 ? '' : 's'}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '24px',
        color: '#fff'
    },
    
    emptyState: { 
        padding: '48px 24px', 
        color: '#fff', 
        textAlign: 'center' 
    },
    
    heading: { 
        color: '#fff', 
        fontSize: '28px', 
        margin: '0 0 28px' 
    },

    playlistGrid: { 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
        gap: '28px 18px' 
    },
    
    playlistCard: { 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '6px', 
        padding: 0, 
        border: 0, 
        background: 'none', 
        color: '#fff', 
        textAlign: 'left', 
        cursor: 'pointer' 
    },
    
    coverImage: { 
        width: '100%', 
        aspectRatio: '16 / 9', 
        objectFit: 'cover', 
        borderRadius: '8px' 
    },
    
    emptyCover: { 
        display: 'grid', 
        placeItems: 'center', 
        width: '100%', 
        aspectRatio: '16 / 9', 
        borderRadius: '8px', 
        backgroundColor: '#272727', 
        color: '#aaa' 
    },
    
    playlistName: { 
        fontSize: '18px', 
        fontWeight: '600' 
    },
    
    count: { 
        color: '#aaa', 
        fontSize: '14px' 
    },
    
    backButton: { 
        // marginBottom: '22px', 
        padding: '8px 14px', 
        border: '1px solid #606060', 
        borderRadius: '4px', 
        background: 'transparent', 
        color: '#fff', 
        cursor: 'pointer' 
    },
    
    actionsRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '22px',
    },

    detailHeader: { 
        display: 'flex', 
        alignItems: 'baseline', 
        gap: '12px' 
    },

    shuffleButton: {
        padding: '8px 14px', 
        border: '1px solid #606060', 
        borderRadius: '4px', 
        background: 'transparent', 
        color: '#fff', 
        cursor: 'pointer' 
    },

    queueButton: {
        padding: '8px 14px', 
        border: '1px solid #606060', 
        borderRadius: '4px', 
        background: 'transparent', 
        color: '#fff', 
        cursor: 'pointer' 
    },
    
    videoGrid: { 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
        gap: '20px 16px' 
    },
    
    videoCard: { 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '5px', 
        padding: 0, 
        border: 0, 
        background: 'none', 
        color: '#fff', 
        textAlign: 'left', 
        cursor: 'pointer' 
    },
    
    thumbnail: { 
        width: '100%', 
        aspectRatio: '16 / 9', 
        objectFit: 'cover', 
        borderRadius: '8px' 
    },
    
    videoTitle: { 
        fontSize: '15px', 
        fontWeight: '600' 
    },
    
    channel: { 
        color: '#aaa', 
        fontSize: '13px' 
    },
};
