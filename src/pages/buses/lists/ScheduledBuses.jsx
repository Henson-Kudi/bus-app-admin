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
import { projectData, teamList, scheduledBuses } from "./ProjectData";
import { findUpper, setDeadline, setDeadlineDays, calcPercentage, axios } from "../../../utils/Utils";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import AuthContext from "../../../contexts/AuthProvider";
import { useEffect } from "react";

const busDrivers = [
  { name: "Driver 1", id: 1 },
  { name: "Driver 2", id: 2 },
];

const defaultBusAvatar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs6bmccU8T9S2A6xTsrGgiTsiiyELZvtcv5w&usqp=CAU";

const defaultDriverAvatar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTocZNbepgpX1LE05TQxdp4Bal_V0eVnH0n4g&usqp=CAU";

export const ScheduledBuses = () => {
  const { auth } = useContext(AuthContext);

  const [sm, updateSm] = useState(false);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [editId, setEditedId] = useState();
  const [data, setData] = useState(scheduledBuses);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    lead: "",
    tasks: 0,
    team: [],
    totalTask: 0,
    date: new Date(),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);

  const [toggleDateFilter, setToggleDateFilter] = useState(false);

  const [query, setQuery] = useState({});

  const [selectedDate, setSelectedDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);

  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      lead: "",
      tasks: 0,
      totalTask: 0,
      team: [],
      date: new Date(),
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  // submit function to add a new item
  const onFormSubmit = (sData) => {
    const { title, subtitle, description, tasks, totalTask } = sData;
    let submittedData = {
      id: data.length + 1,
      avatarClass: "pink",
      title: title,
      subtitle: subtitle,
      desc: description,
      lead: formData.lead,
      team: formData.team,
      tasks: tasks,
      totalTask: totalTask,
      deadline: new Date(`${formData.date}`), // Format ** mm/dd/yyyy
    };
    setData((data) => [submittedData, ...data]);
    resetForm();
    setModal({ add: false });
  };

  // submit function to update a new item
  const onEditSubmit = (sData) => {
    const { title, subtitle, description, tasks, totalTask } = sData;
    let submittedData;
    let newitems = data;
    newitems.forEach((item) => {
      if (item.id === editId) {
        submittedData = {
          id: item.id,
          avatarClass: item.avatarClass,
          title: title,
          subtitle: subtitle,
          desc: description,
          lead: formData.lead,
          tasks: tasks,
          totalTask: totalTask,
          deadline: new Date(`${formData.date}`), // Format ** mm/dd/yyyy
          team: formData.team,
        };
      }
    });
    let index = newitems.findIndex((item) => item.id === editId);
    newitems[index] = submittedData;
    resetForm();
    setModal({ edit: false });
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    data.forEach((item) => {
      if (item.id === id) {
        setFormData({
          title: item.title,
          subtitle: item.subtitle,
          description: item.desc,
          lead: item.lead,
          team: item.team,
          tasks: item.tasks,
          totalTask: item.totalTask,
          date: item.deadline,
        });
        setModal({ edit: true }, { add: false });
        setEditedId(id);
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
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();

  const handleFilter = (query = {}) => {
    // filter through bus list and set scheduled buses to only buses that respect filter optios
    console.log(query);
  };

  const getBuses = async () => {
    try {
      const { data } = await axios.get(`agencies/scheduled-buses`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBuses();
  }, []);

  return (
    <React.Fragment>
      <Head title="Project List"></Head>
      <Content>
        <BlockHead size="sm">
          <div style={{ marginBottom: 10 }}>
            <BlockHeadContent>
              <BlockTitle page>Scheduled Buses</BlockTitle>
              <BlockDes className="text-soft">
                Showing {data.length} <small>of</small> {data.length} filtered
              </BlockDes>
            </BlockHeadContent>
          </div>
          <BlockBetween>
            <BlockHeadContent>
              <BlockDes className="text-soft">Filters: </BlockDes>
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
                      <Input
                        placeholder="Bus Number"
                        className="dropdown-toggle btn btn-white btn-dim btn-outline-light"
                      />
                    </li>
                    <li>
                      {/* <Icon name="filter-alt" className="d-none d-sm-inline"></Icon> */}
                      <Input
                        placeholder="Min number of seats"
                        className="dropdown-toggle btn btn-white btn-dim btn-outline-light"
                      />
                      <Input
                        placeholder="Max number of seats"
                        className="dropdown-toggle btn btn-white btn-dim btn-outline-light"
                      />
                    </li>
                    <li>
                      {/* <Icon name="filter-alt" className="d-none d-sm-inline"></Icon> */}
                      <DatePicker
                        value={departureDate}
                        onChange={(v, f) => setDepartureDate(f)}
                        placeholder="Filter by departure date"
                        showTodayButton
                        minDate={minDate}
                        className="dropdown-toggle btn btn-white btn-dim btn-outline-light"
                      />
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
                                    setQuery((prev) => ({ ...prev, driver }));
                                    handleFilter({ ...query, driver });
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
                        <span>Schedule Bus</span>
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
                <DataTableRow>
                  <span className="sub-text bold">Depart Date</span>
                </DataTableRow>
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
              {currentItems.length > 0
                ? currentItems.map((item) => {
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
                              src={item?.image ?? defaultBusAvatar}
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
                                src={item?.driver?.image ?? defaultDriverAvatar}
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
                        <DataTableRow>
                          <span>{item?.departure?.date}</span>
                        </DataTableRow>
                        <DataTableRow className="nk-tb-col-tools text-end">
                          <ul className="nk-tb-actions gx-1">
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="text-soft dropdown-toggle btn btn-icon btn-trigger">
                                  <Icon name="more-h"></Icon>
                                </DropdownToggle>
                                <DropdownMenu end>
                                  <ul className="link-list-opt no-bdr">
                                    <li onClick={() => onEditClick(item.id)}>
                                      <DropdownItem
                                        tag="a"
                                        href="#edit"
                                        onClick={(ev) => {
                                          ev.preventDefault();
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
              {data && data.length > 0 ? (
                <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={data.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">No projects found</span>
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
              <h5 className="title">Add Project</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onFormSubmit)}>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={formData.title}
                        placeholder="Enter Title"
                        onChange={(e) => onInputChange(e)}
                        className="form-control"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.title && <span className="invalid">{errors.title.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Client</label>
                      <input
                        type="text"
                        name="subtitle"
                        defaultValue={formData.subtitle}
                        placeholder="Enter client name"
                        onChange={(e) => onInputChange(e)}
                        className="form-control"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.subtitle && <span className="invalid">{errors.subtitle.message}</span>}
                    </div>
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
                      <label className="form-label">Number of Tasks</label>
                      <input
                        type="number"
                        name="tasks"
                        defaultValue={formData.tasks}
                        onChange={(e) => onInputChange(e)}
                        className="form-control"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.tasks && <span className="invalid">{errors.tasks.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Total Tasks</label>
                      <input
                        type="number"
                        name="totalTask"
                        defaultValue={formData.totalTask}
                        onChange={(e) => onInputChange(e)}
                        className="form-control"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.totalTask && <span className="invalid">{errors.totalTask.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
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
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Add Project
                        </Button>
                      </li>
                      <li>
                        <Button
                          onClick={(ev) => {
                            ev.preventDefault();
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
              <h5 className="title">Update Project</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={formData.title}
                        placeholder="Enter Title"
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        className="form-control"
                      />
                      {errors.title && <span className="invalid">{errors.title.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Client</label>
                      <input
                        type="text"
                        name="subtitle"
                        defaultValue={formData.subtitle}
                        placeholder="Enter client Name"
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        className="form-control"
                      />
                      {errors.subtitle && <span className="invalid">{errors.subtitle.message}</span>}
                    </div>
                  </Col>
                  <Col size="12">
                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        defaultValue={formData.description}
                        placeholder="Your description"
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        className="form-control no-resize"
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Number of Tasks</label>
                      <input
                        type="number"
                        name="tasks"
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.tasks}
                        className="form-control"
                      />
                      {errors.tasks && <span className="invalid">{errors.tasks.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Total Tasks</label>
                      <input
                        type="number"
                        name="totalTask"
                        min={formData.totalTask}
                        defaultValue={formData.totalTask}
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        className="form-control"
                      />
                      {errors.totalTask && <span className="invalid">{errors.totalTask.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
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
                      <RSelect
                        options={teamList}
                        isMulti
                        defaultValue={formData.team}
                        onChange={(e) => setFormData({ ...formData, team: e })}
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Lead</label>
                      <RSelect
                        options={formData.team}
                        defaultValue={[{ value: formData.lead, label: formData.lead }]}
                        onChange={(e) => setFormData({ ...formData, lead: e.value })}
                      />
                    </div>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Update Project
                        </Button>
                      </li>
                      <li>
                        <Button
                          onClick={(ev) => {
                            ev.preventDefault();
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

export default ScheduledBuses;
