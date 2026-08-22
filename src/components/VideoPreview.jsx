import './VideoPreview.css';

export default function VideoPreview({ video }) {
    if (!video) return null;

    return (
        <article className="video-preview">
            <img
                className="video-preview__thumbnail"
                src={video.thumbnail}
                alt={video.title}
            />
            <div className="video-preview__details">
                <img
                    className="video-preview__avatar"
                    src={video.channelAvatar || video.thumbnail}
                    alt=""
                />
                <div className="video-preview__text">
                    <h2 className="video-preview__title">{video.title}</h2>
                    <p className="video-preview__channel">{video.channelName}</p>
                    <p className="video-preview__meta">
                        {video.views} views &bull; {video.uploadedAt}
                    </p>
                </div>
            </div>
        </article>
    );
}