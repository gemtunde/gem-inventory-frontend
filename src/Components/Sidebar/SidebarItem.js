import React, { useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import { NavLink } from "react-router-dom";

//activelinks
const activeSublink = ({ isActive }) => (isActive ? "active" : "link");
const activeLink = ({ isActive }) => (isActive ? "active" : "link");

const SidebarItem = ({ item, isOpen }) => {
  const [expanded, setExpanded] = useState(false);
  if (item.childrens) {
    return (
      <div
        className={
          expanded ? "sidebar-item s-parent open" : "sidebar-item s-parent"
        }
      >
        <div className="sidebar-title">
          <span>
            {item.icon && <div className="icon">{item.icon}</div>}
            {isOpen && <div>{item.title}</div>}
          </span>
          <AiOutlineArrowDown
            size={25}
            className="arrow-icon"
            onClick={() => setExpanded(!expanded)}
          />
        </div>
        {/* submenu */}
        <div className="sidebar-content">
          {item.childrens.map((child, index) => {
            return (
              <div key={index} className="s-child">
                <NavLink to={child.path} className={activeSublink}>
                  <div className="sidebar-item">
                    <div className="sidebar-title">
                      {child.icon && <div className="icon">{child.icon}</div>}
                      {isOpen && <div>{child.title}</div>}
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink to={item.path} className={activeLink}>
        <div className="sidebar-item s-parent">
          <div className="sidebar-title">
            <span>
              {item.icon && <div className="icon">{item.icon}</div>}
              {isOpen && <div>{item.title}</div>}
            </span>
          </div>
        </div>
      </NavLink>
    );
  }
};

export default SidebarItem;
