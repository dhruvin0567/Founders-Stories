import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogCard from "../../Components/BlogCard/BlogCard";
import axios from "axios";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [data, setData] = useState([]);

  const fetchingData = async () => {
    try {
      const response = await axios.get("/data/blogCard.json");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const filteredBlogs = data.filter((item) =>
    item.categories.some(
      (category) =>
        category.toLowerCase().replace(/\s+/g, "-") ===
        categoryName.toLowerCase()
    )
  );

  return (
    <div className="tag-container container">
      <div className="row">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((item) => (
            <BlogCard
              key={item.id}
              blogImg={item.blogImg}
              blogDate={item.blogDate}
              blogTitle={item.blogTitle}
              blogDescription={item.blogDescription}
              categories={item.categories}
            />
          ))
        ) : (
          <p>No articles found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
