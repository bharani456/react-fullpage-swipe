import { FullscreenCarousel } from "@/components/FullscreenCarousel";
import CaseStudy from "@/components/CaseStudy";

const Index = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left half - Carousel */}
      <div className="w-1/2 h-screen">
        <FullscreenCarousel />
      </div>
      
      {/* Right half - Case Study */}
      <div className="w-1/2 h-screen">
        <CaseStudy />
      </div>
    </div>
  );
};

export default Index;
