import React, { useEffect, useState } from "react";
import bgImage from "../assets/landing-bg.svg";
import logo from "../assets/logo.svg";
import menuIcon from "../assets/hamburger.svg";
import ItemCard from "../Components/ItemCard";

import Rice from "../assets/rice.png";
import Oil from "../assets/oil.png";
import Cheese from "../assets/cheese.png";
import CannedProducts from "../assets/tin-can.png";
import Cake from "../assets/cake.png";
import Down from "../assets/downArrow2.png";

import Basket from "../assets/basket.png";
import SearchIcon from "../assets/search-icon.png";

const items = [
  {
    image: Rice,
    title: "Rice",
    description:
      "Staple grains that complete every meal. Perfect for daily cooking or a quick pasta dish.",
  },
  {
    image: Oil,
    title: "Oils",
    description:
      "Healthy and versatile cooking oils. Ideal for frying, sautéing, and baking.",
  },
  {
    image: Cheese,
    title: "Cheeses",
    description:
      "Premium cheeses loved worldwide. Add rich flavor to pasta, pizza, and more.",
  },
  {
    image: CannedProducts,
    title: "Canned Products",
    description:
      "Convenient and tasty pantry essentials. Quick solutions for easy meals.",
  },
  {
    image: Cake,
    title: "Cakes",
    description:
      "Convenient and tasty pantry essentials. Quick solutions for easy meals.",
  },
];

