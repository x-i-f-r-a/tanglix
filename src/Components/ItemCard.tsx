import React from "react";

function ItemCard({ image, title, description, onClick }: any) {
  const [hover, setHover] = React.useState(false);

  const styles = {
    card: {
      position: "relative",
      width: 260,
      minHeight: 330,
      borderRadius: 18,
      paddingTop: 90,
      paddingLeft: 20,
      paddingRight: 20,
      background: hover
        ? "#FF5420"
        : "#C4C4C466", 
      backdropFilter: "blur(10px)",
      boxShadow: hover
        ? "0 12px 30px rgba(255, 153, 51, 0.4)" 
        : "0 8px 20px rgba(0, 0, 0, 0.15)",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      transition: "0.3s ease",
      transform: hover ? "scale(1.1)" : "scale(1)",
      color: hover ? "white" : "black",
      cursor: "pointer",
      overflow: "visible",
    },

    imageWrapper: {
      position: "absolute",
      top: -60,
      left: "50%",
      transform: "translateX(-50%)",
    },

    image: {
      width: 170,
      height: 170,
      objectFit: "contain",
      transition: "0.3s",
      transform: hover ? "scale(1.08)" : "scale(1)",
      zIndex: 100,
    },

    title: {
      fontSize: 26,
      fontWeight: "bold",
      marginBottom: 12,
      color: hover ? "white" : "black",
    },

    content: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "stretch", 
      padding: "0 10px",
      color: hover ? "white" : "black",
    },

    description: {
      fontSize: 15,
      lineHeight: 1.4,
      marginBottom: 20,
      padding: "0 6px",
      color: hover ? "white" : "black",
      wordWrap: "break-word", 
      whiteSpace: "normal",
      textAlign: "center", 
    },

    button: {
      padding: "8px 20px",
      border: "1px solid #1f2937",
      borderRadius: 20,
      background: "transparent",
      fontSize: 15,
      fontWeight: 500,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      marginBottom: 15,
      transition: "0.3s",
    },

    buttonHover: {
      background: "white",
      color: "black",
    },
  };

  const [btnHover, setBtnHover] = React.useState(false);

  return (
    <div
      style={styles.card}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Floating Image */}
      <div style={styles.imageWrapper}>
        <img src={image} alt={title} style={styles.image} />
      </div>

      {/* Content */}
      <div style={styles.content}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.description}>{description}</p>

        <button
          style={
            btnHover
              ? { ...styles.button, ...styles.buttonHover }
              : styles.button
          }
          onClick={onClick}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          View more <span>→</span>
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
