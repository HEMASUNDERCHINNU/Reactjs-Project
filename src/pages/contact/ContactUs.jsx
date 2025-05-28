
import React from "react";
import Layout from "../../components/layout/Layout";

const ContactUs = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-12 mt-25">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-950">Contact Us</h1>
          <p className="text-blue-950 mt-4 text-lg">We’d love to hear from you! Reach out with any questions or feedback.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-blue-950 mb-4">Get in Touch</h2>
            <p className="text-blue-950 text-lg">
              Our team is always ready to assist you. Whether you have questions about our products,
              need support, or just want to say hello, feel free to reach out!
            </p>
            <p className="text-blue-950 text-lg mt-4">
              <strong>Email:</strong> support@elitemart.com
            </p>
            <p className="text-blue-950 text-lg mt-2">
              <strong>Phone:</strong> +91 12345 67890
            </p>
            <p className="text-blue-950 text-lg mt-2">
              <strong>Address:</strong> 123 EliteMart St, Hyderabad City, 500083
            </p>
          </div>
          <div>
            <img
              src="https://www.researchgate.net/publication/327930833/figure/fig1/AS:675683210645504@1538106839183/General-location-map-Google-Maps-2010.png"
              alt="Contact Us"
              className="rounded-lg shadow-lg h-80 w-full"
            />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-blue-950 text-center mb-4">Send Us a Message</h2>
          <form className="max-w-3xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block text-blue-950 font-medium">Name</label>
              <input type="text" className="w-full mt-2 p-3 border rounded-lg" placeholder="Enter Your Name" required />
            </div>
            <div className="mb-4">
              <label className="block ttext-blue-950 font-medium">Email</label>
              <input type="email" className="w-full mt-2 p-3 border rounded-lg" placeholder="Enter Your Email" required />
            </div>
            <div className="mb-4">
              <label className="block text-blue-950 font-medium">Message</label>
              <textarea className="w-full mt-2 p-3 border rounded-lg" rows="4" placeholder="Enter Your Message" required></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-900">Send Message</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
