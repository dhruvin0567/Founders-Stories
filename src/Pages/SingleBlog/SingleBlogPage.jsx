import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleBlogTemplate from "../../Components/SingleBlog/SingleBlogTemplate";
import SingleBlogTemplateTwo from "../../Components/SingleBlog/SingleBlogTemplateTwo";
import axios from "axios";

const SingleBlogTemplateWrapper = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const wpResponse = await axios.get(
        `https://founderstories.org/wp-json/wp/v2/posts?slug=${slug}&_embed`
      );

      if (wpResponse.data && wpResponse.data.length > 0) {
        const wpPost = wpResponse.data[0];

        const layoutType =
          wpPost.acf?.layoutType ||
          (wpPost.content.rendered.length > 3000 ? "blog2" : "blog1");

        const categories =
          wpPost._embedded?.["wp:term"]
            ?.flat()
            .filter((term) => term.taxonomy === "category")
            .map((c) => ({
              name: c.name,
              slug: c.slug,
            })) || [];

        setData({
          blogTitle: wpPost.title.rendered,
          blogImg:
            wpPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
          blogDate: new Date(wpPost.date).toLocaleDateString(),
          blogDescription: wpPost.excerpt.rendered,
          blogData: wpPost.content.rendered,
          tabsData: [
            {
              id: "section-1",
              title: "Content",
              content: wpPost.content.rendered,
            },
          ],
          authors: [
            {
              name: wpPost._embedded?.author?.[0]?.name || "Unknown Author",
              image:
                wpPost._embedded?.author?.[0]?.avatar_urls?.["96"] ||
                "https://secure.gravatar.com/avatar/?s=100&d=mm&r=g",
              description: "<p>Author of this blog post.</p>",
            },
          ],
          categories,
          layoutType,
        });
      } else {
        setError("Blog not found.");
      }
    } catch (err) {
      console.error("Error fetching WordPress post:", err);
      setError("An error occurred while loading the blog.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  if (error) return <div>{error}</div>;
  if (!data) return <div>Loading blog...</div>;

  return data.layoutType === "blog2" ? (
    <SingleBlogTemplateTwo
      blogTitle={data.blogTitle}
      blogImg={data.blogImg}
      blogDate={data.blogDate}
      blogData={data.blogData}
      categories={data.categories}
    />
  ) : (
    <SingleBlogTemplate
      blogTitle={data.blogTitle}
      blogmainImage={data.blogImg}
      blogImageDescription={data.blogDescription}
      tabsData={data.tabsData}
      authors={data.authors}
      blogDescription={data.blogDescription}
      categories={data.categories}
    />
  );
};

export default SingleBlogTemplateWrapper;
