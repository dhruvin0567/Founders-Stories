import React, { useEffect, useState } from "react";
import BlogCard from "../../Components/BlogCard/BlogCard";
import axios from "axios";

const Card = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
  };

  const filteredBlogs = selectedCategory
    ? data.filter((item) => item.categories.includes(selectedCategory))
    : data;

  return (
    <>
      <div className="tag-container container">
        {!selectedCategory && <h3 className="card-title">All Articles</h3>}

        <div className="row">
          {filteredBlogs.map((item, index) => (
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

        <div class="custom-pagination-wrapper">
          <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
              <li class="page-item disabled">
                <a class="page-link" href="#">
                  ← Previous
                </a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  Next →
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Card;
