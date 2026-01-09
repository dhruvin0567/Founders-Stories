import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import FounderCard from "../FounderCard/FounderCard";
import ImageWithLoader from "../Common/ImageWithLoader";

const SingleCollectionTemplate = ({ founder }) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      easing: "ease-out",
      offset: 200,
    });

    const timeout = setTimeout(() => {
      AOS.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const contentSections = [
    founder.content?.journey,
    founder.content?.need,
    founder.content?.team,
    founder.content?.advice,
    founder.content?.future,
    founder.content?.community,
    founder.content?.updates,
    founder.content?.life,
    founder.content?.reward,
  ].filter(Boolean);

  // Get quote from content or use a default
  const quote =
    founder.content?.quote ||
    founder.content?.advice?.content ||
    "Working together, sharing knowledge, and moving forward as a community creates far more value than trying to outdo each other.";

  return (
    <div className="single-collection-page">
      {/* Hero Section with Gradient Card */}
      <section className="collection-hero-section">
        <div className="container">
          <div className="collection-hero-card" data-aos="fade-up">
            <div className="collection-hero-content">
              <div className="collection-hero-left">
                <div className="collection-hero-image-wrapper">
                  <ImageWithLoader
                    src={founder.profileImage}
                    alt={founder.name}
                    className="collection-hero-image"
                    placeholderHeight={200}
                    placeholderWidth="200px"
                    eager={true}
                  />
                </div>
              </div>
              <div className="collection-hero-right">
                <div className="collection-quote-icon">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                  </svg>
                </div>
                <blockquote className="collection-quote text-black">
                  {quote}
                </blockquote>
                <div className="collection-quote-attribution">
                  <div className="collection-quote-name">{founder.name}</div>
                  <div className="collection-quote-title ">
                    {founder.jobTitle} of {founder.company}
                  </div>
                </div>
              </div>
            </div>
            <div className="collection-hero-decorations">
              <div className="hero-shape hero-shape-1"></div>
              <div className="hero-shape hero-shape-2"></div>
              <div className="hero-shape hero-shape-3"></div>
              <div className="hero-shape hero-shape-4"></div>
              <div className="hero-shape hero-shape-5"></div>
            </div>
            <div className="collection-hero-logo">
              <span className="hero-logo-text">FS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="collection-content-section">
        <div className="container">
          {/* Title and Metadata */}
          <div className="collection-title-section">
            <div className="collection-header" data-aos="fade-up">
              <h1 className="collection-title">
                {founder.name}, {founder.jobTitle} of {founder.company}
              </h1>
              <div className="collection-meta">
                <span className="collection-date">{founder.date}</span>
                <span className="collection-separator">/</span>
                <span className="collection-category">{founder.category}</span>
                <span className="collection-separator">/</span>
                <span className="collection-comments">0 comments</span>
              </div>
            </div>
          </div>

          {/* Introduction */}
          {founder.content?.introduction && (
            <div
              className="collection-intro"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="container">
                <p className="collection-intro-text">
                  {founder.content.introduction}
                </p>
              </div>
            </div>
          )}

          {/* Content Sections */}
          {contentSections.length > 0 && (
            <div className="collection-content-wrapper">
              <div className="container">
                <div className="collection-sections">
                  {contentSections.map((section, index) => (
                    <div
                      key={index}
                      className="collection-section"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      {section.title && (
                        <h2 className="collection-section-title">
                          {section.title}
                        </h2>
                      )}
                      {section.content && (
                        <div className="collection-section-content">
                          {typeof section.content === "string" ? (
                            <p>{section.content}</p>
                          ) : (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: section.content,
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Connect Section */}
          {founder.content?.connect && (
            <div className="collection-connect-section" data-aos="fade-up">
              <div className="container">
                <h2 className="collection-section-title">
                  {founder.content.connect.title}
                </h2>
                <p className="collection-connect-text">
                  {founder.content.connect.content}
                </p>
                {founder.content.connect.links && (
                  <div className="collection-connect-links">
                    {founder.content.connect.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="collection-connect-link"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Posts */}
      {founder.relatedPosts && founder.relatedPosts.length > 0 && (
        <section className="collection-related-section" data-aos="fade-up">
          <div className="container">
            <h2 className="collection-related-title">Related Posts</h2>
            <div className="founders-grid">
              {founder.relatedPosts.map((post) => (
                <FounderCard
                  key={post.id}
                  name={post.name}
                  profileImage={post.profileImage}
                  jobTitle={post.jobTitle}
                  company={post.company}
                  description={post.description}
                  tags={post.tags}
                  badges={post.badges}
                  slug={post.slug}
                  onReadMore={() => navigate(`/collections/${post.slug}`)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SingleCollectionTemplate;
