import React, { useEffect, useRef, useState } from "react";

const ImageWithLoader = ({
  src,
  alt,
  className = "",
  eager = false,
  onClick,
  style,
  placeholderHeight = 200,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(eager);
  const containerRef = useRef(null);

  // Defer loading the image until it becomes visible
  useEffect(() => {
    if (eager) return; // load immediately for eager images
    if (isInView) return; // already in view

    const node = containerRef.current;
    if (!node) return;

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
            }
          });
        },
        { root: null, rootMargin: "200px", threshold: 0.01 }
      );
      observer.observe(node);
      return () => observer.disconnect();
    }

    // Fallback when IntersectionObserver is not supported
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => setIsInView(true))
      : setTimeout(() => setIsInView(true), 0);
    return () => {
      if (window.cancelIdleCallback && typeof id === "number") {
        window.cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };
  }, [eager, isInView]);

  const showLoader = !isLoaded || hasError;

  return (
    <div className="image-loader-wrapper" onClick={onClick} ref={containerRef}>
      {showLoader && (
        <div
          className="d-flex align-items-center justify-content-center image-loader-placeholder"
          style={{ height: placeholderHeight }}
        >
          <div className="spinner-border spinner-sm-custom" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Actual image (kept hidden until loaded) */}
      <img
        src={isInView || eager ? src : undefined}
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
