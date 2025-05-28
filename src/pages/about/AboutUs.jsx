import React from "react";
import Layout from "../../components/layout/Layout";

const AboutUs = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-12 mt-25">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">About Us</h1>
          <p className="text-gray-600 mt-4 text-lg">Discover our story, mission, and commitment to excellence.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Who We Are</h2>
            <p className="text-gray-600 text-lg">
              We are a dedicated team of professionals passionate about delivering the best shopping experience.
              Our mission is to bring top-quality products directly to you, ensuring satisfaction and convenience.
            </p>
            <p className="text-gray-600 text-lg mt-4">
              Since our inception, we have prioritized innovation and customer satisfaction, making us a trusted brand.
            </p>
          </div>
          <div>
            <img
              src="https://www.shutterstock.com/image-photo/male-mature-caucasian-ceo-businessman-260nw-2142010187.jpg"
              alt="About Us"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="https://www.shutterstock.com/image-photo/business-marketing-product-development-concepts-260nw-2541578885.jpg"
              alt="Our Mission"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg">
              We strive to create an ecosystem where quality, affordability, and efficiency converge.
              Our goal is to bridge the gap between customers and premium products through seamless shopping experiences.
            </p>
            <p className="text-gray-600 text-lg mt-4">
              With an unwavering focus on customer satisfaction, we continue to evolve and set new benchmarks in the industry.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <img src="https://cdn.vectorstock.com/i/1000v/01/26/premium-quality-badges-or-tag-vector-27820126.jpg" alt="Quality" className="mx-auto mb-4 h-40 w-full" />
              <h3 className="text-xl font-medium text-gray-800">Quality</h3>
              <p className="text-gray-600 mt-2 text-lg">We ensure excellence in every product and service we offer.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <img src="https://thumbs.dreamstime.com/b/customer-reviews-flat-vector-banner-template-happy-users-holding-golden-stars-cartoon-characters-customers-evaluating-performance-164724455.jpg" alt="Customer Focus" className="mx-auto mb-4 h-40 w-full" />
              <h3 className="text-xl font-medium text-gray-800">Customer Focus</h3>
              <p className="text-gray-600 mt-2 text-lg">Our customers are our top priority, and we go the extra mile for them.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <img src="https://imageio.forbes.com/specials-images/imageserve/6419b4476af64ebf89bdef19/0x0.jpg?format=jpg&height=600&width=1200&fit=bounds" alt="Innovation" className="mx-auto mb-4 h-40 w-full" />
              <h3 className="text-xl font-medium text-gray-800">Innovation</h3>
              <p className="text-gray-600 mt-2 text-lg">We continuously innovate to bring you the latest and best solutions.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;