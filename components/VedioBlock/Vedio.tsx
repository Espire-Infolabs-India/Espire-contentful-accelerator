import React, { useState, useRef } from "react";
import { ComponentDataProps } from "@/utils/lib/CommonProps";

const VideoComponent = ({ data }: ComponentDataProps) => {
  const videoAsset = data?.fields?.vedio;
  const videoUrl =
    videoAsset?.fields?.file?.url
      ? `https:${videoAsset.fields.file.url}`
      : "";

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  if (!videoUrl) {
    return <p className="text-center text-red-500">No video available</p>;
  }

  return (
    <div className="relative w-full py-10 font-sans flex justify-center items-center">
      {/* Video container */}
      <div className="relative w-full max-w-5xl">
        {/* Video element */}
        <video
          ref={videoRef}
          className="w-full h-auto"
          controls
          src={videoUrl}
          onPlay={handlePlay}
        >
          Your browser does not support the video tag.
        </video>

        {/* Overlay text - hidden when playing */}
        {!isPlaying && (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start p-8 bg-black/40 text-white md:text-left md:p-16">
            {data?.fields?.title && (
              <h2 className="text-2xl sm:text-5xl font-poppin mb-2">
                {data.fields.title}
              </h2>
            )}
            {data?.fields?.summary && (
              <p className="text-base sm:text-lg font-poppin max-w-md">
                {data.fields.summary}
              </p>
            )}
            <button
              onClick={handlePlay}
              className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold"
            >
              Play Video
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoComponent;
