import React from "react";
import "./breadcrumb.style.css";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { NavLink } from "react-router-dom";
function BreadCrumb({ title }) {
  const breadcrumbs = useBreadcrumbs();
  return (
    <div className="breadcrumb">
      <>
        <h3 className="bread-title">{title}</h3>
        <div className="bread-lins">
          {breadcrumbs.map(({ match, breadcrumb }) => (
            <span key={match.url}>
              <NavLink to={match.url}>
                <span id="slash">/</span>
                {breadcrumb}
              </NavLink>
            </span>
          ))}
        </div>
      </>
    </div>
  );
}

export default BreadCrumb;
