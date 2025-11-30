import React, { useState } from "react";
import bgImage from "../assets/landing-bg.svg";
import logo from "../assets/logo.svg";
import menuIcon from "../assets/hamburger.svg";
import ItemCard from "../Components/ItemCard";

import Rice from "../assets/rice.png";
import Oil from "../assets/oil.png";
import Cheese from "../assets/cheese.png";
import CannedProducts from "../assets/tin-can.png";
import Cake from "../assets/cake.png";
import Down from "../assets/downArrow.png";

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

  // ---------- Styles ----------
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

  const menuIconStyle = {
    position: "absolute",
    top: 28,
    right: 40,
    width: 40,
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

  const smallItemsContainer = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // gap: 20,
  };

  const smallItemCard = {
    background: "#ffffff",
    padding: "14px 20px",
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    cursor: "pointer",
  };

  const smallImageStyle = {
    width: 60,
    height: "auto",
  };

  return (
    <div style={landingPageStyle}>
      <img src={logo} alt="Logo" style={logoStyle} />
      <img src={menuIcon} alt="Menu" style={menuIconStyle} />

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

          {/* Scrollable cards */}
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
                gap: 60, // increased gap for better vertical spacing
                paddingTop: 60, // start shifted DOWN (big enough for stagger)
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
                    {/* Floating image */}
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

                    {/* Title + Subtitle */}
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

                    {/* Heart Icon */}
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
                gap: 60, // same gap here
                paddingBottom: 0, // start shifted UP (push bottom space instead of translate)
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
                    {/* Floating Image */}
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

                    {/* Title + Subtitle */}
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

                    {/* Heart Icon */}
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
              <button
                onClick={() => setSelectedItem(null)}
              >
                <img style={{width: 50, marginLeft: 50}} src={Down}/>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Landingpage;
