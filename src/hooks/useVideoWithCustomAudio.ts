// hooks/useVideoWithCustomAudio.ts
import { useEffect, useRef, RefObject } from 'react';

interface UseVideoWithCustomAudioProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  enabled?: boolean;
}

interface UseVideoWithCustomAudioReturn {
  audioRef: RefObject<HTMLAudioElement | null>;
  playBoth: () => Promise<void>;
  pauseBoth: () => void;
  stopBoth: () => void;
  syncAudioWithVideo: () => void;
}

/**
 * Custom hook to replace video's original audio with a custom audio track.
 * 
 * @param videoRef - Reference to the video element
 * @param customAudioUrl - URL of the custom audio file to play
 * @param enabled - Whether to enable audio replacement (default: true)
 * @returns Object containing audio ref and control functions
 */
export const useVideoWithCustomAudio = ({
  videoRef,
  enabled = true,
}: UseVideoWithCustomAudioProps): UseVideoWithCustomAudioReturn => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!enabled || !audioRef.current) return;

    // Set the custom audio source
    audioRef.current.src = "/images/media/audios/a1.opus";
    audioRef.current.preload = 'metadata'; // preload metadata for better UX
  }, [enabled]);

  // Effect to synchronize custom audio with video playback
  useEffect(() => {
    if (!enabled) return;

    const video = videoRef.current;
    const audio = audioRef.current;

    if (!video || !audio) return;

    // Always mute original video audio to prevent it from playing
    video.muted = true;

    // Sync custom audio play with video play
    const handlePlay = () => {
      audio.play().catch(error => {
        console.error('Error playing custom audio:', error);
      });
    };

    // Sync custom audio pause with video pause
    const handlePause = () => {
      audio.pause();
    };

    // Sync custom audio position when user seeks in video
    const handleSeeked = () => {
      audio.currentTime = video.currentTime;
    };

    // Sync custom audio playback rate when video speed changes
    const handleRateChange = () => {
      audio.playbackRate = video.playbackRate;
    };

    // Reset audio when video ends
    const handleEnded = () => {
      audio.pause();
      audio.currentTime = 0;
    };

    // Continuously check and fix audio-video sync drift
    const handleTimeUpdate = () => {
      // If audio and video drift apart by more than 0.3 seconds, resync
      if (Math.abs(audio.currentTime - video.currentTime) > 0.3) {
        audio.currentTime = video.currentTime;
      }
    };

    // Match audio volume to video volume (if video is unmuted)
    const handleVolumeChange = () => {
      audio.volume = video.volume;
    };

    // Attach all event listeners
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('ratechange', handleRateChange);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('volumechange', handleVolumeChange);

    // Cleanup event listeners on unmount
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('ratechange', handleRateChange);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [videoRef, enabled]);

  // Function to play both video and audio together
  const playBoth = async (): Promise<void> => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (!video || !audio || !enabled) {
      return video?.play();
    }

    try {
      // Start both video and audio simultaneously
      await Promise.all([
        video.play(),
        audio.play()
      ]);
    } catch (error) {
      console.error('Error playing video/audio:', error);
      throw error;
    }
  };

  // Function to pause both video and audio
  const pauseBoth = (): void => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (video) video.pause();
    if (audio && enabled) audio.pause();
  };

  // Function to stop and reset both video and audio
  const stopBoth = (): void => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    if (audio && enabled) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  // Function to manually sync audio with video (useful for fixing drift)
  const syncAudioWithVideo = (): void => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (video && audio && enabled) {
      audio.currentTime = video.currentTime;
    }
  };

  return {
    audioRef,
    playBoth,
    pauseBoth,
    stopBoth,
    syncAudioWithVideo,
  };
};