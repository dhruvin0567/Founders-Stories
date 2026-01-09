import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SingleCollectionTemplate from "../../Components/SingleCollection/SingleCollectionTemplate";
import SEO from "../../Components/SEO/SEO";
import Loader from "../../Components/Common/Loader";

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
    bannerImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop",
    date: "December 24, 2025",
    category: "Agencies",
    content: {
      quote: "Working together, sharing knowledge, and moving forward as a community creates far more value than trying to outdo each other.",
      introduction: "My name is Sagar Patel. I'm 27 years old and the founder of ProductLift, a brand created under my creative and digital studio. I've been active in the product development community for more than ten years and currently serve as a Product Team Lead, contributing directly to the development of innovative products.",
      journey: {
        title: "The Journey Began",
        content: "I started working with the web at a very young age. Around the age of eleven, I became fascinated by animated websites and wanted to understand how they actually worked. I taught myself HTML and CSS through online tutorials and built my first websites from scratch. When I started working on a small game review website, I quickly realised how inefficient it was to manage everything through static HTML files. That's when I discovered content management systems. Many of them felt overly complex at the time, but WordPress immediately stood out. It was simple, logical, and powerful at the same time."
      },
      need: {
        title: "The Need for ProductLift",
        content: "As my experience grew, I noticed a clear pattern in the product ecosystem. Most platforms, products, and tutorials are built for beginners. There is no shortage of entry-level content. But for developers, especially those working on serious projects, there are very few places that truly support them. Too often, developers are left alone with long documentation, workarounds, and trial-and-error solutions. Product projects rarely reach an enterprise-level setup. Instead, they often rely on stacking plugins to compensate for missing structure and architecture."
      },
      team: {
        title: "Myself with my Brilliant Team",
        content: "All of this is built under my creative and digital studio. This is where products, services, and long-term ideas are developed. It brings together client work, product development, and community involvement."
      },
      advice: {
        title: "Advice for Business Owners",
        content: "My most important advice is to focus on substance and think long-term. Technical quality, clean structures, and experience always pay off. Especially with products, it's worth investing early in solid foundations instead of dealing with technical debt later. It's equally important not to give up. Setbacks are part of the journey and often where the most valuable lessons come from. Progress takes time."
      },
      future: {
        title: "Product Development & Beyond",
        content: "I see product development remaining one of the most important aspects of business over the next five years. Its strength lies in its openness and its community. The real challenge is using products professionally and managing complexity without compromising quality."
      },
      community: {
        title: "My Love for the Community",
        content: "The product development community is a central part of my journey. I regularly attend conferences and meetups, especially in India. Contributor Days have shaped me both professionally and personally, and many strong connections and friendships started there."
      },
      updates: {
        title: "How I Keep Myself Updated",
        content: "I stay up to date through development discussions, Slack, GitHub, official documentation, and constant exchange with other contributors. Being close to core development helps me understand changes early and apply them in practice."
      },
      life: {
        title: "I Have a Life Other Than Work",
        content: "Balance is important to me. Travelling and photography help me gain new perspectives and clear my head. I also enjoy spending time alone in my garden, which is the perfect contrast to technical work. I love cooking and value creative moments away from the screen."
      },
      reward: {
        title: "I Reward Myself by",
        content: "I reward myself with travel and intentional time for myself. Stepping away from daily routines, discovering new places, and enjoying quiet moments helps me reflect and return to my work with a fresh perspective."
      },
      connect: {
        title: "Connect With Me",
        content: "The best way to reach me is via LinkedIn, My Website, or email. That said, personal conversations matter most to me. If you meet me at a conference or meetup, feel free to say hello. I'm always happy to connect.",
        links: [
          { label: "Website", url: `https://${"productlift.com"}` },
          { label: "LinkedIn", url: "https://linkedin.com/in/example" },
        ]
      }
    },
    relatedPosts: [
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
    ]
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
    bannerImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop",
    date: "October 6, 2025",
    category: "Agencies",
    content: {
      introduction: "My name is Shruti Sharma. I'm a co-founder of AutoMode, focused on automation and AI solutions.",
      journey: {
        title: "The Journey Began",
        content: "I started my journey in tech..."
      },
    },
    relatedPosts: []
  },
];

const SingleCollectionPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - replace with actual API call
    const fetchFounderData = () => {
      setLoading(true);
      setTimeout(() => {
        const founder = foundersData.find((f) => f.slug === slug);
        if (founder) {
          setData(founder);
        } else {
          setError("Founder not found.");
        }
        setLoading(false);
      }, 500);
    };

    fetchFounderData();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center mt-5 pt-5">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="founder-not-found-container">
        <div className="founder-not-found-content">
          <div className="founder-not-found-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className="founder-not-found-title">Founder Story Not Found</h1>
          <p className="founder-not-found-description">
            We couldn't find the founder story you're looking for. It may have been moved, removed, or the link might be incorrect.
          </p>
          <button
            className="founder-not-found-button"
            onClick={() => navigate("/collections")}
          >
            Explore All Founders
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <SEO
        title={`${data.name}, ${data.jobTitle} at ${data.company} | Founder Stories`}
        description={data.description}
      />
      <SingleCollectionTemplate founder={data} />
    </>
  );
};

export default SingleCollectionPage;
