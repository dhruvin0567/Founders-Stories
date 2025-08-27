import React, { useEffect } from "react";
import AOS from "aos";

const SingleBlogTemplateTwo = ({
  blogTitle,
  blogImg,
  blogDate,
  blogData,
  categories = [],
}) => {
  useEffect(() => {
    AOS.init({
      once: false,
      duration: 1000,
      easing: "ease-in-out",
      offset: 200,
    });

    const timeout = setTimeout(() => {
      AOS.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* Blog Header */}
      <section className="">
        <div className="container custom-blog-main-container">
          {blogTitle && (
            <h1
              className="blog-title mb-4 mt-4"
              data-aos="fade-up"
              data-aos-offset="100"
            >
              {blogTitle}
            </h1>
          )}

          {blogImg && (
            <div
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-delay="200"
              className=""
            >
              {typeof blogImg === "string" ? (
                <img
                  className="hero fadeInUp img-fluid rounded"
                  src={blogImg}
                  loading="lazy"
                  alt={blogTitle}
                />
              ) : (
                blogImg
              )}
            </div>
          )}

          {blogDate && (
            <p
              className="text-muted"
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-delay="100"
            >
              {blogDate}
            </p>
          )}
        </div>
      </section>

      {/* Blog Content */}
      <section className="secondtemplate-section">
        <div className="container custom-blog-main-container">
          {blogData && (
            <div
              className="entry-content"
              data-aos="fade-up"
              data-aos-offset="100"
              dangerouslySetInnerHTML={{ __html: blogData }}
            />
          )}
        </div>
      </section>

      {/* Categories Footer */}
      {categories.length > 0 && (
        <section className="">
          <div className="container custom-blog-main-container">
            <div
              className="custom-tags mb-4"
              data-aos="fade-up"
              data-aos-offset="100"
            >
              <strong className="me-2">Categories: </strong>
              {categories.map((cat, index) => (
                <React.Fragment key={cat.id}>
                  <a href={cat.link} rel="category tag" className="me-2">
                    <span>{cat.name}</span>
                  </a>
                  {index < categories.length - 1 && ", "}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SingleBlogTemplateTwo;
