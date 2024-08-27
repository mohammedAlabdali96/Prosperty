"use client";
import { useEffect, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import SideMenu from "./SideMenu";
import Menu from "./Menu";
import { Link } from "@/navigation";

export default function Header({ theme = "light" }) {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        if (theme === "dark") {
          setScrolled(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpenMenu = () => {
    setSideMenuOpen(true);
  };

  useEffect(() => {
    if (theme === "light") {
      setScrolled(true);
    }
  }, [theme]);

  // md: 768px
  // lg: 1024px
  // xl: 1280px

  return (
    <>
      <header
        className={`py-5 md:py-8 z-10 fixed top-0 left-0 w-full transition-all duration-300 ${
          scrolled ? "bg-white" : "bg-transparent"
        }`}
      >
        <div className="custom-container">
          <div className="flex items-center justify-between">
            <div className="w-[200px]">
              <Link href="/">
                {scrolled ? (
                  <img className="w-full" src="/assets/logo.svg" />
                ) : (
                  <img className="w-full" src="/assets/logo-white.svg" alt="" />
                )}
              </Link>
            </div>
            <button
              onClick={handleOpenMenu}
              className={`${scrolled ? "text-black" : "text-white"} md:hidden`}
            >
              <HiOutlineMenu size={25} />
            </button>
            <div className="hidden md:block">
              <Menu scrolled={scrolled} />
            </div>
          </div>
        </div>
      </header>
      <SideMenu sideMenuOpen={sideMenuOpen} setSideMenuOpen={setSideMenuOpen} />
    </>
  );
}
