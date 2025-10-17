import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  .Btn {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background-color: rgb(27, 27, 27);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition-duration: 0.3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.11);
  }

  .svgIcon {
    fill: #2196f3;
  }

  .icon2 {
    width: 18px;
    height: 5px;
    border-bottom: 2px solid #2196f3;
    border-left: 2px solid #2196f3;
    border-right: 2px solid #2196f3;
  }

  .tooltip {
    position: absolute;
    left: -80px;
    opacity: 0;
    background-color: rgb(12, 12, 12);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition-duration: 0.2s;
    pointer-events: none;
    letter-spacing: 0.5px;
  }

  .tooltip::before {
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    background-color: rgb(12, 12, 12);
    background-size: 1000%;
    background-position: center;
    transform: rotate(45deg);
    right: -5%;
    transition-duration: 0.3s;
  }

`;

const CaseStudy = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/case-study.pdf';
    link.download = 'Case Study By Crivo.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="h-full p-4 bg-background overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Case Study
          </h1>
          <StyledWrapper>
            <button className="Btn" onClick={handleDownload}>
              <svg className="svgIcon" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>
              <span className="icon2" />
              <span className="tooltip">Download PDF</span>
            </button>
          </StyledWrapper>
        </div>
        
        <div className="flex-1 space-y-4 text-sm overflow-y-auto">
          <div>
            <h2 className="text-lg font-bold mb-2 text-foreground/80">
              Feasibility of AI-Based QR Code Marking on Track Fittings
            </h2>
            <h3 className="text-base font-semibold mb-2 text-foreground/80">Background</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Indian Railways uses millions of track fittings every year, including elastic rail clips, liners, rail pads, and concrete sleepers. Currently, there is no effective way to identify or trace each component once it has been installed. This causes problems with monitoring, warranty validation, and maintenance tracking.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To address this, our project proposes using AI-enabled laser-based QR code marking for each track fitting. These QR codes will contain the complete data for the component, including vendor, batch number, supply date, and inspection details. They can be scanned through a mobile app linked with the User Depot Module (UDM) and Track Management System (TMS).
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-2 text-foreground/80">Field Visit and Observations</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              During our visit to the Permanent Way (P.W.) Office in Erode, we interacted with engineers and maintenance staff to understand real-world conditions.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              We found that many staff members are hesitant due to their limited experience with digital tools. Most are used to manual processes and were initially unsure how this would work in their daily tasks.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              After we explained how the laser marking and QR scanning process functions, the officials understood the practical benefits of the system. They also stressed that training and awareness would be essential during the implementation phase.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The main takeaway from the visit was that adopting new technology must include proper training for personnel to ensure the system's success.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-2 text-foreground/80">Technical Feasibility for Engraving</h3>
            <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
              <li>
                <p className="leading-relaxed" ><span className="font-semibold">Elastic Rail Clips (ERC)</span><br />
                <span className="text-foreground/80">Material:</span> High-strength silico-manganese spring steel (20–25 mm diameter)<br />
                <span className="text-foreground/80">Laser Type:</span> Fiber laser<br />
                <span className="text-foreground/80">QR Size:</span> 15×15 mm to 20×20 mm<br />
                <span className="text-foreground/80">Engraving Depth:</span> 0.1 – 0.2 mm<br />
                <span className="text-foreground/80">Positioning:</span> On the outer arm surface, avoiding the toe or curve under load.</p>
              </li>
              <li>
                <p className="leading-relaxed"><span className="font-semibold">Liners</span><br />
                <span className="text-foreground/80">Material:</span> Glass-filled nylon (GFN) or metal (3–6 mm thickness)<br />
                <span className="text-foreground/80">Laser Type:</span> CO₂ laser<br />
                <span className="text-foreground/80">QR Size:</span> Up to 25×25 mm<br />
                <span className="text-foreground/80">Engraving Depth:</span> 0.1 – 0.15 mm<br />
                <span className="text-foreground/80">Positioning:</span> On flat areas away from contact zones with the rail or clip.</p>
              </li>
              <li>
                <p className="leading-relaxed"><span className="font-semibold">Rail Pads</span><br />
                <span className="text-foreground/80">Material:</span> Rubber or composite (6–10 mm thickness)<br />
                <span className="text-foreground/80">Laser Type:</span> CO₂ laser or surface embossing<br />
                <span className="text-foreground/80">QR Size:</span> Around 20×20 mm<br />
                <span className="text-foreground/80">Engraving Depth:</span> ≤ 0.1 mm<br />
                <span className="text-foreground/80">Positioning:</span> On flat regions not in direct load or groove areas.</p>
              </li>
              <li>
                <p className="leading-relaxed"><span className="font-semibold">Concrete Sleepers</span><br />
                <span className="text-foreground/80">Material:</span> Pre-stressed concrete (150–300 mm section depth)<br />
                <span className="text-foreground/80">Laser Type:</span> CO₂ laser<br />
                <span className="text-foreground/80">QR Size:</span> 40×40 mm or slightly larger<br />
                <span className="text-foreground/80">Engraving Depth:</span> 0.5 – 1 mm<br />
                <span className="text-foreground/80">Positioning:</span> On the top or side face, away from the tendon or high-stress zones.</p>
              </li>
            </ol>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              Each engraved code can be sealed with a protective fiber-reinforced coating to keep it readable despite exposure to rain, dust, heat, and vibration.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-2 text-foreground/80">Conclusion</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              From our interactions in the field and the technical analysis, it is clear that laser-based QR code marking is practical and safe for all major railway track fittings, provided that specific material parameters are followed.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              However, successful adoption will rely on staff training, awareness sessions, and a gradual rollout across depots. With proper handling and testing, this approach can create a reliable digital method to trace and monitor every track fitting throughout its lifecycle.
            </p>
          </div>
        </div>

        {/* Team Credit */}
        <div className="mt-4 text-center">
          <p className="text-sm text-foreground/80">
            by Team Crivo
          </p>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
