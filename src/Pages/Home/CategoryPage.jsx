import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogCard from "../../Components/BlogCard/BlogCard";
import ImageWithLoader from "../../Components/Common/ImageWithLoader";
import Pagination from "../../Components/Common/Pagination";
import axios from "axios";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const fetchingData = async () => {
    try {
      const response = await axios.get("/data/blogCard.json");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatCategoryName = (slug) => {
    if (!slug) return "";
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    fetchingData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryName]);

  const filteredBlogs = data.filter((item) =>
    item.categories.some(
      (category) =>
        category.toLowerCase().replace(/\s+/g, "-") ===
        categoryName.toLowerCase()
    )
  );

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="custom-blog-main-container container">
      {/* Dynamic heading */}
      <h3 className="custom-main-title">
        {categoryName ? `${formatCategoryName(categoryName)}` : "All Articles"}
      </h3>

      <div className="row">
        {currentBlogs.length > 0 ? (
          currentBlogs.map((item, index) => (
            <BlogCard
              key={item.id}
              slug={item.slug}
              blogImg={item.blogImg}
              blogDate={item.blogDate}
              blogTitle={item.blogTitle}
              blogDescription={item.blogDescription}
              categories={item.categories}
              delay={index * 100}
              isFirst={index === 0}
            />
          ))
        ) : (
          <p>No articles found for this category.</p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default CategoryPage;
