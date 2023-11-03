import React, { useEffect } from "react";
import idashboard from "../../assets/icons/dashboard-icon.svg";
import icatgeories from "../../assets/icons/categories-icon.svg";
import itags from "../../assets/icons/tags-icon.svg";
import inewspaper from "../../assets/icons/newspaper-icon.svg";
import iwrite from "../../assets/icons/write-icon.svg";
import "./navigationMenu.scss";
import NavigationButtonComponent from "../NavigationButtonComponent";

function NavigationMenuComponent() {
  const menuItems = [
    {
      key: 0,
      text: "Dashboard",
      icon: idashboard,
      textColor: "#000",
      bgColor: "#fff",
      link: "/profile",
    },
    {
      key: 1,
      text: "Categories",
      icon: icatgeories,
      textColor: "#000",
      bgColor: "#fff",
      link: "/categories",
    },
    {
      key: 2,
      text: "Tags",
      icon: itags,
      textColor: "#000",
      bgColor: "#fff",
      link: "/tags",
    },
    {
      key: 3,
      text: "Tous les articles",
      icon: inewspaper,
      textColor: "#000",
      bgColor: "#fff",
      link: "/articles",
    },
    {
      key: 4,
      text: "Rédiger un article",
      icon: iwrite,
      textColor: "#000",
      bgColor: "#fff",
      link: "/new-post",
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  window.addEventListener("resize", () => {
    window.innerWidth > 900 ? setIsMenuOpen(true) : setIsMenuOpen(false);
  });
  useEffect(() => {
    window.innerWidth > 900 ? setIsMenuOpen(true) : setIsMenuOpen(false);
  }, []);

  return (
    <div className="navigation-menu">
      <div className="navigation-menu--buttons">
        {menuItems.map((item) => (
          <div className="navigation-menu--button" key={item.key}>
            <NavigationButtonComponent
              key={item.key}
              text={item.text}
              icon={item.icon}
              textColor={item.textColor}
              bgColor={item.bgColor}
              link={item.link}
              isMenuOpen={isMenuOpen}
            />
          </div>
        ))}
      </div>

      <div className="navigation-menu--profile">
        <img src="https://picsum.photos/200" alt="profile" />
        {isMenuOpen && (
          <div className="navigation-menu--profile--infos">
            <p style={{ fontWeight: "600" }}>Username</p>
            <p>Role@mail.com</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavigationMenuComponent;
