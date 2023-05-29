import React, { useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import { DatePicker } from "reactstrap-date-picker";
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  ModalBody,
  Modal,
  DropdownItem,
  Form,
  Input,
  Alert,
} from "reactstrap";
import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Icon,
  Button,
  Col,
  UserAvatar,
  PaginationComponent,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  RSelect,
} from "../../../components/Component";
import { teamList, scheduledBuses } from "./ProjectData";
import { axiosPrivate, setDeadline } from "../../../utils/Utils";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const busDrivers = [
  { name: "Driver 1", id: 1 },
  { name: "Driver 2", id: 2 },
];

const defaultBusAvatar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs6bmccU8T9S2A6xTsrGgiTsiiyELZvtcv5w&usqp=CAU";

const defaultDriverAvatar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTocZNbepgpX1LE05TQxdp4Bal_V0eVnH0n4g&usqp=CAU";

export const AllBuses = () => {
  const { auth } = useAuth();

  const s3BucktUrl = process.env.REACT_APP_S3_BUCKET_URL;

  const axios = useAxiosPrivate();

  const [sm, updateSm] = useState(false);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [editId, setEditedId] = useState();
  const [data, setData] = useState(null);
  const [busDrivers, setBusDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [formData, setFormData] = useState({
    busNumber: "",
    numberOfSeats: "",
    description: "",
    image: "",
    seatsChart: null,
    seats: [],
  });

  const [updateData, setUpdateData] = useState({
    busNumber: "",
    numberOfSeats: "",
    description: "",
    image: "",
    seatsChart: null,
    seats: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);

  const [toggleDateFilter, setToggleDateFilter] = useState(false);

  const [query, setQuery] = useState({});

  const [selectedDate, setSelectedDate] = useState(null);
  const [filterData, setFilterData] = useState({});
  const [departureDate, setDepartureDate] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e?.target;

    setFilterData((prev) => ({ ...prev, [name]: value }));
  };

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // on update function to update selected bus
  const handleUpdateChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      busNumber: "",
      numberOfSeats: "",
      description: "",
      image: "",
      seatsChart: null,
      seats: [],
    });
    setSelectedDriver(null);
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  const showAlert = (text = "", icon = "cross-circle", color = "danger") => {
    setAlertMessage({ text, icon, color });
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  // submit function to add a new item
  const onFormSubmit = async (sData) => {
    setSubmitting(true);

    const seats = formData?.seats;

    const positionNotFilled = seats?.find(
      (item) => !item?.position || item?.position === "" || !["LW", "MD", "RW", "EN"].includes(item?.position)
    );

    if (
      !formData?.busNumber ||
      !formData?.numberOfSeats ||
      !formData?.image ||
      !seats?.length ||
      positionNotFilled ||
      isNaN(Number(formData?.numberOfSeats))
    ) {
      return showAlert("Please fill all fields", "cross-circle", "danger");
    }

    if (!selectedDriver?.id) {
      return showAlert("Please select a driver", "cross-circle", "danger");
    }

    const submitData = new FormData();

    submitData.append("number", formData?.busNumber);

    submitData.append("description", formData?.description);
    submitData.append("number_of_seats", formData?.numberOfSeats);
    submitData.append("driver", selectedDriver?.id);

    submitData.append("seats", JSON.stringify(formData?.seats));

    submitData.append("busImage", formData?.image, formData?.image?.name);

    if (formData?.seatsChart) {
      submitData.append("seatsChart", formData?.seatsChart, formData?.seatsChart?.name);
    }

    // Post data to server if all information is filled
    try {
      const { data } = await axios.post("/agencies/buses", submitData, {
        headers: {
          "Content-Type": "multipart/formdata",
        },
      });

      setData((prev) => [{ ...data, driver: selectedDriver }, ...prev]);
      resetForm();
      setModal({ add: false });
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  // submit function to update a new item
  const onEditSubmit = async (sData) => {
    setSubmitting(true);

    const seats = updateData?.seats;

    const positionNotFilled = seats?.find(
      (item) => !item?.position || item?.position === "" || !["D", "LW", "MD", "RW", "EN"].includes(item?.position)
    );

    if (
      !updateData?.number ||
      !updateData?.numberOfSeats ||
      !updateData?.image ||
      !seats?.length ||
      positionNotFilled ||
      isNaN(Number(updateData?.numberOfSeats))
    ) {
      return showAlert("Please fill all fields", "cross-circle", "danger");
    }

    if (!updateData?.driver?.id) {
      return showAlert("Please select a driver", "cross-circle", "danger");
    }

    const submitData = new FormData();

    submitData.append("number", updateData?.number);

    submitData.append("description", updateData?.description);
    submitData.append("number_of_seats", updateData?.numberOfSeats);
    submitData.append("driver", updateData?.driver?.id);

    submitData.append("seats", JSON.stringify(updateData?.seats));

    if (typeof updateData.image !== "string" && updateData?.image) {
      submitData.append("busImage", updateData?.image, updateData?.image?.name);
    }

    if (typeof updateData?.seatsChart !== "string" && updateData?.seatsChart) {
      submitData.append("seatsChart", updateData?.seatsChart, updateData?.seatsChart?.name);
    }

    // Post data to server if all information is filled
    try {
      const { data } = await axios.put("/agencies/buses", submitData, {
        headers: {
          "Content-Type": "multipart/formdata",
        },
      });

      setData((prev) => [{ ...data, driver: selectedDriver }, ...prev]);
      resetForm();
      setModal({ add: false });
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    data.forEach((item) => {
      if (item.id === id) {
        setModal({ edit: true }, { add: false });
      }
    });
  };

  // function to change the complete a project property
  const completeProject = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].deadline = setDeadline(0);
    setData([...newData]);
  };

  // function to change the check property of an item
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // function to change the complete property of an item
  const selectorCompleteProject = () => {
    let newData;
    newData = data.map((item) => {
      if (item.checked === true) item.deadline = setDeadline(0);
      return item;
    });
    setData([...newData]);
  };

  // function to delete the seletected item
  const selectorDeleteProject = () => {
    let newData;
    newData = data.filter((item) => item.checked !== true);
    setData([...newData]);
  };

  // function to change the check property of selected item
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].checked = e.currentTarget.checked;
    setData([...newData]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems =
    data && data?.length
      ? data
          ?.filter((item) => {
            const numAvailable = filterData?.busNumber
              ? item?.number?.toLowerCase()?.includes(filterData?.busNumber?.toLowerCase())
              : true;

            const isMinSeats = filterData?.minSeats ? item?.seats?.length >= Number(filterData?.minSeats) : true;

            const isMaxSeats = filterData?.maxSeats ? item?.seats?.length <= Number(filterData?.maxSeats) : true;

            const isDriver = filterData?.driver ? item?.driver?.id === filterData?.driver : true;

            return numAvailable && isMaxSeats && isMinSeats && isDriver;
          })
          ?.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();

  const handleFilter = (query = {}) => {
    // filter through bus list and set scheduled buses to only buses that respect filter optios
    console.log(query);
  };

  const getBuses = async () => {
    try {
      const { data } = await axios.get(`/agencies/buses`);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAgencyDrivers = async () => {
    try {
      const { data } = await axios.get(`/agencies/drivers`);
      setBusDrivers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBuses();
    getAgencyDrivers();
  }, []);

  const onChangeSeatPosition = (index) => (e) => {
    let newArr = formData?.seats?.map((item, i) => {
      if (index === i) {
        return { ...item, position: e.target.value };
      } else {
        return item;
      }
    });
    setFormData((prev) => ({ ...prev, seats: newArr }));
  };

  const onUpdateSeatPosition = (index) => (e) => {
    let newArr = updateData?.seats
      ?.sort((a, b) => Number(a?.number) - Number(b?.number))
      ?.map((item, i) => {
        if (index === i) {
          return { ...item, position: e.target.value };
        } else {
          return item;
        }
      });
    setUpdateData((prev) => ({ ...prev, seats: newArr }));
  };

  return (
    <React.Fragment>
      <Head title="Project List"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>All Buses</BlockTitle>
              <BlockDes className="text-soft">
                Showing {data ? data?.length : 0} <small>of</small> {data ? data?.length : 0} filtered
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      {/* <Icon name="filter-alt" className="d-none d-sm-inline"></Icon> */}
                      <Input placeholder="Bus Number" name="busNumber" onChange={handleFilterChange} />
                    </li>
                    <li>
                      {/* <Icon name="filter-alt" className="d-none d-sm-inline"></Icon> */}
                      <Input placeholder="Min number of seats" name="minSeats" onChange={handleFilterChange} />
                      <Input placeholder="Max number of seats" name="maxSeats" onChange={handleFilterChange} />
                    </li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon name="filter-alt" className="d-none d-sm-inline"></Icon>
                          <span>Filter By Driver</span>
                          <Icon name="chevron-right" className="dd-indc"></Icon>
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            {busDrivers?.map((driver) => (
                              <li>
                                <DropdownItem
                                  tag="a"
                                  href="#dropdownitem"
                                  onClick={(ev) => {
                                    setFilterData((prev) => ({ ...prev, driver: driver?.id }));
                                  }}
                                >
                                  <span>{driver?.name}</span>
                                </DropdownItem>
                              </li>
                            ))}
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt" onClick={() => setModal({ add: true })}>
                      <Button color="primary">
                        <Icon name="plus"></Icon>
                        <span>Add Bus</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <DataTable className="card-stretch">
            <DataTableBody>
              <DataTableHead className="nk-tb-item nk-tb-head">
                <DataTableRow className="nk-tb-col-check">
                  <div className="custom-control custom-control-sm custom-checkbox notext">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="pid-all"
                      onChange={(e) => selectorCheck(e)}
                    />
                    <label className="custom-control-label" htmlFor="pid-all"></label>
                  </div>
                </DataTableRow>
                <DataTableRow></DataTableRow>
                <DataTableRow>
                  <span className="sub-text bold">Bus Number</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text bold">
                    N<sup>o</sup> of seats
                  </span>
                </DataTableRow>
                <DataTableRow size="lg">
                  <span className="sub-text bold">Driver</span>
                </DataTableRow>
                {/* <DataTableRow>
                  <span className="sub-text bold">Depart Date</span>
                </DataTableRow> */}
                <DataTableRow className="nk-tb-col-tools text-end">
                  <UncontrolledDropdown>
                    <DropdownToggle tag="a" className="btn btn-xs btn-trigger btn-icon dropdown-toggle me-n1 bold">
                      <Icon name="more-h"></Icon>
                    </DropdownToggle>
                    <DropdownMenu end>
                      <ul className="link-list-opt no-bdr">
                        <li onClick={() => selectorCompleteProject()}>
                          <DropdownItem
                            tag="a"
                            href="#markasdone"
                            onClick={(ev) => {
                              ev.preventDefault();
                            }}
                          >
                            <Icon name="check-round-cut"></Icon>
                            <span>Delete Selected</span>
                          </DropdownItem>
                        </li>
                        <li onClick={() => selectorDeleteProject()}>
                          <DropdownItem
                            tag="a"
                            href="#remove"
                            onClick={(ev) => {
                              ev.preventDefault();
                            }}
                          >
                            <Icon name="trash"></Icon>
                            <span>Delete All</span>
                          </DropdownItem>
                        </li>
                      </ul>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </DataTableRow>
              </DataTableHead>
              {currentItems?.length > 0
                ? currentItems?.map((item) => {
                    return (
                      <DataTableItem key={item.id}>
                        <DataTableRow className="nk-tb-col-check">
                          <div className="custom-control custom-control-sm custom-checkbox notext">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              defaultChecked={item.checked}
                              id={item.id + "pid-all"}
                              key={Math.random()}
                              onChange={(e) => onSelectChange(e, item.id)}
                            />
                            <label className="custom-control-label" htmlFor={item.id + "pid-all"}></label>
                          </div>
                        </DataTableRow>
                        <DataTableRow>
                          <a
                            href="#title"
                            onClick={(ev) => {
                              ev.preventDefault();
                            }}
                          >
                            <img
                              src={item?.image ? `${s3BucktUrl}${item?.image}` : defaultBusAvatar}
                              alt="Bus"
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: "50%",
                              }}
                            />
                            {/* <UserAvatar theme={item.avatarClass} text={findUpper(item.title)} /> */}
                          </a>
                        </DataTableRow>
                        <DataTableRow>
                          <span>{item?.number}</span>
                        </DataTableRow>
                        <DataTableRow>
                          <span>{item.seats?.length}</span>
                        </DataTableRow>
                        <DataTableRow>
                          <ul className="project-users g-1">
                            <li>
                              <img
                                src={item?.driver?.image ? `${s3BucktUrl}${item?.driver?.image}` : defaultDriverAvatar}
                                alt=""
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: "50%",
                                }}
                              />
                            </li>

                            <li>
                              <span className="subText">{item?.driver?.name}</span>
                            </li>
                          </ul>
                        </DataTableRow>
                        {/* <DataTableRow>
                          <span>{item?.departure?.date}</span>
                        </DataTableRow> */}
                        <DataTableRow className="nk-tb-col-tools text-end">
                          <ul className="nk-tb-actions gx-1">
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="text-soft dropdown-toggle btn btn-icon btn-trigger">
                                  <Icon name="more-h"></Icon>
                                </DropdownToggle>
                                <DropdownMenu end>
                                  <ul className="link-list-opt no-bdr">
                                    <li onClick={() => onEditClick(item?.id)}>
                                      <DropdownItem
                                        tag="a"
                                        href="#edit"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setUpdateData({ ...item, numberOfSeats: item?.seats?.length });
                                        }}
                                      >
                                        <Icon name="edit"></Icon>
                                        <span>Edit</span>
                                      </DropdownItem>
                                    </li>

                                    <li onClick={() => completeProject(item.id)}>
                                      <DropdownItem
                                        tag="a"
                                        href="#markasdone"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                        className="text-danger"
                                      >
                                        <Icon name="trash"></Icon>
                                        <span>Delete</span>
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                          </ul>
                        </DataTableRow>
                      </DataTableItem>
                    );
                  })
                : null}
            </DataTableBody>
            <div className="card-inner">
              {data && data?.length > 0 ? (
                <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={data?.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">No buses found</span>
                </div>
              )}
            </div>
          </DataTable>
        </Block>

        <Modal isOpen={modal.add} toggle={() => setModal({ add: false })} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Add New Bus</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onFormSubmit)}>
                  {alertMessage?.text && (
                    <div className="alert-container">
                      <Alert className="alert-icon" color={alertMessage?.color}>
                        <Icon name={alertMessage?.icon} onClick={() => setAlertMessage(null)} />
                        <strong>{alertMessage?.text}</strong>
                      </Alert>
                    </div>
                  )}
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Bus Number</label>
                      <input
                        type="text"
                        name="busNumber"
                        defaultValue={formData.busNumber}
                        placeholder="Enter bus number"
                        onChange={(e) => onInputChange(e)}
                        className="form-control"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.busNumber && <span className="invalid">{errors.busNumber.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Number of Seats</label>
                      <input
                        type="number"
                        name="numberOfSeats"
                        defaultValue={formData.numberOfSeats}
                        placeholder="Enter number of seats"
                        onChange={(e) => onInputChange(e)}
                        onBlur={(e) => {
                          const { value } = e.target;
                          setFormData((prev) => ({
                            ...prev,
                            seats: Array(Number(value))
                              .fill(0)
                              .map((item, i) => {
                                const seatNumber = i < 9 ? `0${i + 1}` : (i + 1).toString();

                                return { number: seatNumber, position: "" };
                              }),
                          }));
                        }}
                        className="form-control"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.numberOfSeats && <span className="invalid">{errors.numberOfSeats.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <UncontrolledDropdown>
                      <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                        <Icon name="filter-alt" className="d-none d-sm-inline"></Icon>
                        <span>{selectedDriver ? selectedDriver?.name : "Select Bus Driver"}</span>
                        <Icon name="chevron-down" className="dd-indc"></Icon>
                      </DropdownToggle>
                      <DropdownMenu end>
                        <ul className="link-list-opt no-bdr">
                          {busDrivers?.map((driver) => (
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  setSelectedDriver(driver);
                                }}
                              >
                                <span>{driver?.name}</span>
                              </DropdownItem>
                            </li>
                          ))}
                        </ul>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Col>
                  <Col size="12">
                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        defaultValue={formData.description}
                        placeholder="Your description"
                        onChange={(e) => onInputChange(e)}
                        className="form-control-xl form-control no-resize"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Bus Image</label>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        defaultValue={formData.image}
                        onChange={(e) => {
                          const {
                            files: [file],
                          } = e.target;
                          if (file) {
                            setFormData((prev) => ({ ...prev, image: file }));
                          }
                        }}
                        className="form-control"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.image && <span className="invalid">{errors.image.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Seats Chart</label>
                      <input
                        type="file"
                        accept="image/*"
                        name="seatsChart"
                        defaultValue={formData.seatsChart}
                        onChange={(e) => {
                          const {
                            files: [file],
                          } = e.target;
                          if (file) {
                            setFormData((prev) => ({ ...prev, seatsChart: file }));
                          }
                        }}
                        className="form-control"
                        ref={register({})}
                      />
                      {errors.seatsChart && <span className="invalid">{errors.seatsChart.message}</span>}
                    </div>
                  </Col>
                  <div className="form-group">
                    <label className="form-label">Update Seats Position</label>
                    <div className="bus-seats text-sm">
                      <div className="bus-seat">
                        <p className="seat-position-cont">
                          <div className="seat-position">
                            <label className="bold">LW:</label>
                            <p>Left Window Seat</p>
                          </div>
                        </p>
                      </div>
                      <div className="bus-seat">
                        <p className="seat-position-cont">
                          <div className="seat-position">
                            <label className="bold">RW:</label>
                            <p>Right Window Seat</p>
                          </div>
                        </p>
                      </div>
                      <div className="bus-seat">
                        <p className="seat-position-cont">
                          <div className="seat-position">
                            <label className="bold">EN:</label>
                            <p>Edge Seat (Not Window)</p>
                          </div>
                        </p>
                      </div>
                      <div className="bus-seat">
                        <p className="seat-position-cont">
                          <div className="seat-position">
                            <label className="bold">MD:</label>
                            <p>Middle Seat</p>
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bus-seats">
                    {formData?.seats?.map((item, i) => {
                      return (
                        <div className="bus-seat">
                          <p className="bus-number">{item?.number}</p>
                          <p className="seat-position-cont">
                            <div className="seat-position">
                              <label htmlFor={`${i}-lw`}>LW</label>
                              <input
                                id={`${i}-lw`}
                                type="checkbox"
                                value={"LW"}
                                checked={formData?.seats[i]?.position === "LW"}
                                onChange={onChangeSeatPosition(i)}
                              />
                            </div>
                            <div className="seat-position">
                              <label htmlFor={`${i}-rw`}>RW</label>
                              <input
                                id={`${i}-rw`}
                                type="checkbox"
                                value={"RW"}
                                checked={formData?.seats[i]?.position === "RW"}
                                onChange={onChangeSeatPosition(i)}
                              />
                            </div>
                            <div className="seat-position">
                              <label htmlFor={`${i}-en`}>EN</label>
                              <input
                                id={`${i}-en`}
                                type="checkbox"
                                value={"EN"}
                                checked={formData?.seats[i]?.position === "EN"}
                                onChange={onChangeSeatPosition(i)}
                              />
                            </div>
                            <div className="seat-position">
                              <label htmlFor={`${i}-md`}>MD</label>
                              <input
                                id={`${i}-md`}
                                type="checkbox"
                                value={"MD"}
                                checked={formData?.seats[i]?.position === "MD"}
                                onChange={onChangeSeatPosition(i)}
                              />
                            </div>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  {/* <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Deadline Date</label>
                      <DatePicker
                        selected={formData.date}
                        className="form-control"
                        onChange={(date) => setFormData({ ...formData, date: date })}
                        minDate={new Date()}
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Team Members</label>
                      <RSelect options={teamList} isMulti onChange={(e) => setFormData({ ...formData, team: e })} />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Lead</label>
                      <RSelect options={formData.team} onChange={(e) => setFormData({ ...formData, lead: e.value })} />
                    </div>
                  </Col> */}
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Add Bus
                        </Button>
                      </li>
                      <li>
                        <Button
                          type="button"
                          onClick={(ev) => {
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </Button>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={modal.edit} toggle={() => setModal({ edit: false })} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">
                Update Bus N<sup>o</sup> {updateData?.number}
              </h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  {alertMessage?.text && (
                    <div className="alert-container">
                      <Alert className="alert-icon" color={alertMessage?.color}>
                        <Icon name={alertMessage?.icon} onClick={() => setAlertMessage(null)} />
                        <strong>{alertMessage?.text}</strong>
                      </Alert>
                    </div>
                  )}
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Bus Number</label>
                      <input
                        type="text"
                        name="number"
                        defaultValue={updateData?.number}
                        placeholder="Enter bus number"
                        onChange={(e) => handleUpdateChange(e)}
                        className="form-control"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.number && <span className="invalid">{errors.number.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Number of Seats</label>
                      <input
                        type="number"
                        name="numberOfSeats"
                        defaultValue={updateData?.seats?.length}
                        placeholder="Enter number of seats"
                        onChange={(e) => handleUpdateChange(e)}
                        onBlur={(e) => {
                          const { value } = e.target;
                          setUpdateData((prev) => ({
                            ...prev,
                            seats: Array(Number(value))
                              .fill(0)
                              .map((item, i) => {
                                const seatNumber = i < 9 ? `0${i + 1}` : (i + 1).toString();

                                return { number: seatNumber, position: "" };
                              }),
                          }));
                        }}
                        className="form-control"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.numberOfSeats && <span className="invalid">{errors.numberOfSeats.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <UncontrolledDropdown>
                      <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                        <Icon name="filter-alt" className="d-none d-sm-inline"></Icon>
                        <span>{updateData?.driver?.id ? updateData?.driver?.name : "Select Bus Driver"}</span>
                        <Icon name="chevron-down" className="dd-indc"></Icon>
                      </DropdownToggle>
                      <DropdownMenu end>
                        <ul className="link-list-opt no-bdr">
                          {busDrivers?.map((driver) => (
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  setUpdateData((prev) => ({ ...prev, driver }));
                                }}
                              >
                                <span>{driver?.name}</span>
                              </DropdownItem>
                            </li>
                          ))}
                        </ul>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Col>
                  <Col size="12">
                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        defaultValue={updateData?.description}
                        placeholder="Your description"
                        onChange={(e) => handleUpdateChange(e)}
                        className="form-control-xl form-control no-resize"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Bus Image</label>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        defaultValue={typeof updateData.image === "string" ? null : updateData?.image}
                        onChange={(e) => {
                          const {
                            files: [file],
                          } = e.target;
                          if (file) {
                            setUpdateData((prev) => ({ ...prev, image: file }));
                          }
                        }}
                        className="form-control"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.image && <span className="invalid">{errors.image.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Seats Chart</label>
                      <input
                        type="file"
                        accept="image/*"
                        name="seatsChart"
                        defaultValue={typeof updateData.seatsChart === "string" ? null : updateData?.seatsChart}
                        onChange={(e) => {
                          const {
                            files: [file],
                          } = e.target;
                          if (file) {
                            setUpdateData((prev) => ({ ...prev, seatsChart: file }));
                          }
                        }}
                        className="form-control"
                        ref={register({})}
                      />
                      {errors.seatsChart && <span className="invalid">{errors.seatsChart.message}</span>}
                    </div>
                  </Col>
                  <div className="form-group">
                    <label className="form-label">Update Seats Position</label>
                    <div className="bus-seats text-sm">
                      <div className="bus-seat">
                        <p className="seat-position-cont">
                          <div className="seat-position">
                            <label className="bold">D:</label>
                            <p>With Driver</p>
                          </div>
                        </p>
                      </div>
                      <div className="bus-seat">
                        <p className="seat-position-cont">
                          <div className="seat-position">
                            <label className="bold">LW:</label>
                            <p>Left Window Seat</p>
                          </div>
                        </p>
                      </div>
                      <div className="bus-seat">
                        <p className="seat-position-cont">
                          <div className="seat-position">
                            <label className="bold">RW:</label>
                            <p>Right Window Seat</p>
                          </div>
                        </p>
                      </div>
                      <div className="bus-seat">
                        <p className="seat-position-cont">
                          <div className="seat-position">
                            <label className="bold">EN:</label>
                            <p>Edge Seat (Not Window)</p>
                          </div>
                        </p>
                      </div>
                      <div className="bus-seat">
                        <p className="seat-position-cont">
                          <div className="seat-position">
                            <label className="bold">MD:</label>
                            <p>Middle Seat</p>
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bus-seats">
                    {updateData?.seats
                      ?.sort((a, b) => Number(a?.number) - Number(b?.number))
                      ?.map((item, i) => {
                        return (
                          <div className="bus-seat">
                            <p className="bus-number">{item?.number > 9 ? item?.number : `0${item?.number}`}</p>
                            <p className="seat-position-cont">
                              <div className="seat-position">
                                <label htmlFor={`${i}-d`}>D</label>
                                <input
                                  id={`${i}-d`}
                                  type="checkbox"
                                  value={"D"}
                                  checked={updateData?.seats[i]?.position === "D"}
                                  onChange={onUpdateSeatPosition(i)}
                                />
                              </div>
                              <div className="seat-position">
                                <label htmlFor={`${i}-lw`}>LW</label>
                                <input
                                  id={`${i}-lw`}
                                  type="checkbox"
                                  value={"LW"}
                                  checked={updateData?.seats[i]?.position === "LW"}
                                  onChange={onUpdateSeatPosition(i)}
                                />
                              </div>
                              <div className="seat-position">
                                <label htmlFor={`${i}-rw`}>RW</label>
                                <input
                                  id={`${i}-rw`}
                                  type="checkbox"
                                  value={"RW"}
                                  checked={updateData?.seats[i]?.position === "RW"}
                                  onChange={onUpdateSeatPosition(i)}
                                />
                              </div>
                              <div className="seat-position">
                                <label htmlFor={`${i}-en`}>EN</label>
                                <input
                                  id={`${i}-en`}
                                  type="checkbox"
                                  value={"EN"}
                                  checked={updateData?.seats[i]?.position === "EN"}
                                  onChange={onUpdateSeatPosition(i)}
                                />
                              </div>
                              <div className="seat-position">
                                <label htmlFor={`${i}-md`}>MD</label>
                                <input
                                  id={`${i}-md`}
                                  type="checkbox"
                                  value={"MD"}
                                  checked={updateData?.seats[i]?.position === "MD"}
                                  onChange={onUpdateSeatPosition(i)}
                                />
                              </div>
                            </p>
                          </div>
                        );
                      })}
                  </div>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Update Bus
                        </Button>
                      </li>
                      <li>
                        <Button
                          type="button"
                          onClick={(ev) => {
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </Button>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default AllBuses;
