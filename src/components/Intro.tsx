'use client';

import { useState, useRef, memo, useEffect } from 'react';
import { IonIcon } from './utility/IonIcon';
import { TitleHeader } from './utility/TitleHeader';

interface IntroProps {
    videoUrl?: string;
}

export const Intro = memo(({
    videoUrl = "/images/media/videos/intro.webm"
}: IntroProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const [videoDuration, setVideoDuration] = useState<string>('0:00');
    const videoRef = useRef<HTMLVideoElement>(null);

    const formatDuration = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const handleLoadedMetadata = () => {
            if (videoRef.current) {
                const duration = videoRef.current.duration;
                if (!isNaN(duration) && isFinite(duration)) {
                    setVideoDuration(formatDuration(duration));
                }
            }
        };

        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

            // If metadata is already loaded, get duration immediately
            if (videoElement.readyState >= 1) {
                handleLoadedMetadata();
            }
        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
        };
    }, [videoUrl]); // Re-run when video URL changes

    useEffect(() => {
        const playVideo = async () => {
            if (videoRef.current && !hasUserInteracted) {
                try {
                    setIsLoading(true);
                    videoRef.current.muted = true;
                    await videoRef.current.play();
                    setIsPlaying(true);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Auto-play failed:', error);
                    setIsLoading(false);
                }
            }
        };

        // Small delay to ensure component is fully mounted
        const timer = setTimeout(playVideo, 500);

        return () => clearTimeout(timer);
    }, [hasUserInteracted]);

    const handlePlayVideo = () => {
        if (videoRef.current) {
            setIsLoading(true);
            setHasUserInteracted(true);
            videoRef.current.muted = false;
            videoRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error playing video:', error);
                    setIsLoading(false);
                });
        }
    };

    const handlePauseVideo = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleVideoEnded = () => {
        setIsPlaying(false);
    };

    const handleVideoClick = () => {
        if (isPlaying) {
            handlePauseVideo();
        } else {
            handlePlayVideo();
        }
    };

    return (
        <section
            className="intro section"
            id="intro"
        >
            <div className="custom-container">
                <div className="intro-content">
                    {/* Section Header */}
                    <div className="intro-header text-center">

                        <TitleHeader
                            title="Our Story"
                            subTitle1="Experience Excellence In"
                            subTitle2="Skin, Hair & Laser Care"
                        />

                        <p className="section-text">
                            Watch our journey of providing world-class skin, hair & laser treatments with cutting-edge technology and compassionate care in the heart of Dharan.
                        </p>
                    </div>

                    {/* Video Container */}
                    <div className="intro-video-container-fullwidth">
                        <div className="video-wrapper">
                            <video
                                ref={videoRef}
                                className="intro-video"
                                onEnded={handleVideoEnded}
                                onLoadStart={() => setIsLoading(true)}
                                onCanPlay={() => setIsLoading(false)}
                                onClick={handleVideoClick}
                                controls={isPlaying && hasUserInteracted}
                                preload="metadata"
                                muted
                                loop={!hasUserInteracted}
                            >
                                <source
                                    src={videoUrl}
                                    type="video/webm"
                                />
                                Your browser does not support the video tag.
                            </video>

                            {/* Custom Play/Pause Overlay */}
                            {(!isPlaying || !hasUserInteracted) && (
                                <div className="video-overlay">
                                    <button
                                        className="play-btn"
                                        onClick={handlePlayVideo}
                                        disabled={isLoading}
                                        aria-label={hasUserInteracted ? "Play promotional video" : "Play promotional video with sound"}
                                    >
                                        {isLoading ? (
                                            <div className="loading-spinner">
                                                <div className="spinner"></div>
                                            </div>
                                        ) : (
                                            <IonIcon
                                                name="play"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </button>

                                    {/* Video Info Badge - Modified to use dynamic duration */}
                                    <div className="video-info-badge">
                                        <div className="badge-content">
                                            <span>{hasUserInteracted ? "Watch Demo" : "Click for Sound"}</span>
                                            <span className="badge-duration">{videoDuration}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Decorative Elements */}
                            <div className="video-decoration">
                                <div className="decoration-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
});

Intro.displayName = "Intro";