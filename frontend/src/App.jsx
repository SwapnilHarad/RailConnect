import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import NewApplication from "./pages/NewApplication";
import ViewApplications from "./pages/ViewApplications";
import PortalSelection from "./pages/PortalSelection";
import StaffLogin from "./pages/staff/StaffLogin";
import StaffRegister from "./pages/staff/StaffRegister";
import StaffPortal from "./pages/staff/StaffPortal";
import StaffApplications from "./pages/staff/StaffApplications";
import StaffApplicationReview from "./pages/staff/StaffApplicationReview";
import StaffPending from "./pages/staff/StaffPending";
import StaffApproved from "./pages/staff/StaffApproved";
import StaffRejected from "./pages/staff/StaffRejected";
import StudentProfile from "./pages/StudentProfile";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">

      <Routes
        location={location}
        key={location.pathname}
      >

        <Route
  path="/"
  element={
    <PageTransition>
      <PortalSelection />
    </PageTransition>
  }
/>

        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />

        <Route
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />

        <Route
          path="/studentDashboard"
          element={
            <PageTransition>
              <StudentDashboard />
            </PageTransition>
          }
        />

        <Route
          path="/new-application"
          element={
            <PageTransition>
              <NewApplication />
            </PageTransition>
          }
        />

        <Route
          path="/applications"
          element={
            <PageTransition>
              <ViewApplications />
            </PageTransition>
          }
        />

        <Route
  path="/staff/login"
  element={
    <PageTransition>
      <StaffLogin />
    </PageTransition>
  }
/>

<Route
  path="/student"
  element={
    <PageTransition>
      <Landing />
    </PageTransition>
  }
/>

<Route
          path="/StaffRegister"
          element={
            <PageTransition>
              <StaffRegister />
            </PageTransition>
          }
        />

        <Route
  path="/staff/portal"
  element={
    <PageTransition>
      <StaffPortal />
    </PageTransition>
  }
/>

<Route
  path="/staff/applications"
  element={
    <PageTransition>
      <StaffApplications />
    </PageTransition>
  }
/>

<Route
  path="/staff/applications/:id"
  element={
    <PageTransition>
      <StaffApplicationReview />
    </PageTransition>
  }
/>

<Route
  path="/staff/pending"
  element={
    <PageTransition>
      <StaffPending />
    </PageTransition>
  }
/>

<Route
  path="/staff/approved"
  element={
    <PageTransition>
      <StaffApproved />
    </PageTransition>
  }
/>

<Route
  path="/staff/rejected"
  element={
    <PageTransition>
      <StaffRejected />
    </PageTransition>
  }
/>

<Route
  path="/profile"
  element={
    <PageTransition>
      <StudentProfile />
    </PageTransition>
  }
/>

      </Routes>

    </AnimatePresence>
  );
};


const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -15,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};


function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;