import React, { useEffect, useMemo, useCallback, useState } from "react";
import BlogCard from "../../Components/BlogCard/BlogCard";
import Pagination from "../../Components/Common/Pagination";
import axios from "axios";

const Card = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const blogsPerPage = 6;

  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const fetchingData = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get(
        `https://founderstories.org/wp-json/wp/v2/posts?per_page=50&_embed`
      );

      const mappedData = response.data.map((item) => ({
        id: item.id,
        slug: item.slug,
        blogImg:
          item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "https://via.placeholder.com/600x400",
        blogDate: new Date(item.date).toLocaleDateString(),
        blogTitle: decodeHTML(item.title.rendered),
        blogDescription: decodeHTML(
          item.excerpt.rendered.replace(/<[^>]+>/g, "")
        ),
        categories:
          item._embedded?.["wp:term"]?.[0]?.map((cat) => cat.name) || [],
      }));

      setData(mappedData);

      try {
        localStorage.setItem(
          "fs_posts_cache_v1",
          JSON.stringify({
            ts: Date.now(),
            items: mappedData,
          })
        );
      } catch (_) {}
    } catch (error) {
      console.error("Error fetching WordPress posts:", error);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    try {
      const cached = localStorage.getItem("fs_posts_cache_v1");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.items?.length) {
          setData(parsed.items);
        }
      }
    } catch (_) {}

    fetchingData();
  }, []);

  const handleCategoryClick = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  const filteredBlogs = useMemo(() => {
    if (!selectedCategory) return data;
    return data.filter((item) => item.categories.includes(selectedCategory));
  }, [data, selectedCategory]);

  const currentBlogs = useMemo(() => {
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    return filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  }, [filteredBlogs, currentPage, blogsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredBlogs.length / blogsPerPage);
  }, [filteredBlogs.length, blogsPerPage]);

  useEffect(() => {
    if (!currentBlogs || currentBlogs.length === 0) return;

    const urls = currentBlogs.map((b) => b.blogImg).filter(Boolean);

    urls.forEach((url) => {
      const img = new Image();
      img.decoding = "async";
      img.loading = "eager";
      img.src = url;
    });

    const firstUrl = urls[0];
    if (firstUrl) {
      try {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = firstUrl;
        const exists = Array.from(
          document.head.querySelectorAll('link[rel="preload"][as="image"]')
        ).some((l) => l.href === link.href);
        if (!exists) {
          document.head.appendChild(link);
        }
      } catch (_) {}
    }
  }, [currentBlogs]);

  return (
    <div className="container custom-blog-main-container">
      {!selectedCategory && <h3 className="custom-main-title">All Articles</h3>}

      <div className="row">
        {currentBlogs.map((item, index) => (
          <BlogCard
            key={item.id}
            slug={item.slug}
            blogImg={item.blogImg}
            blogDate={item.blogDate}
            blogTitle={item.blogTitle}
            blogDescription={item.blogDescription}
            categories={item.categories}
            onCategoryClick={handleCategoryClick}
            delay={index * 100}
            isFirst={currentPage === 1 && index === 0}
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
