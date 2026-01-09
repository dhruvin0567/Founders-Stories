import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../Components/SEO/SEO";
import FounderCard from "../../Components/FounderCard/FounderCard";

// Sample founder data - replace with actual data from API
const foundersData = [
  {
    id: 1,
    name: "Sagar Patel",
    profileImage: "https://i.pravatar.cc/150?img=1",
    location: "Ahmedabad, India",
    jobTitle: "Founder",
    company: "ProductLift",
    website: "productlift.com",
    description:
      "Passionate about building innovative products that solve real-world problems. With years of experience in product development and a keen eye for user experience.",
    tags: ["Product", "Startup"],
    badges: [],
    slug: "sagar-patel",
  },
  {
    id: 2,
    name: "Shruti Sharma",
    profileImage: "https://i.pravatar.cc/150?img=5",
    location: "Mumbai, India",
    jobTitle: "Co-founder",
    company: "AutoMode",
    website: "automode.io",
    description:
      "Tech enthusiast and serial entrepreneur focused on automation and AI solutions. Leading teams to build scalable products that transform industries.",
    tags: ["Product", "Leadership"],
    badges: ["Top"],
    slug: "shruti-sharma",
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    profileImage: "https://i.pravatar.cc/150?img=12",
    location: "Bangalore, India",
    jobTitle: "Founder",
    company: "TechVentures",
    website: "techventures.com",
    description:
      "Visionary leader in the startup ecosystem, helping early-stage companies grow through strategic planning and innovative business models.",
    tags: ["Startup", "Strategy"],
    badges: ["New"],
    slug: "rajesh-kumar",
  },
  {
    id: 4,
    name: "Priya Mehta",
    profileImage: "https://i.pravatar.cc/150?img=9",
    location: "Delhi, India",
    jobTitle: "CEO",
    company: "InnovateLab",
    website: "innovatelab.com",
    description:
      "Dedicated to fostering innovation and building high-performing teams. Expert in scaling businesses and creating sustainable growth strategies.",
    tags: ["Leadership", "Strategy"],
    badges: ["Top", "New"],
    slug: "priya-mehta",
  },
  {
    id: 5,
    name: "Amit Singh",
    profileImage: "https://i.pravatar.cc/150?img=15",
    location: "Pune, India",
    jobTitle: "Founder",
    company: "DataFlow",
    website: "dataflow.io",
    description:
      "Data-driven entrepreneur specializing in analytics and business intelligence. Building tools that help companies make better decisions.",
    tags: ["Product"],
    badges: [],
    slug: "amit-singh",
  },
  {
    id: 6,
    name: "Neha Patel",
    profileImage: "https://i.pravatar.cc/150?img=20",
    location: "Hyderabad, India",
    jobTitle: "Co-founder",
    company: "CloudScale",
    website: "cloudscale.com",
    description:
      "Cloud infrastructure expert passionate about scalable solutions. Helping businesses leverage modern technology for competitive advantage.",
    tags: ["Startup", "Product"],
    badges: ["Top"],
    slug: "neha-patel",
  },
  {
    id: 7,
    name: "Vikram Shah",
    profileImage: "https://i.pravatar.cc/150?img=33",
    location: "Chennai, India",
    jobTitle: "Founder",
    company: "DevOps Pro",
    website: "devopspro.com",
    description:
      "DevOps specialist and tech leader focused on streamlining development processes. Building tools that enable faster, more reliable deployments.",
    tags: ["Leadership"],
    badges: [],
    slug: "vikram-shah",
  },
  {
    id: 8,
    name: "Anjali Desai",
    profileImage: "https://i.pravatar.cc/150?img=47",
    location: "Kolkata, India",
    jobTitle: "CEO",
    company: "FinTech Solutions",
    website: "fintechsolutions.com",
    description:
      "Financial technology innovator with a mission to democratize access to financial services. Creating solutions that empower individuals and businesses.",
    tags: ["Strategy", "Leadership"],
    badges: ["New"],
    slug: "anjali-desai",
  },
  {
    id: 9,
    name: "Rohit Gupta",
    profileImage: "https://i.pravatar.cc/150?img=52",
    location: "Jaipur, India",
    jobTitle: "Founder",
    company: "EcoTech",
    website: "ecotech.com",
    description:
      "Environmental tech advocate building sustainable solutions for a better future. Combining technology with environmental consciousness.",
    tags: ["Product", "Startup"],
    badges: [],
    slug: "rohit-gupta",
  },
];

const Collections = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const navigate = useNavigate();

  const filters = ["All", "Product", "Startup", "Leadership", "Strategy"];

  const filteredFounders = useMemo(() => {
    if (selectedFilter === "All") {
      return foundersData;
    }
    return foundersData.filter((founder) =>
      founder.tags.includes(selectedFilter)
    );
  }, [selectedFilter]);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const handleReadMore = (slug) => {
    // Navigate to founder detail page
    navigate(`/collections/${slug}`);
  };

  return (
    <>
      <SEO
        title="Meet the Founders | Founder Stories"
        description="Explore inspiring stories from founders around the world. Meet entrepreneurs who are building innovative products and leading successful startups."
      />
      <div className="collections-page-container">
        <div className="container">
          {/* Page Title */}
          <div className="collections-header">
            <h1 className="collections-title">Meet the Founders</h1>
          </div>

          {/* Filter Buttons */}
          <div className="collections-filters">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`filter-button ${
                  selectedFilter === filter ? "active" : ""
                }`}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Founders Grid */}
          <div className="founders-grid">
            {filteredFounders.map((founder) => (
              <FounderCard
                key={founder.id}
                name={founder.name}
                profileImage={founder.profileImage}
                jobTitle={founder.jobTitle}
                company={founder.company}
                description={founder.description}
                tags={founder.tags}
                badges={founder.badges}
                slug={founder.slug}
                onReadMore={() => handleReadMore(founder.slug)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collections;
