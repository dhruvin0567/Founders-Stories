import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({
  navigationLink,
  blogImg,
  blogDate,
  blogTitle,
  blogDescription,
  categories = [],
}) => {
  const navigate = useNavigate();

  const handleTagClick = (category) => {
    const slug = category.toLowerCase().replace(/\s+/g, "-");
    navigate(`/category/${slug}`);
  };

  return (
    <div className="col-lg-4 col-sm-6 mb-3 custom-main-post">
      <div className="card border-0 custom-post-card h-100">
        <a href={navigationLink} className="blog-img-wrapper d-block">
          <img
            src={blogImg}
            className="card-img-top custom-blog-img"
            alt="Post Title"
          />
        </a>

        <div className="card-body px-0 custom-card-body">
          <p className="custom-post-meta mb-1">{blogDate}</p>

          <h5 className="custom-blog-title">
            <a href={navigationLink} className="stretched-link">
              {blogTitle}
            </a>
          </h5>

          <p className="card-text custom-post-text">{blogDescription}</p>

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
