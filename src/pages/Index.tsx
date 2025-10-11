import { FullscreenCarousel } from "@/components/FullscreenCarousel";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen">
      <FullscreenCarousel />
      
      {/* Case Study Section */}
      <section className="py-20 px-4 md:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-foreground">
            Case Study
          </h1>
          
          <div className="space-y-8">
            <Card className="p-8 hover-scale">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                Project Overview
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This innovative project showcases the perfect blend of modern design and cutting-edge technology. 
                Our team focused on creating an immersive experience that captivates users from the first interaction.
              </p>
            </Card>

            <Card className="p-8 hover-scale">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                Challenges & Solutions
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We tackled complex technical challenges by implementing responsive design patterns and 
                optimized performance strategies. The result is a seamless experience across all devices 
                with lightning-fast load times and smooth animations.
              </p>
            </Card>

            <Card className="p-8 hover-scale">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                Results & Impact
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The project exceeded expectations with remarkable user engagement metrics and positive feedback. 
                Our approach demonstrates how thoughtful design and technical excellence create lasting impact.
              </p>
            </Card>
          </div>

          {/* Team Credit */}
          <div className="mt-16 text-center">
            <p className="text-xl md:text-2xl font-semibold text-foreground">
              Case study by Team Crivo
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
