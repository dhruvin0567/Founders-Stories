import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleBlogTemplate from "../../Components/SingleBlog/SingleBlogTemplate";
import axios from "axios";

const SingleBlogTemplateWrapper = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      // First try to fetch from the blog cards to find the matching slug
      const cardsResponse = await axios.get("/data/blogCard.json");
      const blogCards = cardsResponse.data;
      const matchingBlog = blogCards.find(blog => blog.slug === slug);
      
      if (!matchingBlog) {
        setError("Blog not found.");
        return;
      }
      
      // Then fetch the detailed blog data
      const detailResponse = await axios.get("/data/SingleBlogData.json");
      const blogDetail = detailResponse.data;
      
      // Use the detailed data if available, otherwise use the card data
      if (blogDetail.slug === slug) {
        setData(blogDetail);
      } else {
        // Create a simplified version from the card data
        setData({
          ...matchingBlog,
          blogmainImage: matchingBlog.blogImg,
          blogImageDescription: matchingBlog.blogTitle,
          tabsData: [{
            id: "section-1",
            title: "Content",
            content: `<p>${matchingBlog.blogDescription || "No content available yet."}</p>`
          }],
          authors: [{
            name: matchingBlog.blogDate.split("•")[0].trim(),
            image: "https://secure.gravatar.com/avatar/d97ffcf90bb9c9ae049a82b7163961810b2838454e586767e79994bb5139eb96?s=100&d=mm&r=g",
            description: "<p>Author of this blog post.</p>"
          }]
        });
      }
    } catch (err) {
      console.error("Error fetching blog data:", err);
      setError("An error occurred while loading the blog.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  if (error) return <div>{error}</div>;
  if (!data) return <div>Loading blog...</div>;

  return (
    <SingleBlogTemplate
      blogTitle={data.blogTitle}
      blogmainImage={data.blogImg} // Assuming this is your main image
      blogImageDescription={data.blogDescription} // You can map as needed
      tabsData={data.tabsData || []} // default empty if tabsData doesn't exist
      authors={data.authors || []} // default empty if authors doesn't exist
      blogDescription={data.blogDescription}
    />
  );
};

export default SingleBlogTemplateWrapper;
