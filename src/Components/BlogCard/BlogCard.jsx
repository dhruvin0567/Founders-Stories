import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const BlogCard = ({
  slug,
  blogImg,
  blogDate,
  blogTitle,
  blogDescription,
  categories = [],
  isFirst = false,
  delay = 0,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const handleNavigate = () => {
    if (slug) {
      navigate(`/blog/${slug}`);
    }
  };

  const handleTagClick = (category) => {
    const tagSlug = category.toLowerCase().replace(/\s+/g, "-");
    navigate(`/category/${tagSlug}`);
  };

  return (
    <div
      className="col-lg-4 col-sm-6 mb-4 custom-main-post"
      data-aos="fade-up"
      data-aos-offset="100"
      data-aos-delay={delay}
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
    >
      <div className="card border-0 custom-post-card h-100">
        {/* Blog Image Clickable */}
        <div
          className="blog-img-wrapper d-block overflow-hidden"
          onClick={handleNavigate}
          style={{ cursor: "pointer" }}
        >
          <img
            src={blogImg}
            className="card-img-top custom-blog-img transition-scale"
            alt={blogTitle}
            loading={isFirst ? "eager" : "lazy"}
          />
        </div>

        <div className="card-body px-0 custom-card-body">
          <p className="custom-post-meta mb-1">{blogDate}</p>

          {/* Blog Title Clickable */}
          <h5
            className="custom-blog-title mt-2 mb-3"
            onClick={handleNavigate}
            style={{ cursor: "pointer" }}
          >
            {blogTitle}
          </h5>

          <p className="card-text custom-post-text">{blogDescription}</p>

          {/* Blog Categories */}
          {categories.length > 0 && (
            <div className="custom-tags mt-2">
              {categories.map((category, index) => (
                <a
                  href="#"
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTagClick(category);
                  }}
                >
                  <span>{category}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
