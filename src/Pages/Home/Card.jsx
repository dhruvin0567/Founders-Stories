import React, { useEffect, useState } from "react";
import BlogCard from "../../Components/BlogCard/BlogCard";
import Pagination from "../../Components/Common/Pagination";
import axios from "axios";

const Card = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
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

  useEffect(() => {
    fetchingData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const filteredBlogs = selectedCategory
    ? data.filter((item) => item.categories.includes(selectedCategory))
    : data;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="container custom-blog-main-container">
      {!selectedCategory && <h3 className="custom-main-title">All Articles</h3>}

      <div className="row">
        {currentBlogs.map((item, index) => (
          <BlogCard
            key={item.id}
            blogImg={item.blogImg}
            blogDate={item.blogDate}
            blogTitle={item.blogTitle}
            blogDescription={item.blogDescription}
            categories={item.categories}
            onCategoryClick={handleCategoryClick}
            delay={index * 100}
          />
        ))}
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

export default Card;
