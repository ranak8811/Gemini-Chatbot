## VERSION-2

```jsx
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";

const Music = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(null);
  const currentSong = songs[currentSongIndex];

  // Playing Functionality
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSongIndex]);

  //   Update Progress Bar
  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        setProgress((currentTime / duration) * 100);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
      audioRef.current.addEventListener("ended", handleNext);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
        audioRef.current.addEventListener("ended", handleNext);
      }
    };
  }, [currentSongIndex]);

  //   Play& Pause

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  //   Previous
  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    setProgress(0);
  };

  // Next
  const handleNext = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === songs.length - 1 ? 0 : prevIndex + 1
    );
    setProgress(0);
  };

  // Initials
  const getInitials = (songName) => {
    return songName.charAt(0).toUpperCase();
  };

  // Random Color Effect: Dance Lights Effect
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="w-[350px] absolute top-[30%] left-[40%] p-4 flex items-center bg-zinc-950/80 backdrop-blur-sm rounded-b-sm z-50 rounded-sm">
      {/* RIGHT */}
      <div
        style={{
          backgroundColor: currentSong.image ? "transparent" : getRandomColor(),
        }}
        className="w-[80px] h-[80px] rounded-xs mr-5 overflow-hidden flex justify-center items-center"
      >
        {currentSong.image ? (
          <img
            src={currentSong.image}
            alt="Song Cover"
            className="w-full h-full bg-cover"
          />
        ) : (
          <span className="text-2xl font-bold uppercase">
            {getInitials(currentSong.name)}
          </span>
        )}
      </div>

      {/* LEFT */}

      <div className=" flex-1">
        {/* 01: Song Name */}
        <div className="text-center mb-2.5 text-lg text-lime-400  uppercase">
          {currentSong.name}
        </div>

        {/* 02: Play Buttons */}
        <div className="flex items-center text-2xl mb-2.5 justify-center gap-2.5">
          {/* Prev */}
          <button
            onClick={handlePrevious}
            className=" border-none cursor-pointer"
          >
            <FaStepBackward />
          </button>

          {/* Play */}
          <button
            onClick={handlePlayPause}
            className=" border-none cursor-pointer"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          {/* Next */}
          <button onClick={handleNext} className=" border-none cursor-pointer">
            <FaStepForward />
          </button>
        </div>

        {/* 03: Progress Bar */}

        <div className="h-1.25 bg-zinc-700 rounded-xs overflow-hidden mt-2.5">
          <div
            style={{
              width: `${progress}%`,
            }}
            className="h-full  bg-lime-500"
          ></div>
        </div>

        {/* Audio */}

        <audio ref={audioRef} src={currentSong.audio} />
      </div>
    </div>
  );
};

export default Music;
```

## VERSION-3

```jsx

```

## VERSION-4

```jsx

```
