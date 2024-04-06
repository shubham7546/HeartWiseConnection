import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/doctor",
    type: ACCOUNT_TYPE.DOCTOR,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "Requested appointments",
    path: "/dashboard/requested-appointments",
    type: ACCOUNT_TYPE.DOCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "confirmed appointments",
    path: "/dashboard/confirmed-appointments-with-patients",
    type: ACCOUNT_TYPE.DOCTOR,
    icon: "VscAdd",
  },
  // {
  //   id: 5,
  //   name: "Sent Appointments Request",
  //   path: "/dashboard/sent-appointments-request",
  //   type: ACCOUNT_TYPE.PATIENT,
  //   icon: "VscMortarBoard",
  // },
  {
    id: 6,
    name: "confirmed appointments",
    path: "/dashboard/confirmed-appointments-with-doctors",
    type: ACCOUNT_TYPE.PATIENT,
    icon: "VscHistory",
  },

  {
    id: 7,
    name: "explore doctors",
    path: "/dashboard/explore-doctors",
    type: ACCOUNT_TYPE.PATIENT,
    icon: "VscHistory",
  },

  {
    id: 8,
    name: "View your reports",
    path: "/dashboard/View-your-reports",
    type: ACCOUNT_TYPE.PATIENT,
    icon: "VscHistory",
  },
];