function Landingpage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [swingProgress, setSwingProgress] = useState(0);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  const [animationProgress, setAnimationProgress] = useState(0); // Changed from scrollProgress
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimatedState, setIsAnimatedState] = useState(false); // Track animation state

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSwingProgress((prev) => prev + 0.01);
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Toggle animation state
    const targetProgress = isAnimatedState ? 0 : 1;

    // Animate to target progress - FASTER DURATION
    const duration = 400; // Reduced from 600ms to 400ms
    const startTime = Date.now();
    const startProgress = animationProgress;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentAnimationProgress =
        startProgress + (targetProgress - startProgress) * easeOut;
      setAnimationProgress(currentAnimationProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setIsAnimatedState(!isAnimatedState);
      }
    };

    animate();
  };

  // Items animation - scatter to different places with individual movements
  function getItemTransform(progress, index) {
    const maxMoves = [300, 300, 200, 300, 320];
    const translateY = -Math.round(progress * maxMoves[index]);

    // Much wider horizontal scattering
    const horizontalMoves = [-80, -40, 0, 60, 100];
    const translateX = progress * horizontalMoves[index];

    // EXTREMELY FAST continuous swing animation
    const swingSpeeds = [15.0, 15.5, 15.8, 15.3, 15.6]; // Much faster speeds
    const swingRange = 2;
    const swing = Math.sin(swingProgress * swingSpeeds[index]) * swingRange;

    // Reduced scales to fit inside basket better
    const scales = [1.1, 1.15, 1.12, 1.08, 1.14];
    const scale = scales[index] + progress * 0.1;

    return `translate(${translateX}px, ${translateY}px) rotate(${swing}deg) scale(${scale})`;
  }
  // Header animation - moving up and fading out
  function getHeaderTransform(progress) {
    const maxMove = 200; // Increased from 150 to 200
    const translateY = -Math.round(progress * maxMove);
    const opacity = Math.max(0, 1 - progress * 1.5);

    return {
      transform: `translateY(${translateY}px)`,
      opacity: opacity,
    };
  }

  // ---------- DESKTOP STYLES (unchanged) ----------
  const landingPageStyle = {
    width: "100%",
    minHeight: "100vh",
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  };

  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 50,
    paddingLeft: 16,
    paddingRight: 16,
  };

  const headingStyle = {
    fontFamily: "Aboreto, sans-serif",
    fontSize: "4rem",
    fontWeight: "bold",
    color: "#1e293b",
    margin: 0,
  };

  const subheadingStyle = {
    fontFamily: "Aboreto, sans-serif",
    fontSize: "1rem",
    fontWeight: 600,
    color: "#1e293b",
    marginTop: 24,
    maxWidth: 650,
    lineHeight: 1.5,
  };

  const logoStyle = {
    position: "absolute",
    top: 16,
    left: 16,
    width: 160,
  };

  const scrollContainerStyle = {
    marginTop: 25,
    width: "100%",
    overflowX: "auto",
    overflowY: "visible",
    paddingBottom: 24,
    paddingTop: 40,
    paddingLeft: 16,
    paddingRight: 16,
    whiteSpace: "nowrap",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };

  const cardWrapperStyle = {
    display: "inline-block",
    flex: "0 0 auto",
    marginRight: 40,
    position: "relative",
    overflow: "visible",
    verticalAlign: "top",
  };

  // ---------------- SELECTED VIEW LAYOUT ----------------
  const selectedLayoutWrapper = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 150,
  };

  const bigImageContainer = {
    flex: 1.8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left",
  };

  const bigImageStyle = {
    width: 380,
    height: "auto",
    marginBottom: 30,
  };

  // ---------- MOBILE STYLES ----------
  const mobileWrapper = {
    width: "100%",
    minHeight: "100vh",
    background: "#f7ecbf",
    position: "relative",
    padding: "12px 18px 0",
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  const mobileTopBar = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 6,
  };

  const mobileTitle = {
    fontFamily: "Aboreto, sans-serif",
    fontSize: 32,
    marginTop: 36,
    lineHeight: 1.05,
    letterSpacing: 1,
    color: "#211915",
    textAlign: "center",
    fontWeight: "900",
    transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
  };

  const mobileExplore = {
    marginTop: 10,
    fontSize: 14,
    color: "#6b6b6b",
    fontWeight: 500,
    textAlign: "center",
    transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
  };

  const mobileDownStyle = {
    width: 28,
    marginTop: 8,
    opacity: 0.95,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
  };

  const basketArea = {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    position: "relative",
    marginTop: 20,
    paddingBottom: 40,
  };

  const basketImageStyle = {
    width: "100%",
    maxWidth: 400,
    height: "auto",
    display: "block",
    position: "relative",
    zIndex: 2,
  };

  // Positions for items inside basket
  const basketItemPositions = [
    { left: "10%", bottom: "42%", width: 120, zIndex: 3 }, // oil
    { left: "20%", bottom: "50%", width: 120, zIndex: 4 }, // rice
    { left: "46%", bottom: "54%", width: 120, zIndex: 3 }, // cake
    { left: "40%", bottom: "48%", width: 120, zIndex: 4 }, // cheese
    { left: "56%", bottom: "38%", width: 120, zIndex: 3 }, // canned
  ];

  // ---------------- RENDER ----------------
  if (isMobile) {
    const headerTransform = getHeaderTransform(animationProgress);

    return (
      <div style={mobileWrapper} className="max-h-screen">
        {/* top bar */}
        <div style={mobileTopBar}>
          <img src={menuIcon} alt="menu" style={{ width: 22 }} />
          <img
            src={logo}
            alt="logo"
            style={{ width: 120 }}
            className="hidden md:block"
          />
          <img src={SearchIcon} alt="search" style={{ width: 18 }} />
        </div>

        {/* headings with animation */}
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div style={{ ...mobileTitle, ...headerTransform }}>
            FLAVOUR MEET
            <br />
            FRESHNESS
          </div>

          <div style={{ ...mobileExplore, ...headerTransform }}>
            Explore now
          </div>
          <img
            src={Down}
            alt="down"
            style={{ ...mobileDownStyle, ...headerTransform }}
          />
        </div>

        {/* basket + animated items */}
        <div style={basketArea}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            {/* Animated items with subtle rotation */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "100%",
                pointerEvents: "none",
                zIndex: 1,
              }}
            >
              {[Oil, Rice, Cake, Cheese, CannedProducts].map((imgSrc, idx) => {
                const pos = basketItemPositions[idx] || basketItemPositions[0];
                const style = {
                  position: "absolute",
                  left: pos.left,
                  bottom: pos.bottom,
                  width: pos.width,
                  transform: getItemTransform(animationProgress, idx),
                  transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
                  transformOrigin: "center bottom",
                  userSelect: "none",
                  zIndex: pos.zIndex,
                  opacity: 0.8 + 0.2 * (1 - animationProgress * 0.5),
                };
                return <img key={idx} src={imgSrc} alt="" style={style} />;
              })}
            </div>

            {/* Basket image - STATIC (no animation) */}
            <img
              src={Basket}
              alt="basket"
              style={{
                ...basketImageStyle,
                position: "relative",
                zIndex: 2,
              }}
            />

            {/* Clickable Page indicator dot */}
            <div
              onClick={handleDotClick}
              style={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                width: 16,
                height: 16,
                background: "#ffffff",
                borderRadius: 999,
                boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                zIndex: 5,
                cursor: "pointer",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                opacity: 0.8 + 0.2 * animationProgress,
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateX(-50%) scale(1.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateX(-50%) scale(1)";
              }}
            />
          </div>
        </div>

        {/* REMOVED: Extra scroll space since we don't need scrolling */}
      </div>
    );
  }

  // ---------- DESKTOP (EXACTLY AS BEFORE - UNCHANGED) ----------
  return (
    <div style={landingPageStyle}>
      <img src={logo} alt="Logo" style={logoStyle} />
      <div
        style={{
          position: "absolute",
          top: 28,
          right: 40,
          display: "flex",
          gap: 20,
        }}
      >
        <img
          src={SearchIcon}
          alt="Search"
          style={{ width: 24, cursor: "pointer" }}
        />
        <img
          src={menuIcon}
          alt="Menu"
          style={{ width: 24, cursor: "pointer" }}
        />
      </div>

      {!selectedItem && (
        <div style={contentStyle}>
          <h1 style={headingStyle}>Flavor Meets</h1>
          <h1 style={headingStyle}>Freshness</h1>

          <div style={subheadingStyle}>
            <p>
              Discover a wide range of delicious food products made with love
            </p>
            <p>and quality ingredients. Taste freshness in every bite.</p>
            <p>Find your favorite and treat yourself today.</p>
          </div>

          <div style={scrollContainerStyle}>
            <div style={{ display: "inline-flex", alignItems: "flex-start" }}>
              {items.map((item, index) => (
                <div key={index} style={cardWrapperStyle}>
                  <ItemCard
                    image={item.image}
                    title={item.title}
                    description={item.description}
                    onClick={() => setSelectedItem(item)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedItem && (
        <div style={selectedLayoutWrapper}>
          {/* LEFT SIDE — BIG IMAGE */}
          <div style={bigImageContainer}>
            <h2
              style={{
                fontSize: "2.2rem",
                marginBottom: 10,
                textAlign: "left",
              }}
            >
              {selectedItem.title}
            </h2>
            <p style={{ maxWidth: 400, fontSize: "1rem", lineHeight: 1.6 }}>
              {selectedItem.description}
            </p>
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              style={bigImageStyle}
            />
          </div>

          {/* RIGHT SIDE — PERFECT STAGGERED CARDS LIKE SCREENSHOT */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              gap: 30,
              marginTop: 40,
            }}
          >
            {/* LEFT COLUMN (even items) */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 60,
                paddingTop: 60,
              }}
            >
              {items
                .filter((i) => i.title !== selectedItem.title)
                .filter((_, idx) => idx % 2 === 0)
                .map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedItem(item)}
                    style={{
                      width: "100%",
                      height: 200,
                      borderRadius: 30,
                      background: "#fff",
                      padding: "30px 20px",
                      position: "relative",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: 110,
                        position: "absolute",
                        top: -40,
                        left: 50,
                      }}
                    />
                    <div style={{ marginTop: 40 }}>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "1.3rem",
                          fontWeight: 600,
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          margin: "6px 0",
                          color: "#555",
                          fontSize: "1rem",
                        }}
                      >
                        Mix Vegetables
                      </p>
                      <h3 style={{ marginTop: 10, fontSize: "1.2rem" }}>
                        $24.00
                      </h3>
                    </div>
                    <span
                      style={{
                        position: "absolute",
                        bottom: 20,
                        right: 20,
                        fontSize: 22,
                      }}
                    >
                      🤍
                    </span>
                  </div>
                ))}
            </div>

            {/* RIGHT COLUMN (odd items) */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 60,
                paddingBottom: 0,
              }}
            >
              {items
                .filter((i) => i.title !== selectedItem.title)
                .filter((_, idx) => idx % 2 === 1)
                .map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedItem(item)}
                    style={{
                      width: "100%",
                      height: 200,
                      borderRadius: 30,
                      background: "#fff",
                      padding: "30px 20px",
                      position: "relative",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: 110,
                        position: "absolute",
                        top: -40,
                        left: 50,
                      }}
                    />
                    <div style={{ marginTop: 40 }}>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "1.3rem",
                          fontWeight: 600,
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          margin: "6px 0",
                          color: "#555",
                          fontSize: "1rem",
                        }}
                      >
                        Mix Vegetables
                      </p>
                      <h3 style={{ marginTop: 10, fontSize: "1.2rem" }}>
                        $24.00
                      </h3>
                    </div>
                    <span
                      style={{
                        position: "absolute",
                        bottom: 20,
                        right: 20,
                        fontSize: 22,
                      }}
                    >
                      🤍
                    </span>
                  </div>
                ))}
              <button onClick={() => setSelectedItem(null)}>
                <img style={{ width: 50, marginLeft: 50 }} src={Down} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Landingpage;
