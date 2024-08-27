import { HiX } from "react-icons/hi";
import Menu from "./Menu";

export default function SideMenu({ sideMenuOpen, setSideMenuOpen }) {
  const handleCloseMenu = () => {
    setSideMenuOpen(false);
  };

  return (
    <>
      <div
        className={`bg-white fixed top-0 w-[260px] h-full p-6 pt-12 z-30 transition-all duration-300 ${
          sideMenuOpen ? "right-0" : "right-[-100%]"
        }`}
      >
        <button onClick={handleCloseMenu} className="absolute top-3 right-3">
          <HiX />
        </button>
        <Menu />
      </div>
      <div
        onClick={handleCloseMenu}
        className={`bg-black/50 fixed w-full h-full inset-0 ${
          sideMenuOpen
            ? "opacity-100 z-20 pointer-events-auto"
            : "opacity-0 -z-20 pointer-events-none"
        }`}
      ></div>
    </>
  );
}
