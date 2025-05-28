import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeroSection = () => {
    const slides = [
        "https://mir-s3-cdn-cf.behance.net/project_modules/fs/aaaa2e90302069.5e1418901d0c0.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/fs/af526290302069.5e1418901d80c.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/fs/7a9a4690302069.5e1418901c855.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/source/f55f0690302069.5e1418901e04e.jpg"
    ];

    return (
        <div className="w-full">
            <Swiper
                loop={true}  
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full"
            >
                {slides.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="w-full h-40 lg:h-full">
                            <img 
                                src={image} 
                                alt={`Slide ${index + 1}`} 
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSection;
