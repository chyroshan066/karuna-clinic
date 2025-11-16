// // hooks/useVideoWithCustomAudio.ts
// import { useEffect, useRef, RefObject } from 'react';

// interface UseVideoWithCustomAudioProps {
//   videoRef: RefObject<HTMLVideoElement | null>;
//   enabled?: boolean;
// }

// interface UseVideoWithCustomAudioReturn {
//   audioRef: RefObject<HTMLAudioElement | null>;
//   playBoth: () => Promise<void>;
//   pauseBoth: () => void;
//   stopBoth: () => void;
//   syncAudioWithVideo: () => void;
// }

// /**
//  * Custom hook to replace video's original audio with a custom audio track.
//  * 
//  * @param videoRef - Reference to the video element
//  * @param enabled - Whether to enable audio replacement (default: true)
//  * @returns Object containing audio ref and control functions
//  */
// export const useVideoWithCustomAudio = ({
//   videoRef,
//   enabled = true,
// }: UseVideoWithCustomAudioProps): UseVideoWithCustomAudioReturn => {
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const videoMutedStateRef = useRef<boolean>(false); // Track intended mute state for audio

//   useEffect(() => {
//     if (!enabled || !audioRef.current) return;

//     // Set the custom audio source
//     audioRef.current.src = "/images/media/audios/a1.opus";
//     audioRef.current.preload = 'metadata';
//     audioRef.current.loop = true;
//   }, [enabled]);

//   // Effect to keep video muted and sync custom audio with video controls
//   useEffect(() => {
//     if (!enabled) return;

//     const video = videoRef.current;
//     const audio = audioRef.current;

//     if (!video || !audio) return;

//     // Force video to always be muted (this prevents original audio)
//     video.muted = true;
//     video.volume = 0;

//     // Initialize audio muted state from video
//     videoMutedStateRef.current = false; // Start unmuted for custom audio
//     audio.muted = false;

//     // Intercept volume changes to control custom audio instead
//     const handleVolumeChange = () => {
//       // Always keep video muted and at zero volume
//       if (!video.muted) {
//         video.muted = true;
//       }
//       if (video.volume !== 0) {
//         // User is trying to change volume - apply to custom audio
//         audio.volume = video.volume;
//         // Reset video volume to 0
//         video.volume = 0;
//       }
//     };

//     // Use MutationObserver to catch muted attribute changes
//     const observer = new MutationObserver((mutations) => {
//       mutations.forEach((mutation) => {
//         if (mutation.type === 'attributes' && mutation.attributeName === 'muted') {
//           // User toggled mute button
//           // Toggle custom audio mute state
//           videoMutedStateRef.current = !videoMutedStateRef.current;
//           audio.muted = videoMutedStateRef.current;
          
//           // Keep video always muted
//           if (!video.muted) {
//             // Use setTimeout to avoid infinite loop
//             setTimeout(() => {
//               video.muted = true;
//             }, 0);
//           }
//         }
//       });
//     });

//     observer.observe(video, {
//       attributes: true,
//       attributeFilter: ['muted']
//     });

//     // Sync custom audio play with video play
//     const handlePlay = () => {
//       audio.play().catch(error => {
//         console.error('Error playing custom audio:', error);
//       });
//     };

//     // Sync custom audio pause with video pause
//     const handlePause = () => {
//       audio.pause();
//     };

//     // Sync custom audio position when user seeks in video
//     const handleSeeked = () => {
//       audio.currentTime = video.currentTime;
//     };

//     // Sync custom audio playback rate when video speed changes
//     const handleRateChange = () => {
//       audio.playbackRate = video.playbackRate;
//     };

//     // Reset audio when video ends
//     const handleEnded = () => {
//       audio.pause();
//       audio.currentTime = 0;
//     };

//     // Continuously check and fix audio-video sync drift
//     const handleTimeUpdate = () => {
//       // Keep video muted at all times
//       if (!video.muted) {
//         video.muted = true;
//       }
//       if (video.volume !== 0) {
//         video.volume = 0;
//       }
      
//       // If audio and video drift apart by more than 0.3 seconds, resync
//       if (Math.abs(audio.currentTime - video.currentTime) > 0.3) {
//         audio.currentTime = video.currentTime;
//       }
//     };

//     // Attach all event listeners
//     video.addEventListener('play', handlePlay);
//     video.addEventListener('pause', handlePause);
//     video.addEventListener('seeked', handleSeeked);
//     video.addEventListener('ratechange', handleRateChange);
//     video.addEventListener('ended', handleEnded);
//     video.addEventListener('timeupdate', handleTimeUpdate);
//     video.addEventListener('volumechange', handleVolumeChange);

//     // Cleanup event listeners on unmount
//     return () => {
//       observer.disconnect();
//       video.removeEventListener('play', handlePlay);
//       video.removeEventListener('pause', handlePause);
//       video.removeEventListener('seeked', handleSeeked);
//       video.removeEventListener('ratechange', handleRateChange);
//       video.removeEventListener('ended', handleEnded);
//       video.removeEventListener('timeupdate', handleTimeUpdate);
//       video.removeEventListener('volumechange', handleVolumeChange);
//     };
//   }, [videoRef, enabled]);

//   // Function to play both video and audio together
//   const playBoth = async (): Promise<void> => {
//     const video = videoRef.current;
//     const audio = audioRef.current;

