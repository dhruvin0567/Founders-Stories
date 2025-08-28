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

  const fetchCategoryIdBySlug = async (slug) => {
    if (!slug) return null;
    try {
      const { data } = await axios.get(
        `https://founderstories.org/wp-json/wp/v2/categories?slug=${encodeURIComponent(
          slug
        )}`
      );
      return Array.isArray(data) && data[0] ? data[0].id : null;
    } catch (error) {
      console.error("Error fetching category by slug:", error);
      return null;
    }
  };

  const fetchPostsForCategory = async (slug, page, background = false) => {
    if (!background) setIsLoading(true);

    try {
      const categoryId = await fetchCategoryIdBySlug(slug);
      if (!categoryId) {
        if (!background) {
          setData([]);
          setTotalPages(1);
          setIsLoading(false);
        }
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

      const items = Array.isArray(response.data) ? mapPosts(response.data) : [];

      setData(items);
      const headerTotal = parseInt(
        response.headers?.["x-wp-totalpages"] || "1",
        10
      );
      setTotalPages(Number.isNaN(headerTotal) ? 1 : headerTotal);

      localStorage.setItem(
        `fs_cache_${slug}`,
        JSON.stringify({ items, page, total: headerTotal, time: Date.now() })
      );
    } catch (error) {
      console.error("Error fetching posts:", error);
      if (!background) {
        setData([]);
        setTotalPages(1);
      }
    }

    if (!background) setIsLoading(false);
  };

  useEffect(() => {
    const cached = localStorage.getItem(`fs_cache_${categoryName}`);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.items) && parsed.items.length) {
          setData(parsed.items);
          setTotalPages(parsed.total || 1);
          setIsLoading(false);
        }
      } catch {}
    }

    fetchPostsForCategory(categoryName, currentPage, true);
  }, [categoryName, currentPage]);

  const currentBlogs = useMemo(() => data, [data]);
  const preloadImage = useMemo(
    () => currentBlogs[0]?.blogImg || null,
    [currentBlogs]
  );

  return (
    <div className="custom-blog-main-container container">
      {!isLoading && preloadImage && (
        <Helmet>
          <link rel="preload" as="image" href={preloadImage} />
        </Helmet>
      )}

      <div className="row mt-4">
        {isLoading && currentBlogs.length === 0 ? (
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
