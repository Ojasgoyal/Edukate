import React from 'react';

export default function Watch({ lecture, onClose }) {
  if (!lecture || !lecture.videoUrl) {
    return (
      <div className="w-full aspect-video bg-muted flex flex-col items-center justify-center rounded-lg border border-dashed mb-8 space-y-4">
        <p className="text-muted-foreground">No video available for this lecture.</p>
        {onClose && (
          <button onClick={onClose} className="px-4 py-2 bg-secondary rounded text-sm font-medium hover:bg-secondary/80">
            Close Player
          </button>
        )}
      </div>
    );
  }

  // Helper to extract YouTube video ID and format into an embed URL
  const getYouTubeEmbedUrl = (url) => {
    try {
      let videoId = '';
      if (url.includes('youtube.com/watch')) {
        videoId = new URLSearchParams(new URL(url).search).get('v');
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      } else if (url.includes('youtube.com/embed/')) {
        return url; // Already an embed URL
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch (error) {
      return null;
    }
  };

  const embedUrl = getYouTubeEmbedUrl(lecture.videoUrl);

  if (!embedUrl) {
    return (
      <div className="w-full aspect-video bg-muted flex flex-col items-center justify-center rounded-lg border border-dashed mb-8 space-y-4">
        <p className="text-muted-foreground bg-red-10 px-4 py-2 rounded">
          Invalid YouTube URL provided by instructor.
        </p>
        {onClose && (
          <button onClick={onClose} className="px-4 py-2 bg-secondary rounded text-sm font-medium hover:bg-secondary/80">
            Close Player
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="mb-8 space-y-4 bg-background p-4 rounded-xl border shadow-sm">
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-2xl font-bold font-dm-serif">Now Playing: {lecture.title}</h3>
        {onClose && (
          <button 
            onClick={onClose} 
            className="text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors"
          >
            Close ✕
          </button>
        )}
      </div>
      <div className="w-full aspect-video rounded-lg overflow-hidden border shadow-lg bg-black">
        <iframe
          className="w-full h-full"
          src={embedUrl}
          title={lecture.title}
          modestbranding="1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
