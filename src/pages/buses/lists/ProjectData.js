import TeamImg from "../../../images/avatar/b-sm.jpg";
import TeamImg2 from "../../../images/avatar/c-sm.jpg";
import TeamImg3 from "../../../images/avatar/a-sm.jpg";
import TeamImg4 from "../../../images/avatar/d-sm.jpg";

import { setDeadline } from "../../../utils/Utils";

export const projectData = [
  {
    id: 1,
    avatarClass: "purple",
    title: "Dashlite Development",
    subtitle: "Softnio",
    desc: "Design and develop the DashLite template for Envato Marketplace",
    lead: "Abu Bin",
    tasks: "3",
    totalTask: "93",
    checked: false,
    deadline: setDeadline(20), // Format ** mm/dd/yyyy
    team: [
      {
        value: "Abu Bin",
        label: "Abu Bin",
        image: null,
        theme: "purple",
      },
      { value: "Milagros Betts", label: "Milagros Betts", theme: "pink" },
      { value: "Ryu Duke", label: "Ryu Duke", theme: "orange" },
    ],
  },
  {
    id: 2,
    avatarClass: "warning",
    title: "Redesign Website",
    subtitle: "Runnergy",
    desc: "Design the website for Runnergy main website including their user dashboard.",
    tasks: "25",
    totalTask: "230",
    lead: "Newman John",
    checked: false,
    deadline: setDeadline(5), // Format ** mm/dd/yyyy
    team: [
      {
        value: "Abu Bin",
        label: "Abu Bin",
        image: TeamImg2,
        theme: "purple",
      },
      {
        value: "Newman John",
        label: "Newman John",
        image: null,
        theme: "primary",
      },
    ],
  },
  {
    id: 3,
    avatarClass: "info",
    title: "Keyword Research for SEO",
    subtitle: "Techyspec",
    desc: "Improve SEO keyword research, A/B testing, Local market improvement",
    tasks: "2",
    totalTask: "15",
    lead: "Abu Bin",
    checked: false,
    deadline: setDeadline(1), // Format ** mm/dd/yyyy
    team: [
      {
        value: "Abu Bin",
        label: "Abu Bin",
        image: TeamImg3,
        theme: "purple",
      },
    ],
  },
  {
    id: 4,
    avatarClass: "danger",
    title: "Website Development",
    subtitle: "Fitness Next",
    desc: "Develop the website using WordPree for the Fitness Next client.",
    tasks: "44",
    totalTask: "65",
    lead: "Newman John",
    checked: false,
    deadline: setDeadline(5), // Format ** mm/dd/yyyy
    team: [
      {
        value: "Newman John",
        label: "Newman John",
        theme: "purple",
      },
      {
        value: "Abu Bin",
        label: "Abu Bin",
        image: TeamImg2,
        theme: "purple",
      },
    ],
  },
  {
    id: 5,
    avatarClass: "info",
    title: "Website Keyword Research for SEO",
    subtitle: "Techyspec",
    desc: "Improve SEO keyword research, A/B testing, Local market improvement.",
    tasks: "8",
    totalTask: "100",
    lead: "Joshua Wilson",
    checked: false,
    deadline: setDeadline(11), // Format ** mm/dd/yyyy
    team: [
      { value: "Joshua Wilson", label: "Joshua Wilson", theme: "pink" },
      {
        value: "Abu Bin",
        label: "Abu Bin",
        image: TeamImg4,
        theme: "purple",
      },
    ],
  },
  {
    id: 6,
    avatarClass: "purple",
    title: "Dashlite Development",
    subtitle: "Softnio",
    desc: "Design and develop the DashLite template for Envato Marketplace",
    tasks: "3",
    totalTask: "25",
    lead: "Milagros Betts",
    checked: false,
    deadline: setDeadline(15), // Format ** mm/dd/yyyy
    team: [
      { value: "Joshua Wilson", label: "Joshua Wilson", theme: "pink" },
      { value: "Milagros Betts", label: "Milagros Betts", theme: "purple" },
      { value: "Ryu Duke", label: "Ryu Duke", theme: "orange" },
      {
        value: "Abu Bin",
        label: "Abu Bin",
        theme: "purple",
      },
      { value: "Aliah Pitts", label: "Aliah Pitts", theme: "blue" },
    ],
  },
  {
    id: 7,
    avatarClass: "danger",
    title: "Website Development",
    subtitle: "Fitness Next",
    desc: "Develop the website using WordPree for the Fitness Next client.",
    tasks: "44",
    totalTask: "65",
    lead: "Newman John",
    checked: false,
    deadline: setDeadline(5), // Format ** mm/dd/yyyy
    team: [
      {
        value: "Newman John",
        label: "Newman John",
        theme: "purple",
      },
      {
        value: "Abu Bin",
        label: "Abu Bin",
        image: TeamImg2,
        theme: "purple",
      },
    ],
  },
  {
    id: 8,
    avatarClass: "warning",
    title: "Redesign Website",
    subtitle: "Runnergy",
    desc: "Design the website for Runnergy main website including their user dashboard.",
    tasks: "25",
    totalTask: "30",
    lead: "Ryu Duke",
    checked: false,
    deadline: setDeadline(25), // Format ** mm/dd/yyyy
    team: [
      {
        value: "Abu Bin",
        label: "Abu Bin",
        image: TeamImg2,
        theme: "purple",
      },
      { value: "Ryu Duke", label: "Ryu Duke", theme: "orange" },
    ],
  },
  {
    id: 9,
    avatarClass: "warning",
    title: "Redesign Logo",
    subtitle: "Runnergy",
    desc: "Design the logo for Runnergy main website including their user dashboard logos.",
    tasks: "5",
    totalTask: "15",
    lead: "Aliah Pitts",
    checked: false,
    deadline: setDeadline(2), // Format ** mm/dd/yyyy
    team: [{ value: "Aliah Pitts", label: "Aliah Pitts", theme: "blue" }],
  },
  {
    id: 10,
    avatarClass: "danger",
    title: "Convert to React",
    subtitle: "Softnio",
    desc: "Convert existing project to a react application",
    tasks: "500",
    totalTask: "2005",
    lead: "Joshua Wilson",
    checked: false,
    deadline: setDeadline(45), // Format ** mm/dd/yyyy
    team: [
      {
        value: "Abu Bin",
        label: "Abu Bin",
        image: TeamImg4,
        theme: "purple",
      },
      {
        value: "Newman John",
        label: "Newman John",
        theme: "purple",
      },
      {
        value: "Joshua Wilson",
        label: "Joshua Wilson",
        image: TeamImg,
        theme: "purple",
      },
    ],
  },
  {
    id: 11,
    avatarClass: "blue",
    title: "Redesign Website",
    subtitle: "Techyspeck",
    desc: "Design the websites for Runnergy main website including their user dashboard logos.",
    tasks: "14",
    totalTask: "15",
    lead: "Abu Bin",
    checked: false,
    deadline: setDeadline(10), // Format ** mm/dd/yyyy
    team: [
      {
        value: "Abu Bin",
        label: "Abu Bin",
        image: TeamImg2,
        theme: "purple",
      },
    ],
  },
  {
    id: 12,
    avatarClass: "pink",
    title: "Create an Vue Application",
    subtitle: "MightyPhillipes",
    desc: "Create a Vue application, with the designs given",
    tasks: "1",
    totalTask: "15",
    lead: "Newman John",
    checked: false,
    deadline: setDeadline(46), // Format ** mm/dd/yyyy
    team: [
      {
        value: "Newman John",
        label: "Newman John",
        theme: "purple",
      },
      {
        value: "Abu Bin",
        label: "Abu Bin",
        image: TeamImg,
        theme: "purple",
      },
    ],
  },
  {
    id: 13,
    avatarClass: "Secondary",
    title: "Host a website in AWS",
    subtitle: "MightyPhillipes",
    desc: "Host a created website using AWS web services",
    tasks: "50",
    totalTask: "70",
    lead: "Newman John",
    checked: false,
    deadline: setDeadline(90), // Format ** mm/dd/yyyy
    team: [
      {
        value: "Newman John",
        label: "Newman John",
        theme: "purple",
      },
    ],
  },
  {
    id: 14,
    avatarClass: "danger",
    title: "Website Development",
    subtitle: "Fitness Next",
    desc: "Develop the website using WordPree for the Fitness Next client.",
    tasks: "44",
    totalTask: "65",
    lead: "Ryu Duke",
    checked: false,
    deadline: setDeadline(5), // Format ** mm/dd/yyyy
    team: [
      { value: "Ryu Duke", label: "Ryu Duke", theme: "orange" },
      {
        value: "Abu Bin",
        label: "Abu Bin",
        image: TeamImg3,
        theme: "purple",
      },
    ],
  },
  {
    id: 15,
    avatarClass: "info",
    title: "Website Keyword Research for SEO",
    subtitle: "Techyspec",
    desc: "Improve SEO keyword research, A/B testing, Local market improvement.",
    tasks: "8",
    totalTask: "100",
    lead: "Abu Bin",
    checked: false,
    deadline: setDeadline(11), // Format ** mm/dd/yyyy
    team: [
      {
        value: "Newman John",
        label: "Newman John",
        image: TeamImg3,
        theme: "purple",
      },
      {
        value: "Abu Bin",
        label: "Abu Bin",
        image: TeamImg4,
        theme: "purple",
      },
    ],
  },
  {
    id: 16,
    avatarClass: "purple",
    title: "Dashlite Development",
    subtitle: "Softnio",
    desc: "Design and develop the DashLite template for Envato Marketplace",
    tasks: "3",
    totalTask: "25",
    lead: "Milagros Betts",
    checked: false,
    deadline: setDeadline(15), // Format ** mm/dd/yyyy
    team: [
      {
        value: "Abu Bin",
        label: "Abu Bin",
        theme: "purple",
      },
      {
        value: "Milagros Betts",
        label: "Milagros Betts",
        image: TeamImg,
        theme: "purple",
      },
      {
        value: "Joshua Wilson",
        label: "Joshua Wilson",
        image: TeamImg,
        theme: "purple",
      },
    ],
  },
  {
    id: 17,
    avatarClass: "danger",
    title: "Website Development",
    subtitle: "Fitness Next",
    desc: "Develop the website using WordPree for the Fitness Next client.",
    tasks: "44",
    totalTask: "65",
    lead: "Joshua Wilson",
    checked: false,
    deadline: setDeadline(5), // Format ** mm/dd/yyyy
    team: [
      { value: "Joshua Wilson", label: "Joshua Wilson", theme: "pink" },
      {
        value: "Abu Bin",
        label: "Abu Bin",
        image: TeamImg2,
        theme: "purple",
      },
    ],
  },
  {
    id: 18,
    avatarClass: "warning",
    title: "Redesign Website",
    subtitle: "Runnergy",
    desc: "Design the website for Runnergy main website including their user dashboard.",
    tasks: "25",
    totalTask: "30",
    lead: "Newman John",
    checked: false,
    deadline: setDeadline(25), // Format ** mm/dd/yyyy
    team: [
      {
        value: "Abu Bin",
        label: "Abu Bin",
        image: TeamImg2,
        theme: "purple",
      },
      {
        value: "Newman John",
        label: "Newman John",
        image: null,
        theme: "primary",
      },
    ],
  },
  {
    id: 19,
    avatarClass: "warning",
    title: "Redesign Logo",
    subtitle: "Runnergy",
    desc: "Design the logo for Runnergy main website including their user dashboard logos.",
    tasks: "5",
    totalTask: "15",
    lead: "Milagros Betts",
    checked: false,
    deadline: setDeadline(2), // Format ** mm/dd/yyyy
    team: [{ value: "Milagros Betts", label: "Milagros Betts", theme: "purple" }],
  },
];
export const scheduledBuses = [
  {
    id: 1,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 1",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(70).fill(0),
  },
  {
    id: 2,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 2",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(50).fill(0),
  },
  {
    id: 3,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 3",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(35).fill(0),
  },
  {
    id: 4,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 4",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(20).fill(0),
  },
  {
    id: 5,
    image: null,
    number: "AB123CE",
    driver: {
      image: null,
      name: "Driver 5",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(70).fill(0),
  },
  {
    id: 6,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 6",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(70).fill(0),
  },
  {
    id: 7,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 7",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(70).fill(0),
  },
  {
    id: 8,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 8",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(70).fill(0),
  },
  {
    id: 9,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 9",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(70).fill(0),
  },
  {
    id: 10,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 10",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(70).fill(0),
  },
  {
    id: 1,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 11",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(70).fill(0),
  },
  {
    id: 12,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 12",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(70).fill(0),
  },
  {
    id: 13,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 13",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(70).fill(0),
  },
  {
    id: 14,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 14",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(70).fill(0),
  },
  {
    id: 15,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 15",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(70).fill(0),
  },
  {
    id: 16,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 16",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(70).fill(0),
  },
  {
    id: 17,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 17",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(70).fill(0),
  },
  {
    id: 18,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 18",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(70).fill(0),
  },
  {
    id: 19,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 19",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(70).fill(0),
  },
  {
    id: 20,
    image: null,
    number: "ABC123CE",
    driver: {
      image: null,
      name: "Driver 20",
    },
    departure: {
      date: "05-06-2023",
    },
    seats: Array(70).fill(0),
  },
];

export const teamList = [
  { value: "Abu Bin", label: "Abu Bin", theme: "purple" },
  { value: "Newman John", label: "Newman John", theme: "primary" },
  { value: "Milagros Betts", label: "Milagros Betts", theme: "purple" },
  { value: "Joshua Wilson", label: "Joshua Wilson", theme: "pink" },
  { value: "Ryu Duke", label: "Ryu Duke", theme: "orange" },
  { value: "Aliah Pitts", label: "Aliah Pitts", theme: "blue" },
];
