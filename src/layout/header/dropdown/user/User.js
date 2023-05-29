import React, { useState } from "react";
import UserAvatar from "../../../../components/user/UserAvatar";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";

import { LinkList, LinkItem } from "../../../../components/links/Links";
import { axios, findUpper } from "../../../../utils/Utils";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

const User = () => {
  const { auth } = useAuth();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSignout = async () => {
    try {
      await axios.post("/auth/agency/logout");
      navigate("/auth-login", {
        replace: true,
        state: {
          from: {
            pathname: location.pathname,
          },
        },
      });
    } catch (err) {
      navigate("/auth-login", {
        replace: true,
        state: {
          from: {
            pathname: location.pathname,
          },
        },
      });
      console.log(err);
    }
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar image={auth?.image} text={findUpper(auth?.admin)} icon="user-alt" className="sm" />
          <div className="user-info d-none d-md-block">
            <div className="user-status">Administrator</div>
            <div className="user-name dropdown-indicator">{auth?.admin}</div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <UserAvatar image={auth?.image} text={findUpper(auth?.admin)} />
            </div>
            <div className="user-info">
              <span className="lead-text">{auth?.admin}</span>
              <span className="sub-text">{auth?.email}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/user-profile" icon="user-alt" onClick={toggle}>
              View Profile
            </LinkItem>
            <LinkItem link="/update-profile" icon="setting-alt" onClick={toggle}>
              Update Profile
            </LinkItem>
            {/* <LinkItem link="/user-profile-activity" icon="activity-alt" onClick={toggle}>
              Login Activity
            </LinkItem> */}
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem icon="signout" onClick={handleSignout}>
              Sign Out
            </LinkItem>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
