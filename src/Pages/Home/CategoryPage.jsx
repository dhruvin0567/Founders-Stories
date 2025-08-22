import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BlogCard from "../../Components/BlogCard/BlogCard";
import Pagination from "../../Components/Common/Pagination";
import axios from "axios";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Common/Loader";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  const selectedCategoryDisplayName = location?.state?.categoryName || null;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const blogsPerPage = 6;

  const fetchCategoryIdBySlug = async (slug) => {
    if (!slug) return null;
    try {
      const { data } = await axios.get(
        `https://founderstories.org/wp-json/wp/v2/categories?slug=${encodeURIComponent(
          slug
        )}`
      );
      if (Array.isArray(data) && data.length > 0) {
        return data[0].id;
      }
      return null;
    } catch (error) {
      console.error("Error fetching category by slug:", error);
      return null;
    }
  };

  const mapPosts = (items) => {
    return items.map((item) => {
      const media = item._embedded?.["wp:featuredmedia"]?.[0];
      const sizes = media?.media_details?.sizes;

      return {
        id: item.id,
        slug: item.slug,
        blogImg:
          sizes?.medium?.source_url ||
          sizes?.thumbnail?.source_url ||
          media?.source_url ||
          "https://via.placeholder.com/600x400",
        blogDate: new Date(item.date).toLocaleDateString(),
        blogTitle: item.title?.rendered || "",
        blogDescription: (item.excerpt?.rendered || "").replace(/<[^>]+>/g, ""),
        categories:
          item._embedded?.["wp:term"]?.[0]?.map((cat) => cat.name) || [],
      };
    });
  };

  const fetchPostsForCategory = async (slug, page) => {
    setIsLoading(true);
    try {
      const categoryId = await fetchCategoryIdBySlug(slug);
      if (!categoryId) {
        setData([]);
        setTotalPages(1);
        setIsLoading(false);
        return;
      }

      const response = await axios.get(
        `https://founderstories.org/wp-json/wp/v2/posts`,
        {
          params: {
            per_page: blogsPerPage,
            page,
            _embed: true,
            categories: categoryId,
          },
          validateStatus: (status) => status >= 200 && status < 500,
        }
      );

      if (response.status === 400 && page > 1) {
        const headerTotal = parseInt(
          response.headers?.["x-wp-totalpages"] || "1",
          10
        );
        setTotalPages(Number.isNaN(headerTotal) ? 1 : headerTotal);
        setCurrentPage(Number.isNaN(headerTotal) ? 1 : headerTotal);
        setIsLoading(false);
        return;
      }

      const items = Array.isArray(response.data) ? response.data : [];
      setData(mapPosts(items));

      const headerTotal = parseInt(
        response.headers?.["x-wp-totalpages"] || "1",
        10
      );
      setTotalPages(Number.isNaN(headerTotal) ? 1 : headerTotal);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setData([]);
      setTotalPages(1);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      const cached = localStorage.getItem("fs_posts_cache_v1");
      if (cached) {
        const parsed = JSON.parse(cached);
        const items = Array.isArray(parsed?.items) ? parsed.items : [];
        if (items.length) {
          if (selectedCategoryDisplayName) {
            const filtered = items.filter((item) =>
              Array.isArray(item.categories)
                ? item.categories.includes(selectedCategoryDisplayName)
                : false
            );
            if (filtered.length) {
              setData(filtered);
              setTotalPages(
                Math.max(1, Math.ceil(filtered.length / blogsPerPage))
              );
              setIsLoading(false);
            }
          }
        }
      }
    } catch (_) {}
  }, [categoryName, selectedCategoryDisplayName]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryName]);

  useEffect(() => {
    fetchPostsForCategory(categoryName, currentPage);
  }, [categoryName, currentPage]);

  const currentBlogs = data;

  return (
    <div className="custom-blog-main-container container">
      {!isLoading && currentBlogs[0] && (
        <Helmet>
          <link rel="preload" as="image" href={currentBlogs[0].blogImg} />
        </Helmet>
      )}

      <div className="row mt-4">
        {isLoading ? (
          <div
            className="col-12"
            style={{ textAlign: "center", padding: "40px 0" }}
          >
            <Loader />
          </div>
        ) : currentBlogs.length > 0 ? (
          currentBlogs.map((item, index) => (
            <BlogCard
              key={item.id}
              slug={item.slug}
              blogImg={item.blogImg}
              blogDate={item.blogDate}
              blogTitle={item.blogTitle}
              blogDescription={item.blogDescription}
              categories={item.categories}
              delay={0}
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
