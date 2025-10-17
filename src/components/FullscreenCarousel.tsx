import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
// Using direct asset paths to avoid import type resolution issues

type SlideType = {
  type: "video" | "image";
  src: string;
  title: string;
  description: string;
};

const slides: SlideType[] = [
  { type: "image", src: "/1.JPG", title: "", description: "" },
  { type: "image", src: "/2.JPG", title: "", description: "" },
  { type: "image", src: "/3.JPG", title: "", description: "" },
  { type: "image", src: "/4.JPG", title: "", description: "" },
  { type: "image", src: "/5.JPG", title: "", description: "" },
  { type: "image", src: "/6.JPG", title: "", description: "" },
  { type: "image", src: "/7.JPG", title: "", description: "" },
  { type: "video", src: "/9.MOV", title: "", description: "" },
];

export const FullscreenCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Advance to next slide when a video ends (no timed auto-advance)

  // Keep only the active slide unmuted/playing (after user interaction)
  useEffect(() => {
    for (let i = 0; i < slides.length; i++) {
      const vid = videoRefs.current[i];
      if (!vid) continue; // Not a video slide
      const isActive = i === selectedIndex;
      const slide = slides[i];
      
      if (isActive && slide.type === "video") {
        // For videos, try to play immediately when active
        vid.muted = !hasInteracted;
        const playPromise = vid.play();
        if (playPromise && typeof playPromise.then === "function") {
          playPromise.catch(() => {
            // If autoplay fails, keep it muted until user interaction
            vid.muted = true;
          });
        }
      } else {
        // Pause and mute non-active videos
        vid.pause();
        vid.muted = true;
      }
    }
  }, [selectedIndex, hasInteracted]);

  // Try to enable sound on refresh if browser allows or user previously allowed
  useEffect(() => {
    const allowSound = localStorage.getItem("allowSound") === "1";
    const activeVideo = videoRefs.current[selectedIndex];
    if (!activeVideo) return;
    if (allowSound) {
      setHasInteracted(true);
      activeVideo.muted = false;
      const p = activeVideo.play();
      if (p && typeof p.then === "function") p.catch(() => {});
      return;
    }
    // Attempt unmuted autoplay once; if blocked, keep muted until interaction
    activeVideo.muted = false;
    const playAttempt = activeVideo.play();
    if (playAttempt && typeof playAttempt.then === "function") {
      playAttempt
        .then(() => {
          setHasInteracted(true);
        })
        .catch(() => {
          activeVideo.muted = true;
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-advance every 2 seconds for images, wait for videos to finish
  useEffect(() => {
    if (!emblaApi) return;
    
    const activeSlide = slides[selectedIndex];
    const activeVideo = videoRefs.current[selectedIndex];
    
    // If it's a video, don't set auto-advance timer (let video finish naturally)
    if (activeSlide?.type === "video" && activeVideo) {
      return;
    }
    
    // For images, auto-advance after 2 seconds
    const timer = setTimeout(() => {
      emblaApi.scrollNext();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [selectedIndex, emblaApi]);

  // Ensure video plays when slide becomes active
  useEffect(() => {
    const activeVideo = videoRefs.current[selectedIndex];
    const activeSlide = slides[selectedIndex];
    
    if (activeVideo && activeSlide?.type === "video") {
      // For videos, use normal logic
      activeVideo.muted = !hasInteracted;
      const playPromise = activeVideo.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          // If autoplay fails, try muted play
          activeVideo.muted = true;
          activeVideo.play().catch(() => {});
        });
      }
    }
  }, [selectedIndex, hasInteracted]);

  const handleCarouselClick = (e: React.MouseEvent) => {
    setHasInteracted(true);
    localStorage.setItem("allowSound", "1");
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const carouselWidth = rect.width;
    
    // If click is on the right half, go to next slide
    if (clickX > carouselWidth / 2) {
      scrollNext();
    } else {
      // If click is on the left half, go to previous slide
      scrollPrev();
    }
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden cursor-pointer"
      onPointerDown={() => {
        setHasInteracted(true);
        localStorage.setItem("allowSound", "1");
      }}
      onKeyDown={() => {
        setHasInteracted(true);
        localStorage.setItem("allowSound", "1");
      }}
      onClick={handleCarouselClick}
    >
      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative min-w-0 flex-[0_0_100%]"
            >
              {slide.type === "image" ? (
                <img
                  src={slide.src}
                  className="h-full w-full object-cover"
                  alt=""
                />
              ) : (
                <video
                  src={slide.src}
                  className="h-full w-full object-cover"
                  autoPlay
                  playsInline
                  muted={!hasInteracted || index !== selectedIndex}
                  ref={(el) => {
                    if (el) videoRefs.current[index] = el;
                  }}
                  onEnded={() => {
                    if (emblaApi) emblaApi.scrollNext();
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
              {/* Text overlay removed as requested */}
            </div>
          ))}
        </div>
      </div>


      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className="w-3 h-3 rounded-full bg-primary-foreground/30 hover:bg-primary-foreground/60 transition-all duration-300 data-[active=true]:bg-primary-foreground data-[active=true]:w-8"
            data-active={index === selectedIndex}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
