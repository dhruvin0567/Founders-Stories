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
      // First try to fetch from the blog cards to find the matching slug
      const cardsResponse = await axios.get("/data/blogCard.json");
      const blogCards = cardsResponse.data;
      const matchingBlog = blogCards.find(blog => blog.slug === slug);
      
      if (!matchingBlog) {
        setError("Blog not found.");
        return;
      }
      
      let foundDetailedBlog = false;
      
      // Try to fetch from SingleBlogDataTwo.json first
      try {
        const detailResponseTwo = await axios.get("/data/SingleBlogDataTwo.json");
        const blogDetailsTwo = detailResponseTwo.data;
        const matchingBlogTwo = blogDetailsTwo.find(blog => blog.slug === slug);
        
        if (matchingBlogTwo) {
          setData({
            ...matchingBlogTwo,
            layoutType: matchingBlogTwo.layoutType || "blog2"
          });
          foundDetailedBlog = true;
          return;
        }
      } catch (error) {
        console.log("Error fetching or processing SingleBlogDataTwo.json:", error);
      }
      
      // Then try to fetch from the original SingleBlogData.json
      try {
        const detailResponse = await axios.get("/data/SingleBlogData.json");
        const blogDetail = detailResponse.data;
        
        // Use the detailed data if available
        if (blogDetail.slug === slug) {
          setData({
            ...blogDetail,
            layoutType: blogDetail.layoutType || "blog1"
          });
          foundDetailedBlog = true;
          return;
        }
      } catch (error) {
        console.log("Error fetching or processing SingleBlogData.json:", error);
      }
      
      // If no detailed blog was found, use the card data as fallback
      if (!foundDetailedBlog) {
        console.log("Using card data as fallback for slug:", slug);
        setData({
          ...matchingBlog,
          layoutType: "blog1",
          blogmainImage: matchingBlog.blogImg,
          blogImageDescription: matchingBlog.blogTitle,
          tabsData: [{
            id: "section-1",
            title: "Content",
            content: `<p>${matchingBlog.blogDescription || "No content available yet."}</p>`
          }],
          authors: [{
            name: matchingBlog.blogDate.split("•")[0].trim() || "Author",
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

  // Render the appropriate template based on layoutType
  return data.layoutType === "blog2" ? (
    <SingleBlogTemplateTwo
      blogTitle={data.blogTitle}
      blogImg={data.blogImg}
      blogDate={data.blogDate}
      blogData={data.blogData}
      categories={data.categories || []}
    />
  ) : (
    <SingleBlogTemplate
      blogTitle={data.blogTitle}
      blogmainImage={data.blogImg || data.blogmainImage}
      blogImageDescription={data.blogDescription}
      tabsData={data.tabsData || []}
      authors={data.authors || []}
      blogDescription={data.blogDescription}
    />
  );
};

export default SingleBlogTemplateWrapper;
