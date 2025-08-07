import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const SingleBlogTemplate = ({
  blogTitle,
  blogDescription,
  blogmainImage,
  blogImageDescription,
  tabsData = [],
  authors = [],
}) => {
  const [activeTabId, setActiveTabId] = useState(tabsData[0]?.id || "");

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
      <section className="padding-md">
        <div className="container">
          {blogTitle && (
            <h1
              className="blog-title mb-4 mt-2"
              data-aos="fade-up"
              data-aos-offset="100"
            >
              {blogTitle}
            </h1>
          )}

          {blogDescription && (
            <p
              className="mb-lg-5 mb-4"
              data-aos="fade-up"
              data-aos-offset="100"
            >
              {blogDescription}
            </p>
          )}

          {blogmainImage && (
            <img
              data-aos="fade-up"
              data-aos-offset="100"
              className="hero fadeInUp"
              src={blogmainImage}
              loading="lazy"
              alt={blogImageDescription || blogTitle}
            />
          )}
        </div>
      </section>

      {/* Tabs and Tab Content */}
      {tabsData.length > 0 && (
        <section className="tabs-wrap">
          <div className="container">
            <div className="row row-gap-4">
              {/* Tabs */}
              <div className="col-lg-5" data-aos="custom-fade-right">
                <div className="tabs">
                  {tabsData.map((tab, index) => (
                    <a
                      key={index}
                      href={`#${tab.id}`}
                      className={activeTabId === tab.id ? "active" : ""}
                      onClick={() => setActiveTabId(tab.id)}
                    >
                      {tab.title}
                      <svg
                        width="30px"
                        height="30px"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#000000"
                          d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312L754.752 480z"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="col-lg-7" data-aos="custom-fade-left">
                <div className="tab-content">
                  {tabsData.map((tab, index) => (
                    <div className="tab-item" id={tab.id} key={index}>
                      <h2 className="">{tab.title}</h2>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: tab.content || "",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Author Section */}
      {authors.length > 0 && (
        <section className="py-5 bg-light rounded author-section">
          <div className="container">
            <div className="row gy-4">
              {authors.map((author, index) => (
                <div className="col-lg-6 col-12 mt-0" key={index}>
                  <div className="d-flex align-items-start gap-3">
                    {author.image && (
                      <img
                        className="author-img"
                        src={author.image}
                        loading="lazy"
                        alt={author.name}
                        width="100"
                        height="100"
                      />
                    )}
                    <div className="author-details-part">
                      <h5 className="my-2">
                        Author: <span className="primary">{author.name}</span>
                      </h5>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: author.description || "",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SingleBlogTemplate;
