import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

export default function Breadcrumb() {
  const location = useLocation();

  // URL-i '/' ilə ayırırıq, və path-ləri saxlamaq üçün
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Breadcrumb-lar üçün başlıqlar
  const breadcrumbTitles = {
    cosmetics: "Kosmetika",
    uzcosmetics: "ÜZ üçün Kosmetika",
    eyecosmetics: "GÖZ üçün Kosmetika",
    lipcosmetics: "DODAQ üçün Kosmetika",
    aksesuar: "Aksessuarlar",
  };

  // Kosmetika səhifəsindən sonra gələn alt səhifələr
  const handlePathnames = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
    const isLast = index === pathnames.length - 1;
    const title = breadcrumbTitles[value];

    if (title) {
      return (
        <React.Fragment key={to}>
          <FaAngleRight className="w-5 h-5 text-gray-600" />
          <li>
            <Link
              to={to}
              className={`cursor-pointer hover:bg-[#E8DAEF] hover:text-black p-4 rounded-md ${
                isLast ? "bg-[#b572d6] text-white" : ""
              }`}
            >
              {title}
            </Link>
          </li>
        </React.Fragment>
      );
    }
    return null; // Title tapılmırsa heç bir şey göstərmə
  });

  return (
    <div className="bg-white container lg:max-w-[1024px] mx-auto p-3">
      <ul className="flex items-center border p-2 gap-4 text-xl text-[#2E4053]">
        {/* Home Link */}
        <li>
          <Link
            to="/basic"
            className="cursor-pointer hover:bg-[#E8DAEF] hover:text-black p-4 rounded-md"
          >
            Home Page
          </Link>
        </li>

        {/* Kosmetika və digərləri */}
        {handlePathnames}
      </ul>
    </div>
  );
}
