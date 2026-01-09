import React from "react";
import { useNavigate } from "react-router-dom";
import ImageWithLoader from "../Common/ImageWithLoader";

const FounderCard = ({
  name,
  profileImage,
  jobTitle,
  company,
  description,
  tags = [],
  badges = [], // e.g., ["Top", "New"]
  onReadMore,
  slug,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (slug) {
      navigate(`/collections/${slug}`);
    }
  };

  return (
    <div className="founder-card-wrapper">
      <div 
        className="founder-card"
        onClick={handleNavigate}
        style={{ cursor: "pointer" }}
      >
        {/* Horizontal Top Section: Profile Image + Content */}
        <div className="founder-card-top-section">
          {/* Profile Image */}
          <div className="founder-card-avatar-wrapper">
            <ImageWithLoader
              src={profileImage || "https://via.placeholder.com/80"}
              alt={name}
              className="founder-card-avatar"
              placeholderHeight={80}
            />
          </div>

          {/* Content Section: Name, Badges, Job Title */}
          <div className="founder-card-content">
            <div className="founder-card-name-badges">
              <h3 className="founder-card-name">{name}</h3>
              {/* Badges positioned next to name */}
              {/* {badges.length > 0 && (
                <div className="founder-card-badges">
                  {badges.map((badge, index) => (
                    <span
                      key={index}
                      className={`founder-badge founder-badge-${badge.toLowerCase()}`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )} */}
            </div>

            {/* Job Title & Company */}
            {jobTitle && (
              <p className="founder-card-job-title">
                {jobTitle}
                {company && ` at ${company}`}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="founder-card-description-wrapper">
            <p className="founder-card-description">{description}</p>
            {onReadMore && (
              <button
                className="founder-card-description-arrow"
                onClick={(e) => {
                  e.stopPropagation();
                  onReadMore();
                }}
                aria-label="Read more"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Tags Section at Bottom */}
        {tags.length > 0 && (
          <div className="founder-card-tags">
            {tags.map((tag, index) => (
              <span key={index} className="founder-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Read More Arrow Button */}
        {/* {onReadMore && (
          <button className="founder-card-read-more-arrow" onClick={onReadMore} aria-label="Read more">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </button>
        )} */}
      </div>
    </div>
  );
};

export default FounderCard;
