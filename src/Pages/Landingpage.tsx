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
    price: "$12.99",
    category: "Grains",
  },
  {
    image: Oil,
    title: "Oils",
    description:
      "Healthy and versatile cooking oils. Ideal for frying, sautéing, and baking.",
    price: "$8.99",
    category: "Cooking Essentials",
  },
  {
    image: Cheese,
    title: "Cheeses",
    description:
      "Premium cheeses loved worldwide. Add rich flavor to pasta, pizza, and more.",
    price: "$15.99",
    category: "Dairy",
  },
  {
    image: CannedProducts,
    title: "Canned Products",
    description:
      "Convenient and tasty pantry essentials. Quick solutions for easy meals.",
    price: "$3.99",
    category: "Pantry",
  },
  {
    image: Cake,
    title: "Cakes",
    description:
      "Convenient and tasty pantry essentials. Quick solutions for easy meals.",
    price: "$24.99",
    category: "Bakery",
  },
];

function Landingpage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [swingProgress, setSwingProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimatedState, setIsAnimatedState] = useState(false);
  const [mobileSelectedItem, setMobileSelectedItem] = useState(null);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    // Only run the swing animation if we're NOT in mobile detail view
    if (!mobileSelectedItem) {
      const interval = setInterval(() => {
        setSwingProgress((prev) => prev + 0.01);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [mobileSelectedItem]); // Add dependency to stop when detail view is open

  const handleDotClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const targetProgress = isAnimatedState ? 0 : 1;
    const duration = 400;
    const startTime = Date.now();
    const startProgress = animationProgress;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

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

  function getItemTransform(progress, index) {
  // Fixed positions for perfect alignment
  const positions = [
    { x: 50, y: -350 },    // Top-center
    { x: -80, y: -200 }, // Middle left
    { x: 50, y: -180 },  // Middle right  
    { x: -130, y: -40 },  // Bottom left
    { x: 10, y: -70 }    // Bottom right
  ];
  
  const pos = positions[index];
  
  // Direct translation without complex calculations
  const translateX = pos.x * progress;
  const translateY = pos.y * progress;

  // Minimal consistent swing
  const swing = Math.sin(swingProgress * 10) * 1.5;

  // Consistent scaling
  const scale = 1.0 + progress * 0.2;

  return `translate(${translateX}px, ${translateY}px) rotate(${swing}deg) scale(${scale})`;
}

  function getHeaderTransform(progress) {
    const maxMove = 200;
    const translateY = -Math.round(progress * maxMove);
    const opacity = Math.max(0, 1 - progress * 1.5);

    return {
      transform: `translateY(${translateY}px)`,
      opacity: opacity,
    };
  }

  // Mobile Item Detail Component
  const MobileItemDetail = ({ item, onBack, onItemClick }) => {
    return (
      <div style={mobileItemDetailStyle}>
        {/* Header */}
        <div style={mobileDetailHeader}>
          <button onClick={onBack} style={mobileBackButton}>
            <img
              src={Down}
              alt="back"
              style={{ width: 20, transform: "rotate(90deg)" }}
            />
          </button>
          <div style={mobileDetailTitle}>Product Details</div>
          <div style={{ width: 40 }} />
        </div>

        {/* Item Image */}
        <div style={mobileDetailImageContainer}>
          <img src={item.image} alt={item.title} style={mobileDetailImage} />
        </div>

        {/* Other Products Section */}
        <div style={mobileOtherProducts}>
          <h3 style={mobileOtherProductsTitle}>You might also like</h3>
          <div style={mobileProductsGrid}>
            {items
              .filter((i) => i.title !== item.title)
              .map((otherItem, index) => (
                <div
                  key={index}
                  style={mobileProductCard}
                  onClick={() => onItemClick(otherItem)}
                >
                  <img
                    src={otherItem.image}
                    alt={otherItem.title}
                    style={mobileProductImage}
                  />
                  <div style={mobileProductInfo}>
                    <h4 style={mobileProductTitle}>{otherItem.title}</h4>
                    <p style={mobileProductPrice}>{otherItem.price}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  // Mobile Styles for Detail View
  const mobileItemDetailStyle = {
    width: "100%",
    minHeight: "100vh",
    background: "#f7ecbf",
    position: "relative",
    padding: "12px 0 0",
    boxSizing: "border-box",
    overflowY: "auto",
  };

  const mobileDetailHeader = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 18px",
    borderBottom: "1px solid #e5d9a8",
  };

  const mobileBackButton = {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 8,
  };

  const mobileDetailTitle = {
    fontFamily: "Aboreto, sans-serif",
    fontSize: 18,
    fontWeight: "bold",
    color: "#211915",
  };

  const mobileDetailImageContainer = {
    width: "100%",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
  };

  const mobileDetailImage = {
    width: "200px",
    height: "200px",
    objectFit: "contain",
  };

  const mobileDetailInfo = {
    padding: "0 24px 24px",
    borderBottom: "1px solid #e5d9a8",
  };

  const mobileDetailItemTitle = {
    fontFamily: "Aboreto, sans-serif",
    fontSize: 28,
    fontWeight: "bold",
    color: "#211915",
    margin: "0 0 8px",
  };

  const mobileDetailCategory = {
    fontSize: 14,
    color: "#666",
    margin: "0 0 16px",
    fontWeight: "500",
  };

  const mobileDetailDescription = {
    fontSize: 16,
    color: "#333",
    lineHeight: 1.5,
    margin: "0 0 20px",
  };

  const mobileDetailPrice = {
    fontSize: 24,
    fontWeight: "bold",
    color: "#211915",
    margin: "0 0 20px",
  };

  const mobileAddToCartButton = {
    width: "100%",
    padding: "16px",
    background: "#211915",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const mobileOtherProducts = {
    padding: "24px",
  };

  const mobileOtherProductsTitle = {
    fontFamily: "Aboreto, sans-serif",
    fontSize: 20,
    fontWeight: "bold",
    color: "#211915",
    margin: "0 0 16px",
  };

  const mobileProductsGrid = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const mobileProductCard = {
    display: "flex",
    alignItems: "center",
    background: "white",
    borderRadius: "12px",
    padding: "12px",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  const mobileProductImage = {
    width: "60px",
    height: "60px",
    objectFit: "contain",
    marginRight: "12px",
  };

  const mobileProductInfo = {
    flex: 1,
  };

  const mobileProductTitle = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#211915",
    margin: "0 0 4px",
  };

  const mobileProductPrice = {
    fontSize: "14px",
    color: "#666",
    fontWeight: "500",
    margin: 0,
  };

  // Desktop Styles
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

  // Mobile Styles
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

  const basketItemPositions = [
    { left: "10%", bottom: "42%", width: 120, zIndex: 3 },
    { left: "20%", bottom: "50%", width: 120, zIndex: 4 },
    { left: "46%", bottom: "54%", width: 120, zIndex: 3 },
    { left: "40%", bottom: "48%", width: 120, zIndex: 4 },
    { left: "56%", bottom: "38%", width: 120, zIndex: 3 },
  ];

  // RENDER
  if (isMobile) {
    if (mobileSelectedItem) {
      return (
        <MobileItemDetail
          item={mobileSelectedItem}
          onBack={() => setMobileSelectedItem(null)}
          onItemClick={setMobileSelectedItem}
        />
      );
    }

    const headerTransform = getHeaderTransform(animationProgress);

    return (
      <div style={mobileWrapper} className="max-h-screen">
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
                const item = items[idx];
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
                  cursor: animationProgress > 0.5 ? "pointer" : "default",
                  pointerEvents: animationProgress > 0.5 ? "auto" : "none",
                };
                return (
                  <img
                    key={idx}
                    src={imgSrc}
                    alt=""
                    style={style}
                    onClick={() => {
                      if (animationProgress > 0.5) {
                        setMobileSelectedItem(item);
                      }
                    }}
                  />
                );
              })}
            </div>

            <img
              src={Basket}
              alt="basket"
              onClick={handleDotClick}
              style={{
                ...basketImageStyle,
                position: "relative",
                zIndex: 2,
                cursor: "pointer",
              }}
            />

            <div
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
                opacity: 0.8 + 0.2 * animationProgress,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // DESKTOP VIEW
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
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              gap: 30,
              marginTop: 40,
            }}
          >
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
