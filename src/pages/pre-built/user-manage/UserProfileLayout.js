import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import UserProfileRegularPage from "./UserProfileRegular";
import UserProfileSettingPage from "./UserProfileSetting";
import UserProfileNotificationPage from "./UserProfileNotification";
import UserProfileActivityPage from "./UserProfileActivity";
import { Route, Link, Routes, useLocation } from "react-router-dom";
import { Icon, UserAvatar } from "../../../components/Component";
import { findUpper } from "../../../utils/Utils";
import { Card, DropdownItem, DropdownMenu, DropdownToggle, Dropdown, Alert, Badge, Collapse } from "reactstrap";
import useAuth from "../../../hooks/useAuth";
import { useRef } from "react";
import { Helmet } from "react-helmet";
import Menu, { MenuHeading } from "../../../layout/menu/Menu";

const UserProfileLayout = () => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const dropDownRef = useRef(null);
  const [sm, updateSm] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [profileName, setProfileName] = useState(auth?.admin);
  const [imageAvatar, setImageAvatar] = useState(auth?.image);
  const [dropdownOpen, setDropdownOpen] = useState(auth?.image);
  const [withdrawType, setWithdrawType] = useState("mtn");
  const [withdrawAmounts, setWithdrawAmounts] = useState({
    mtn: 11.0,
    orange: 0,
    account: 11.0,
  });

  const [infoOpen, setInfoOpen] = useState("1");

  const [alertMessage, setAlertMessage] = useState(null);

  const agencyPersonalInfo = [
    {
      heading: "Account Info",
      subItems: [
        {
          label: "Agency",
          value: auth?.name,
        },
        {
          label: "Name",
          value: auth?.admin,
        },
        {
          label: "Email",
          value: auth?.email,
        },
        {
          label: "Contact",
          value: auth?.country_code + auth?.contact,
        },
      ],
    },
    {
      heading: "Address Info",
      subItems: [
        {
          label: "Country",
          value: auth?.country_name,
        },
        {
          label: "Region",
          value: auth?.region,
        },
        {
          label: "City",
          value: auth?.city,
        },
      ],
    },
  ];

  const AccountInfoitem = ({ infoItem }) => (
    <div>
      {infoItem?.heading && (
        <div className="account-info-heading">
          <MenuHeading heading={infoItem?.heading} />
        </div>
      )}
      <ul className="account-info text-primary-alt">
        {infoItem?.subItems?.map((item, i) => (
          <li className="account-info-item" key={item?.label + item?.value + i}>
            <span className="bold">{item?.label}:</span>
            <span>{item?.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  // function to change the design view under 990 px
  const viewChange = () => {
    if (window.innerWidth < 768) {
      setMobileView(true);
      updateSm(true);
    } else {
      setMobileView(false);
      updateSm(false);
    }
  };

  useEffect(() => {
    viewChange();
    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    document.getElementsByClassName("nk-header")[0].addEventListener("click", function () {
      updateSm(false);
    });

    document.addEventListener("mousedown", hideDropdown);

    return () => {
      document.removeEventListener("mousedown", hideDropdown);
      window.removeEventListener("resize", viewChange);
      window.removeEventListener("load", viewChange);
    };
  }, []);

  const toggleDropDown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const hideDropdown = (e) => {
    const { current } = dropDownRef;

    if (current && !current?.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  const handleChangeAvatar = async (e) => {
    const {
      files: [file],
    } = e.target;

    const imagePattern = /image-*/;

    if (!file || !file.type?.match(imagePattern)) {
      return;
    }

    try {
      setImageAvatar(file);
      toggleDropDown();
      // handle upload to database directly
      setAuth((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleWithdrawType = (type = "") => {
    const withdrawAmount = withdrawAmounts[type];
    if (!withdrawAmount || withdrawAmount <= 0) {
      showAlert("Cannot withdraw XAF0.");
      return;
    }
    setWithdrawType("account");
    // open modal
    showAlert("Successfully withdrawn XAF" + withdrawAmount, "check-circle", "success");
  };

  const showAlert = (text = "", icon = "cross-circle", color = "danger") => {
    setAlertMessage({ text, icon, color });
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Profile | {auth?.name}</title>
      </Helmet>
      <Content>
        <Card className="card-bordered">
          <div className="card-aside-wrap">
            <div
              className={`card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-md ${
                sm ? "content-active" : ""
              }`}
            >
              <div className="card-inner-group">
                <div className="card-inner">
                  <div className="user-card">
                    <UserAvatar
                      image={
                        imageAvatar
                          ? typeof imageAvatar === "string"
                            ? imageAvatar
                            : URL.createObjectURL(imageAvatar)
                          : null
                      }
                      text={findUpper(profileName)}
                      theme="primary"
                    />
                    <div className="user-info">
                      <span className="lead-text">{profileName}</span>
                      <span className="sub-text">{auth?.email}</span>
                    </div>

                    <div className="user-action" ref={dropDownRef}>
                      <Dropdown toggle={() => {}} isOpen={dropdownOpen}>
                        <DropdownToggle tag="span" onClick={toggleDropDown} className="btn btn-icon btn-trigger me-n2">
                          <Icon name="more-v"></Icon>
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem tag="label" htmlFor="imageAvatar">
                                {/* <label htmlFor="imageAvatar"> */}
                                <Icon name="camera-fill"></Icon>
                                <span>Change Photo</span>
                                {/* </label> */}
                                <input
                                  className="avatar-input"
                                  type="file"
                                  name="imageAvatar"
                                  id="imageAvatar"
                                  accept="image/*"
                                  onChange={handleChangeAvatar}
                                />
                              </DropdownItem>
                            </li>
                            <li>
                              <Link to={"/update-profile"} className="p-0">
                                <DropdownItem tag="span">
                                  <Icon name="edit-fill"></Icon>
                                  <span>Update Profile</span>
                                </DropdownItem>
                              </Link>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="card-inner account-balance">
                  <div className="user-account-info py-0">
                    <h6 className="overline-title-alt">Bank Account Wallet</h6>
                    <div className="user-balance">
                      12.395769 <small className="currency currency-btc">XAF</small>
                    </div>
                    <div className="user-balance-sub">
                      Locked{" "}
                      <span>
                        1.395769 <span className="currency currency-btc">XAF</span>
                      </span>
                    </div>
                    <small
                      className={`user-balance-sub user-withdrawable-balance`}
                      onClick={() => handleWithdrawType("account")}
                    >
                      <Badge
                        className="badge-md badge-dot"
                        pill
                        color={withdrawAmounts?.account <= 0 ? "secondary" : "primary"}
                      >
                        Withdraw: {withdrawAmounts?.account} XAF
                      </Badge>
                    </small>
                  </div>
                  <div className="user-account-info py-0">
                    <h6 className="overline-title-alt">MTN MoMo Account</h6>
                    <div className="user-balance">
                      12.395769 <small className="currency currency-btc">XAF</small>
                    </div>
                    <div className="user-balance-sub">
                      Locked{" "}
                      <span>
                        1.395769 <span className="currency currency-btc">XAF</span>
                      </span>
                    </div>
                    <small
                      className={`user-balance-sub user-withdrawable-balance`}
                      onClick={() => handleWithdrawType("mtn")}
                    >
                      <Badge
                        className="badge-md badge-dot"
                        pill
                        color={withdrawAmounts?.mtn <= 0 ? "secondary" : "primary"}
                      >
                        Withdraw: {withdrawAmounts?.mtn} XAF
                      </Badge>
                    </small>
                  </div>
                  <div className="user-account-info py-0">
                    <h6 className="overline-title-alt">Orange Money Account</h6>
                    <div className="user-balance">
                      0 <small className="currency currency-btc">XAF</small>
                    </div>
                    <div className="user-balance-sub">
                      Locked{" "}
                      <span>
                        0 <span className="currency currency-btc">XAF</span>
                      </span>
                    </div>
                    <small
                      className={`user-balance-sub user-withdrawable-balance inactive`}
                      onClick={() => handleWithdrawType("orange")}
                    >
                      <Badge
                        className="badge-md badge-dot"
                        pill
                        color={withdrawAmounts?.orange <= 0 ? "secondary" : "primary"}
                      >
                        Withdraw: {withdrawAmounts?.orange} XAF
                      </Badge>
                    </small>
                  </div>
                </div>
                <div className="card-inner p-0">
                  <ul className="link-list-menu">
                    <li onClick={() => updateSm(false)}>
                      <div className="cursor-pointer" onClick={() => setInfoOpen("1")}>
                        <MenuHeading heading={"Personal Information"} />
                      </div>
                      <Collapse className="accordion-body" isOpen={infoOpen === "1"}>
                        <div className="account-info-details-cont">
                          {agencyPersonalInfo?.map((item, i) => (
                            <AccountInfoitem key={i} infoItem={item} />
                          ))}
                        </div>
                      </Collapse>
                    </li>
                    {/* <li onClick={() => updateSm(false)}>
                      <Link
                        to={`/user-profile-notification`}
                        className={window.location.pathname === `/user-profile-notification` ? "active" : ""}
                      >
                        <Icon name="bell-fill"></Icon>
                        <span>Notification</span>
                      </Link>
                    </li>

                    <li onClick={() => updateSm(false)}>
                      <Link
                        to={`user-profile-setting`}
                        className={window.location.pathname === `/user-profile-setting` ? "active" : ""}
                      >
                        <Icon name="lock-alt-fill"></Icon>
                        <span>Security Setting</span>
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-inner card-inner-lg">
              {sm && mobileView && <div className="toggle-overlay" onClick={() => updateSm(!sm)}></div>}
              <Routes>
                <Route
                  exact
                  path={`/user-profile`}
                  element={<UserProfileRegularPage updateSm={updateSm} sm={sm} setProfileName={setProfileName} />}
                ></Route>
                <Route
                  exact
                  path={`/user-profile-notification`}
                  element={<UserProfileNotificationPage updateSm={updateSm} sm={sm} />}
                ></Route>
                <Route
                  exact
                  path={`/user-profile-activity`}
                  element={<UserProfileActivityPage updateSm={updateSm} sm={sm} />}
                ></Route>
                <Route
                  exact
                  path={`/user-profile-setting`}
                  element={<UserProfileSettingPage updateSm={updateSm} sm={sm} />}
                ></Route>
              </Routes>
            </div>
          </div>
        </Card>
        {alertMessage?.text && (
          <div className="alert-container">
            <Alert className="alert-icon" color={alertMessage?.color}>
              <Icon name={alertMessage?.icon} />
              <strong>{alertMessage?.text}</strong>
            </Alert>
          </div>
        )}
      </Content>
    </React.Fragment>
  );
};

export default UserProfileLayout;
