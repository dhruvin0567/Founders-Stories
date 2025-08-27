import React, { useState } from "react";

const ImageWithLoader = ({
  src,
  alt,
  className = "",
  eager = false,
  onClick,
  style,
  placeholderHeight = 200,
  placeholderWidth = "100%",
  fallbackSrc = "https://via.placeholder.com/600x400?text=Image+not+available",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView] = useState(true);

  const showLoader = !isLoaded && !hasError;

  return (
    <div
      className="image-loader-wrapper"
      onClick={onClick}
      style={{ width: placeholderWidth, height: placeholderHeight }}
    >
      {/* Placeholder shimmer while loading */}
      {showLoader && (
        <div
          className="image-loader-placeholder shimmer"
          style={{
            height: placeholderHeight,
            width: placeholderWidth,
            borderRadius: 8,
          }}
        />
      )}

      {/* Main image */}
      {!hasError && (
        <img
          src={isInView || eager ? src : undefined}
          alt={alt}
          className={className}
          width="100%"
          height={placeholderHeight}
          style={{
            display: "block",
            width: "100%",
            height: placeholderHeight,
            objectFit: "cover",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
            ...(style || {}),
          }}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "low"}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      {/* Fallback image */}
      {hasError && (
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
          width="100%"
          height={placeholderHeight}
          style={{
            display: "block",
            width: "100%",
            height: placeholderHeight,
            objectFit: "cover",
            opacity: 1,
            ...(style || {}),
          }}
          loading="eager"
          decoding="async"
          fetchPriority="low"
        />
      )}
    </div>
  );
};

export default ImageWithLoader;
