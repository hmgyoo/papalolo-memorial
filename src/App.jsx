import { useState } from "react";
import "./App.css";

const ASSETS = {
  // Files in the 'public' folder are accessed via absolute root paths
  // videoSrc: "https://youtu.be/n4mbX_wxXik",
  videoYoutubeId: "n4mbX_wxXik",
  vinylRecord: "https://pngimg.com/uploads/vinyl/vinyl_PNG34.png",
  oldRadio: "/another-radio.png",
  grandfatherPhoto1: "/papalolo1.jpg",
  grandfatherPhoto2: "/papalolo2.jpg",
  grandfatherPhoto3: "/papalolo3.jpg",

  // A transparent leaf image
  leafImage: "/autumn-leaf.png",
};
const LEAF_COUNT = 15;
const STATIC_LEAF_DATA = Array.from({ length: LEAF_COUNT }).map((_, i) => ({
  id: i,
  left: `${((i * 7) % 90) + 5}%`, // Using a deterministic math trick for variety
  animationDelay: `${(i * 1.3) % 15}s`,
  animationDuration: `${18 + ((i * 2) % 12)}s`,
  scale: 0.8 + ((i * 0.1) % 0.5),
}));

const Polaroid = ({ src, caption, className, style }) => (
  <div className={`polaroid-container ${className}`} style={style}>
    <div
      className="polaroid-image mb-3"
      style={{ backgroundImage: `url(${src})` }}
    ></div>
    <p className="text-center font-handwriting text-xl text-vintage-brown">
      {caption}
    </p>
  </div>
);

// 2. The new Falling Leaves Component
const FallingLeaves = () => {
  return (
    <>
      {STATIC_LEAF_DATA.map((leaf) => (
        <div
          key={leaf.id}
          style={{
            left: leaf.left,
            animationDelay: leaf.animationDelay,
            animationDuration: leaf.animationDuration,
            transform: `scale(${leaf.scale})`,
          }}
          className="leaf"
        >
          <img src={ASSETS.leafImage} alt="" />
        </div>
      ))}
    </>
  );
};

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative min-h-screen py-10 px-4 flex flex-col items-center justify-center overflow-hidden bg-paper-texture">
      {/* Add the falling leaves effect */}
      <FallingLeaves />

      {/* --- Decorative Background Elements --- */}
      <img
        src={ASSETS.vinylRecord}
        alt="Vintage Vinyl"
        className="absolute -top-20 -right-20 w-64 h-64 md:w-96 md:h-96 opacity-40 animate-spin-slow pointer-events-none z-20"
      />

      <img
        src={ASSETS.oldRadio}
        alt="Vintage Radio"
        className="absolute bottom-5 left-5 w-48 md:w-72 opacity-60 mix-blend-multiply pointer-events-none hidden sm:block z-20"
      />

      {/* --- The Three Polaroids --- */}
      {/* Top Left */}
      <Polaroid
        src={ASSETS.grandfatherPhoto1}
        caption="Timeless Memories"
        className="top-10 left-5 md:left-10 rotate-[-6deg]"
      />

      {/* Top Right (counter-balance) */}
      <Polaroid
        src={ASSETS.grandfatherPhoto2}
        caption="Always Smiling"
        className="top-32 right-5 md:right-12 rotate-[8deg]"
      />

      {/* Bottom Right (filling space) */}
      <Polaroid
        src={ASSETS.grandfatherPhoto3}
        caption="Forever Loved"
        className="bottom-20 right-10 md:right-24 rotate-[-4deg]"
        style={{ zIndex: 25 }} // Slightly lower Z-index so it might sit behind the radio slightly
      />

      {/* --- Main Content --- */}
      <main className="relative z-40 max-w-3xl w-full text-center">
        <header className="mb-10">
          <h1 className="text-5xl md:text-7xl font-handwriting text-vintage-rust mb-4 drop-shadow-sm">
            In Loving Memory
          </h1>
          <div className="w-24 h-1 bg-vintage-gold mx-auto mb-4 rounded-full opacity-70"></div>
          <h2 className="text-2xl md:text-3xl text-vintage-brown font-serif">
            Always in our hearts.
          </h2>
        </header>

        <div className="relative group">
          <div className="bg-vintage-dark p-2 md:p-4 rounded-3xl shadow-[0_20px_50px_rgba(62,39,35,0.7)] border-t-4 border-l-4 border-vintage-brown/50 border-b-8 border-r-8 border-vintage-dark">
            <div className="relative overflow-hidden rounded-2xl bg-black aspect-video ring-4 ring-vintage-gold/30 ring-offset-4 ring-offset-vintage-dark">
              {/* <video
                ref={videoRef}
                className="w-full h-full object-cover filter sepia contrast-110 brightness-90"
                onClick={togglePlay}
                playsInline
                // Added a poster image so it's not black before playing
                // poster="https://via.placeholder.com/1280x720/3E2723/D7CCC8?text=Click+to+Play"
              >
                <source src={ASSETS.videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
              <iframe
                className={`w-full h-full object-cover contrast-110 brightness-90 transition-opacity duration-700 ${
                  isPlaying ? "opacity-100" : "opacity-0"
                }`}
                /* Notice the autoplay parameter below */
                src={`https://www.youtube-nocookie.com/embed/${
                  ASSETS.videoYoutubeId
                }?autoplay=${
                  isPlaying ? 1 : 0
                }&controls=0&modestbranding=1&rel=0&iv_load_policy=3`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Memorial Video"
              ></iframe>

              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity group-hover:bg-black/40 cursor-pointer z-50"
                >
                  <div className="w-20 h-20 bg-vintage-gold/80 rounded-full flex items-center justify-center pl-2 shadow-lg backdrop-blur-sm border-2 border-vintage-cream">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-10 h-10 text-vintage-cream"
                    >
                      <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                  </div>
                  <p className="absolute bottom-10 text-vintage-cream font-serif italic">
                    Click to play memories
                  </p>
                </button>
              )}

              {/* Keep your scanline overlays */}
              <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10 mix-blend-overlay"></div>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-black/30"></div>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-vintage-brown/80">
          <p className="text-lg italic font-serif max-w-xl mx-auto">
            "Captured moments fade, but memories live forever."
          </p>
          <p className="mt-4 text-sm">A special Christmas gift for Mom.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
