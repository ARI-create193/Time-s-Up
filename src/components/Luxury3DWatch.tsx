// @ts-nocheck
import React from 'react';

// Use the uploaded model in the public folder
const WATCH_MODEL_URL = '/Luxury watch.gltf';

const Luxury3DWatch: React.FC = () => {
  return (
    <div className="flex flex-row items-start w-full gap-12 py-8 px-8 bg-gray-50 font-sans" style={{ borderRadius: 32 }}>
      {/* Watch on the far left */}
      <div className="flex-shrink-0 flex items-start justify-start" style={{ minWidth: 350 }}>
        <model-viewer
          src={WATCH_MODEL_URL}
          alt="Luxury 3D Watch"
          ar
          camera-controls
          auto-rotate
          shadow-intensity="1"
          style={{ width: 350, height: 350, background: 'transparent', borderRadius: 24 }}
          exposure="1.1"
          poster=""
        >
        </model-viewer>
      </div>
      {/* Info on the right, fill remaining space */}
      <div className="flex-1 flex items-start">
        <div className="bg-white/90 rounded-2xl shadow-xl p-6 border border-primary relative w-full">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-wide mb-2 font-serif">Casio CA-53W Watch Information</h2>
          <div className="h-1 w-16 bg-primary rounded-full mb-4"></div>
          <ul className="space-y-2 text-sm text-gray-800 font-medium luxury-list">
            <li><span className="inline-block w-3 h-3 rounded-full bg-primary mr-3 align-middle"></span><b>Model Origin:</b> Introduced in 1988 by Casio.</li>
            <li><span className="inline-block w-3 h-3 rounded-full bg-primary mr-3 align-middle"></span><b>Cultural Impact:</b> Featured in <i>Back to the Future Part II, Part III</i>, and <i>Breaking Bad</i>.</li>
            <li><span className="inline-block w-3 h-3 rounded-full bg-primary mr-3 align-middle"></span><b>Dimensions & Weight:</b> 43.2 x 34.4 x 8.2 mm, 24 grams.</li>
            <li><span className="inline-block w-3 h-3 rounded-full bg-primary mr-3 align-middle"></span><b>Calculator:</b> 8-digit with addition, subtraction, multiplication, and division.</li>
            <li><span className="inline-block w-3 h-3 rounded-full bg-primary mr-3 align-middle"></span><b>Stopwatch:</b> 1/100-second, up to 23:59'59.99.</li>
            <li><span className="inline-block w-3 h-3 rounded-full bg-primary mr-3 align-middle"></span><b>Additional Features:</b> Daily alarm, hourly signal, auto calendar to 2099.</li>
            <li><span className="inline-block w-3 h-3 rounded-full bg-primary mr-3 align-middle"></span><b>Power:</b> CR2016 battery, approximately 5-year life.</li>
            <li><span className="inline-block w-3 h-3 rounded-full bg-primary mr-3 align-middle"></span><b>Water Resistance:</b> Splash-proof (hand washing, rain), not for swimming or diving.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Luxury3DWatch; 