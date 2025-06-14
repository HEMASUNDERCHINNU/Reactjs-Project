import React from "react";
import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout";
import Testimonial from "../../components/testimonial/Testimonial";
import Track from '../../components/track/Track'

const Home = () => {

    return (
        <Layout>
            <Category />
            <HeroSection />
            <HomePageProductCard />
            <Track/>
            <Testimonial />
        </Layout>
    );
}

export default Home;