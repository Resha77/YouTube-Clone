import VideoPreview from './VideoPreview';

export default function HistoryPage({ history, onVideoClick }) {
    if (!history || history.length === 0) {
        return <p style={{ color: '#aaa', padding: '24px' }}>
            No watch history yet.
        </p>;
    }

    return (
        <div style={{ padding: '24px' }}>
            <h2 style={{ color: '#fff', marginBottom: '16px' }}>Watch History</h2>
            <VideoPreview videos={history} onVideoClick={onVideoClick} />
        </div>
    );
}