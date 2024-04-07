/* eslint-disable no-unused-vars */
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
import OpenRoute from "./components/core/Auth/OpenRoute"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error"
import Settings from "./components/core/Dashboard/Settings";
import { useSelector } from "react-redux";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import RequestedAppointments from "./components/core/Dashboard/RequestedAppointments";
import ExploreDoctors from "./components/core/Dashboard/ExploreDoctors";
import ViewPatientReports from "./components/core/Dashboard/ViewPatientReports";
import ViewAppointedDoctors from "./components/core/Dashboard/ViewAppointedDoctors";
import OurTech from "./components/common/OurTech";



function App() {

  const { user } = useSelector((state) => state.profile)

  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="catalog/:catalogName" element={<Catalog />} /> */}
        <Route path="courses/:courseId" element={<CourseDetails />} />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="/about"
          element={

            <About />

          }
        />
        <Route path="/our-technologies" element={<OurTech />} />


        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* child paths and their respective components */}
          {/* common for student and instructor */}
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="Settings" element={<Settings />} />

          {/* specific for student */}
          {
            user?.accountType === ACCOUNT_TYPE.PATIENT && (
              <>
                <Route path="cart" element={<Cart />} />
                <Route path="enrolled-courses" element={<EnrolledCourses />} />
                <Route path="requested-appointments" element={<RequestedAppointments />} />
                <Route path="explore-doctors" element={<ExploreDoctors />} />
                <Route path="View-your-reports" element={<ViewPatientReports />} />
                <Route path="confirmed-appointments-with-doctors" element={<ViewAppointedDoctors />} />
              </>
            )
          }
          {/* specific for instructor */}
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="instructor" element={<Instructor />} />
                <Route path="add-course" element={<AddCourse />} />
                <Route path="my-courses" element={<MyCourses />} />
                <Route path="edit-course/:courseId" element={<EditCourse />} />
              </>
            )
          }

        </Route>


        <Route element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        }>

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
            )
          }

        </Route>



        <Route path="*" element={<Error />} />


      </Routes>

    </div>
  );
}

export default App;
