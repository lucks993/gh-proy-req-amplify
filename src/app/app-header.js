import React, { useState } from "react";
import "./app-header.scss";
import { logoutAction } from "../authentication/auth-actions";
import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar
} from "carbon-components-react/lib/components/UIShell";

import { useDispatch, useSelector } from "react-redux";
import Power32 from "@carbon/icons-react/lib/power/20";

import { ReactComponent as User } from "../assets/user.svg";

const AppHeader = ({ titulo, setSideNav }) => {
  const dispatch = useDispatch();
  const logout = () => dispatch(logoutAction());

  const user = useSelector((state) => state.auth.user);
  const [showSide, setShowSide] = useState(false);

  const onClickSideResponsive = () => {
    if (!showSide) {
      setSideNav("bx--side-nav--active");
      setShowSide(true);
    } else {
      setSideNav("");
      setShowSide(false);
    }
  };

  return (
    <Header aria-label="Header">
      <HeaderName prefix="">{titulo}</HeaderName>

      <HeaderGlobalBar>
        {user ? (
          <HeaderGlobalAction aria-label="User">
            <User />
          </HeaderGlobalAction>
        ) : null}
        {user ? <p className="username">{user.name}</p> : null}
        {user ? (
          <HeaderGlobalAction aria-label="Logout" onClick={logout}>
            <Power32 />
          </HeaderGlobalAction>
        ) : null}
      </HeaderGlobalBar>
    </Header>
  );
};
export default AppHeader;
