import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Ramesh Kumar",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww",
    feedback:
      "Amazing shopping experience! The product quality is outstanding and the delivery was super fast. Highly recommended!",
  },
  {
    id: 2,
    name: "Anita Sharma",
    role: "Graphic Designer",
    image: "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww",
    feedback:
      "Absolutely love the variety of products available. The customer support team was very helpful and responsive.",
  },
  {
    id: 3,
    name: "Vikram Patel",
    role: "Entrepreneur",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ3fHx1c2VyJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    feedback:
      "Great deals and discounts! I have been shopping here for months and never been disappointed.",
  },
];

const Testimonial = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-center">
      <h2 className="text-4xl font-bold text-gray-800">What Our Customers Say</h2>
      <p className="text-gray-600 mt-2">Real feedback from our happy customers</p>
      <div className="grid md:grid-cols-3 gap-8 mt-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg border-1 border-zinc-200 shadow-lg text-center">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-30 h-30 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-600 italic">"{testimonial.feedback}"</p>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">{testimonial.name}</h3>
            <p className="text-gray-500">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
