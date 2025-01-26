const TruncateText = ({ text, maxLength }) => {
  const truncatedText =
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <p
      style={{
        direction: "rtl", // Set text direction to RTL
        textAlign: "right", // Align text to the right
      }}
    >
      {truncatedText}
    </p>
  );
};

export default TruncateText;
