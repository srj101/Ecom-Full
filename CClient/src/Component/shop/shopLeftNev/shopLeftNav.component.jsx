import React, { useEffect, useState } from "react";
import "./shopLeftNav.style.css";
import { gql, useQuery } from "@apollo/client";
import { Menu } from "antd";
import { AppstoreOutlined, BgColorsOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const CATEGORIES = gql`
  query {
    categories {
      id
      catname
    }
  }
`;

function ShopLeftNav() {
  const dispatch = useDispatch();
  const [categors, setCategors] = useState([]);

  const { error, loading, data } = useQuery(CATEGORIES);
  const { SubMenu } = Menu;
  const catt = useSelector(({ term }) => term.cat);

  useEffect(() => {
    if (data) {
      setCategors(data);
    }
  }, [data]);

  const handleClick = (e) => {
    dispatch({ type: "CAT_TRIGGER", payload: e.target.innerHTML });
  };
  const handleColorClick = (e) => {
    dispatch({ type: "COLOR_TRIGGER", payload: e.target.innerHTML });
  };

  return (
    <div className="shopleftnav">
      <div className="catsection">
        <Link to="/shop">
          <AppstoreOutlined /> Categories
        </Link>
        <Menu mode="inline">
          {categors.categories?.map((cat) => (
            <Menu.Item key={cat.id}>
              <Link to={`/shop/${cat.catname}`} onClick={handleClick}>
                {cat.catname}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </div>
      <div className="colorsection">
        <Link to="/shop">
          <BgColorsOutlined /> Colors
        </Link>
        <Menu mode="inline">
          <Menu.Item keu="1" value="Red">
            <Link onClick={handleColorClick} to={`/shop/Red/`}>
              Red
            </Link>
          </Menu.Item>
          <Menu.Item keu="1" value="Black">
            <Link onClick={handleColorClick} to={`/shop/Black/`}>
              Black
            </Link>
          </Menu.Item>
          <Menu.Item keu="1" value="Brown">
            <Link onClick={handleColorClick} to={`/shop/Brown/`}>
              Brown
            </Link>
          </Menu.Item>
          <Menu.Item keu="1" value="Blue">
            <Link onClick={handleColorClick} to={`/shop/red/`}>
              Blue
            </Link>
          </Menu.Item>
          <Menu.Item keu="1" value="Purple">
            <Link onClick={handleColorClick} to={`/shop/Purple/`}>
              Purple
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default ShopLeftNav;
