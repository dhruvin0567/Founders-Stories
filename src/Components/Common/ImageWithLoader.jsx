import React, { useState } from "react";

const ImageWithLoader = ({
  src,
  alt,
  className = "",
  eager = false,
  onClick,
  style,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const showLoader = !isLoaded || hasError;

  return (
    <div className="image-loader-wrapper" onClick={onClick}>
      {showLoader && (
        <div className="d-flex align-items-center justify-content-center image-loader-placeholder">
          <div className="spinner-border spinner-sm-custom" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Actual image (kept hidden until loaded) */}
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          display: isLoaded && !hasError ? "block" : "none",
          ...(style || {}),
        }}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchpriority={eager ? "high" : "auto"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default ImageWithLoader;
