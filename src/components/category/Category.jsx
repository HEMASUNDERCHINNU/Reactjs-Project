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
        image: 'https://media-hosting.imagekit.io/a02018db888d46f5/video-chat_1702352.png?Expires=1833516637&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=tLetN5b3FmfgmsZLBjIwWGZap8U1GrhWunG0P8nZHls4CLf78bQ1vlavbAKQWYItmXwDtuBhVFvCaLk0rlYiRAa9wmEoUuf7p0Mnniq8guSVIRa-O4e3l3REFxAorGAHF90b~gD6LSzbi-aBFSsT9WbfEzJSjPJFtG9OIHK0dzQPEYgiVAhZtui8rBFyh-gLsthGWgr19DZd~EwupdFvhHhyXG1ztrerin1ovVIVdO-Oa63ovOw-ZpX5RSi9Wk7JZyZH0A1aBPWUNgm7HCEaegiBsUCjgKInoVCK2GmK5bOlSLDshjt7utQDgHs8E1TQu8zam2Hy3bGHeoVhjUpjag',
        name: 'Electronics'
    },
  {
    image: "https://cdn-icons-png.flaticon.com/256/10686/10686553.png",
    name: "Shoes",
  },
  {
    image:
      "https://media-hosting.imagekit.io//ce6ad3dfd5d14f14/home-furniture.png?Expires=1833516975&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=eX0UazQJyGm~fobYnd0qMsKJCVKJNxCSY0QlSHxGi5YdQFToTUKpHurvEH7P7UbZGTR4oET6bSvZwxE741buaIrbp22let-d~-~6l5ecZhCPrwKq0xdgjP6ReBbjIFvJKWhC0ohgP--04rP1wAKAOpy3n6O5AvVlUcv-5FH5x7XGSeqXRYvFUH1R0umEqgzzLJNtlbUqosbksB4J2je1WEnLTVdh3YpGnkdggJ~yJq2tUWbwPIGE7zjcxMde15q~ZSKQ3aUCIZXI~fzYzyl-Ihks9ZsXZHuVdbrzpMwO48j-WwYhbUnA52M0HHY2Ek~ZoroqueBzcKDuyYGugK9URA",
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
