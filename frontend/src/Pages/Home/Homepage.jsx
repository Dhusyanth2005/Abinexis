import React from 'react';
import Header from '../../components/Header';
import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import AboutSection from './components/AboutSection';
import Footer from '../../components/Footer';
import TodayOfferShow from './components/TodayOfferShow';
import OfferCTASection from './components/OfferCtaSection';


const Homepage = () => {
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <HeroSection />
      <OfferCTASection />
      <CategoriesSection />
      <TodayOfferShow/>
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Homepage;