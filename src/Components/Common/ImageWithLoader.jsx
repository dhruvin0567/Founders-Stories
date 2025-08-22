import React, { useEffect, useState } from "react";

const ImageWithLoader = ({
  src,
  alt,
  className = "",
  eager = false,
  onClick,
  style,
  placeholderHeight = 200,
  fallbackSrc = "https://via.placeholder.com/600x400?text=Image+not+available",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView] = useState(true);

  const showLoader = !isLoaded && !hasError;

  return (
    <div className="image-loader-wrapper" onClick={onClick}>
      {/* Lightweight skeleton while image loads */}
      {showLoader && (
        <div
          className="image-loader-placeholder shimmer"
          style={{ height: placeholderHeight, width: "100%", borderRadius: 8 }}
        />
      )}

      {/* Main image */}
      {!hasError && (
        <img
          src={isInView || eager ? src : undefined}
          alt={alt}
          className={className}
          style={{
            display: "block",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.25s ease-in-out",
            ...(style || {}),
          }}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchpriority={eager ? "high" : "low"}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      {/* Fallback image if original fails */}
      {hasError && (
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
          style={{
            display: "block",
            opacity: 1,
            ...(style || {}),
          }}
          loading="eager"
          decoding="async"
          fetchpriority="low"
        />
      )}
    </div>
  );
};

export default ImageWithLoader;
