import React from "react";
import { useNavigate } from "react-router";

const category = [
  {
    image:
      "https://cdn-icons-png.freepik.com/256/7417/7417708.png?ga=GA1.1.458429582.1738823084&semt=ais_hybrid",
    name: "Fashion",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/12114/12114279.png",
    name: "Appliances",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/7648/7648246.png",
    name: "Mobiles",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/2620/2620993.png", 
    name: "Electronics",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/10686/10686553.png",
    name: "Shoes",
  },
   {
    image: "https://cdn-icons-png.flaticon.com/512/1426/1426749.png", 
    name: "Home & Furniture",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/11946/11946316.png",
    name: "Books",
  },
];

const Category = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col mt-35 mb-8">
        <div className="flex overflow-x-scroll lg:justify-center hide-scroll-bar">
          <div className="flex ">
            {category.map((item, index) => {
              return (
                <div key={index} className="px-3 lg:px-10">
                  <div
                    onClick={() => navigate(`/category/${item.name}`)}
                    className="w-20 h-20 lg:w-25 lg:h-25 max-w-xs rounded-full transition-all cursor-pointer mb-1"
                  >
                    <div className="flex justify-center mb-12">
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </div>
                  </div>

                  <h1 className="text-sm lg:text-lg text-center font-medium title-font">
                    {item.name}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .hide-scroll-bar {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }
            .hide-scroll-bar::-webkit-scrollbar {
              display: none;  /* Chrome, Safari and Opera */
            }
          `,
        }}
      />
    </div>
  );
};

export default Category;
