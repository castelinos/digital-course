import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import "../App.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface NavBarProps {
  brandName: string;
  imageSrcPath: string;
  navItems: string[];
}

function NavBar({ brandName, imageSrcPath, navItems }: NavBarProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedIndex, setSelectedIndex] = useState<Number>(-1);
  useEffect(() => {
    switch (selectedIndex) {
      case 0:
        navigate("/home");
        break;
      case 1:
        navigate("/lessons");
        break;
      case 2:
        navigate("/aboutus");
        break;

    }

  }, [selectedIndex])

  return (
    <nav className="navbar navbar-expand-md navbar-light navbackground shadow navbarHeight">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={imageSrcPath}
            width="60"
            height="60"
            className="d-inline-block align-center"
            alt=""
          />
          <span className="fw-bolder fs-4 title">{brandName}</span>
        </a>
        <div
          className="collapse
         navbar-collapse"
          id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-md-1">
            {navItems.map((items, index) => (
              <li
                key={items}
                className="nav-item"
                onClick={() => setSelectedIndex(index)}
              >
                <a
                  className={
                    selectedIndex == index
                      ? "nav-link active fw-bold"
                      : "nav-link"
                  }
                  href="#"
                >
                  {items}
                </a>
              </li>
            ))}
          </ul>
          <form className="d-flex me-3">
            <Avatar>
              <AvatarFallback>{user?.username}</AvatarFallback>
            </Avatar>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;