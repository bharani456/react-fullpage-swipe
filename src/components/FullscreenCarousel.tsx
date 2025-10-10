import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import slide1 from "@/assets/slide1.jpg";
import slide2 from "@/assets/slide2.jpg";
import slide3 from "@/assets/slide3.jpg";

type SlideType = {
  type: "image" | "video";
  src: string;
  title: string;
  description: string;
};

const slides: SlideType[] = [
  {
    type: "image",
    src: slide1,
    title: "Discover Amazing Experiences",
    description: "Explore a world of possibilities with stunning visuals",
  },
  {
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Innovative Design",
    description: "Modern aesthetics meet cutting-edge functionality",
  },
  {
    type: "image",
    src: slide2,
    title: "Creative Excellence",
    description: "Where imagination meets innovation",
  },
  {
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    title: "Dynamic Content",
    description: "Experience content in motion",
  },
  {
    type: "image",
    src: slide3,
    title: "Endless Possibilities",
    description: "Transform your vision into reality",
  },
];

export const FullscreenCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
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
                  alt={slide.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <video
                  src={slide.src}
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  playsInline
                  controls
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center px-4 animate-fade-in">
                  <h2 className="text-5xl md:text-7xl font-bold mb-4 text-primary-foreground drop-shadow-2xl">
                    {slide.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-primary-foreground/90 drop-shadow-lg">
                    {slide.description}
                  </p>
                </div>
              </div>
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