//     if (!video || !audio || !enabled) {
//       return video?.play();
//     }

//     try {
//       // Ensure video is muted and at zero volume before playing
//       video.muted = true;
//       video.volume = 0;
      
//       // Start both video and audio simultaneously
//       await Promise.all([
//         video.play(),
//         audio.play()
//       ]);
//     } catch (error) {
//       console.error('Error playing video/audio:', error);
//       throw error;
//     }
//   };

//   // Function to pause both video and audio
//   const pauseBoth = (): void => {
//     const video = videoRef.current;
//     const audio = audioRef.current;

//     if (video) video.pause();

//     if (audio && enabled) audio.pause();
//   };

//   // Function to stop and reset both video and audio
//   const stopBoth = (): void => {
//     const video = videoRef.current;
//     const audio = audioRef.current;

//     if (video) {
//       video.pause();
//       video.currentTime = 0;
//     }

//     if (audio && enabled) {
//       audio.pause();
//       audio.currentTime = 0;
//     }
//   };

//   // Function to manually sync audio with video (useful for fixing drift)
//   const syncAudioWithVideo = (): void => {
//     const video = videoRef.current;
//     const audio = audioRef.current;

//     if (video && audio && enabled) {
//       audio.currentTime = video.currentTime;
//     }
//   };

//   return {
//     audioRef,
//     playBoth,
//     pauseBoth,
//     stopBoth,
//     syncAudioWithVideo,
//   };
// };













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
 * @param enabled - Whether to enable audio replacement (default: true)
 * @returns Object containing audio ref and control functions
 */
export const useVideoWithCustomAudio = ({
  videoRef,
  enabled = true,
}: UseVideoWithCustomAudioProps): UseVideoWithCustomAudioReturn => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoMutedStateRef = useRef<boolean>(false); // Track intended mute state for audio

  useEffect(() => {
    if (!enabled || !audioRef.current) return;

    // Set the custom audio source
    audioRef.current.src = "/images/media/audios/a1.opus";
    audioRef.current.preload = 'metadata';
    // MODIFIED: Removed native loop to handle it manually
    audioRef.current.loop = false;
  }, [enabled]);

  // Effect to keep video muted and sync custom audio with video controls
  useEffect(() => {
    if (!enabled) return;

    const video = videoRef.current;
    const audio = audioRef.current;

    if (!video || !audio) return;

    // Force video to always be muted (this prevents original audio)
    video.muted = true;
    video.volume = 0;

    // Initialize audio muted state from video
    videoMutedStateRef.current = false; // Start unmuted for custom audio
    audio.muted = false;

    // Intercept volume changes to control custom audio instead
    const handleVolumeChange = () => {
      // Always keep video muted and at zero volume
      if (!video.muted) {
        video.muted = true;
      }
      if (video.volume !== 0) {
        // User is trying to change volume - apply to custom audio
        audio.volume = video.volume;
        // Reset video volume to 0
        video.volume = 0;
      }
    };

    // Use MutationObserver to catch muted attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'muted') {
          // User toggled mute button
          // Toggle custom audio mute state
          videoMutedStateRef.current = !videoMutedStateRef.current;
          audio.muted = videoMutedStateRef.current;
          
          // Keep video always muted
          if (!video.muted) {
            // Use setTimeout to avoid infinite loop
            setTimeout(() => {
              video.muted = true;
            }, 0);
          }
        }
      });
    });

    observer.observe(video, {
      attributes: true,
      attributeFilter: ['muted']
    });

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
      // MODIFIED: When seeking, handle audio position with modulo to stay within audio duration
      if (audio.duration && !isNaN(audio.duration)) {
        audio.currentTime = video.currentTime % audio.duration;
      } else {
        audio.currentTime = video.currentTime;
      }
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

    // ADDED: Handle audio ending - restart it from beginning if video is still playing
    const handleAudioEnded = () => {
      if (!video.paused && video.currentTime < video.duration) {
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.error('Error restarting custom audio:', error);
        });
      }
    };

    // Continuously check and fix audio-video sync drift
    const handleTimeUpdate = () => {
      // Keep video muted at all times
      if (!video.muted) {
        video.muted = true;
      }
      if (video.volume !== 0) {
        video.volume = 0;
      }
      
      // MODIFIED: If audio and video drift apart, resync using modulo for looping
      if (audio.duration && !isNaN(audio.duration)) {
        const expectedAudioTime = video.currentTime % audio.duration;
        if (Math.abs(audio.currentTime - expectedAudioTime) > 0.3) {
          audio.currentTime = expectedAudioTime;
        }
      } else {
        // Fallback if audio duration not yet loaded
        if (Math.abs(audio.currentTime - video.currentTime) > 0.3) {
          audio.currentTime = video.currentTime;
        }
      }
    };

    // Attach all event listeners
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('ratechange', handleRateChange);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('volumechange', handleVolumeChange);
    // ADDED: Listen for audio ended event to restart it
    audio.addEventListener('ended', handleAudioEnded);

    // Cleanup event listeners on unmount
    return () => {
      observer.disconnect();
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('ratechange', handleRateChange);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('volumechange', handleVolumeChange);
      // ADDED: Clean up audio ended listener
      audio.removeEventListener('ended', handleAudioEnded);
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
      // Ensure video is muted and at zero volume before playing
      video.muted = true;
      video.volume = 0;
      
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