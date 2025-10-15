import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
// Using direct asset paths to avoid import type resolution issues

type SlideType = {
  type: "video" | "image";
  src: string;
  title: string;
  description: string;
};

const slides: SlideType[] = [
  { type: "video", src: "/src/assets/Proposed_solution_SIH_video.mp4", title: "", description: "" },
  { type: "video", src: "/src/assets/Proposed_solution_SIH_video.mp4", title: "", description: "" },
  { type: "video", src: "/src/assets/TECHNICAL_APPROACH_SIH.mp4", title: "", description: "" },
  { type: "video", src: "/src/assets/Innovation_&_fesibility_SIH_video.mp4", title: "", description: "" },
  { type: "video", src: "/src/assets/Impacts_&_Benefits_SIH_video.mp4", title: "", description: "" },
  { type: "image", src: "/src/assets/1.JPG", title: "", description: "" },
  { type: "image", src: "/src/assets/2.JPG", title: "", description: "" },
  { type: "image", src: "/src/assets/3.JPG", title: "", description: "" },
  { type: "image", src: "/src/assets/4.JPG", title: "", description: "" },
  { type: "image", src: "/src/assets/5.JPG", title: "", description: "" },
  { type: "image", src: "/src/assets/6.JPG", title: "", description: "" },
  { type: "image", src: "/src/assets/7.JPG", title: "", description: "" },
  { type: "video", src: "/src/assets/9.MOV", title: "", description: "" },
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
        // Special handling for second slide (index 1) - try to play with sound
        if (i === 1) {
          vid.muted = false;
          const playPromise = vid.play();
          if (playPromise && typeof playPromise.then === "function") {
            playPromise.catch(() => {
              // If unmuted autoplay fails, try muted
              vid.muted = true;
              vid.play().catch(() => {});
            });
          }
        } else {
          // For other videos, use normal logic
          vid.muted = !hasInteracted;
          const playPromise = vid.play();
          if (playPromise && typeof playPromise.then === "function") {
            playPromise.catch(() => {
              // If autoplay fails, keep it muted until user interaction
              vid.muted = true;
            });
          }
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

  // Auto-advance from first slide after 0.1 seconds
  useEffect(() => {
    if (!emblaApi) return;
    if (selectedIndex === 0) {
      const timer = setTimeout(() => {
        emblaApi.scrollNext();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedIndex, emblaApi]);

  // Ensure video plays when slide becomes active
  useEffect(() => {
    const activeVideo = videoRefs.current[selectedIndex];
    const activeSlide = slides[selectedIndex];
    
    if (activeVideo && activeSlide?.type === "video") {
      // For the second slide (index 1), try to play with sound immediately
      if (selectedIndex === 1) {
        activeVideo.muted = false;
        const playPromise = activeVideo.play();
        if (playPromise && typeof playPromise.then === "function") {
          playPromise.catch(() => {
            // If unmuted autoplay fails, try muted play
            activeVideo.muted = true;
            activeVideo.play().catch(() => {});
          });
        }
      } else {
        // For other videos, use normal logic
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
    }
  }, [selectedIndex, hasInteracted]);

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      onPointerDown={() => {
        setHasInteracted(true);
        localStorage.setItem("allowSound", "1");
      }}
      onKeyDown={() => {
        setHasInteracted(true);
        localStorage.setItem("allowSound", "1");
      }}
      onClick={() => {
        setHasInteracted(true);
        localStorage.setItem("allowSound", "1");
      }}
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

      {/* Navigation Buttons */}
      <Button
        variant="carousel"
        size="icon"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="carousel"
        size="icon"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

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
