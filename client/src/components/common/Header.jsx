import React, { useState, useEffect } from "react";
import TopInfoBar from "../Header/TopInfoBar";
import MainNavigation from "../Header/MainNavigation";
import MobileMenu from "../Header/MobileMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isShowAuth, setIsShowAuth] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <TopInfoBar />
      <div
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
        }`}
      >
        <MainNavigation
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          setIsShowAuth={setIsShowAuth}
        />

        {isMenuOpen && <MobileMenu />}
      </div>
      {isShowAuth && <AuthModal setIsShowAuth={setIsShowAuth} />}
    </>
  );
};

export default Header;
