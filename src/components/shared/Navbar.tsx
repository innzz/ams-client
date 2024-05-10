import { Link, useLocation } from "react-router-dom";
import pages from "../../constants/pages";

const Navbar = () => {
    const location = useLocation();
    const activeTab = location.pathname;
  return (
    <nav className="bg-gray-100 p-4 shadow-md">
      <div className="flex gap-9 items-center justify-start container">
        <div className="flex-shrink-0">
          <img className="h-8" src="https://via.placeholder.com/150" alt="Logo" />
        </div>
        <ul className="flex space-x-8">
            {pages.map((page)=> <Link key={page.title} to={page.path} className={`text-black hover:text-gray-500 ${activeTab === page.path ? 'font-bold' : ''}`}>{page.title}</Link> )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;