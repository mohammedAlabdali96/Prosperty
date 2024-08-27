import Link from "next/link";
import { useTranslations } from "next-intl";
import { Link as NavLink } from "@/navigation";

export default function Menu({ scrolled }) {
  const t = useTranslations("menu");
  return (
    <ul
      className={`space-y-6 md:space-y-0 md:flex md:gap-8 ${
        scrolled ? "md:text-black" : "md:text-white"
      }`}
    >
      <li>
        <NavLink href="/">{t("homepage")}</NavLink>
      </li>
      <li>
        <NavLink href="/listings">{t("listings")}</NavLink>
      </li>
      <li>
        <NavLink href="/agents">{t("agents")}</NavLink>
      </li>
      <li>
        <NavLink href="/my-favorites">{t("myFavorites")}</NavLink>
      </li>
      <li>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            EN
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 text-black rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <Link href="/en">English</Link>
            </li>
            <li>
              <Link href="/id">Indonesia</Link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  );
}
