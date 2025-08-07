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
      const response = await axios.get("/data/SingleBlogData.json");
      const blog = response.data;

      if (blog.slug !== slug) {
        setError("Blog not found.");
      } else {
        setData(blog);
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
