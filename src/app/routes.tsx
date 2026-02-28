import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { StudentDashboard } from "./pages/StudentDashboard";
import { AssignmentSubmission } from "./pages/AssignmentSubmission";
import { FacultyDashboard } from "./pages/FacultyDashboard";
import { GradingPage } from "./pages/GradingPage";
import { ViewGrades } from "./pages/ViewGrades";
import { StudentProfile } from "./pages/StudentProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/student/dashboard",
    Component: StudentDashboard,
  },
  {
    path: "/student/submit",
    Component: AssignmentSubmission,
  },
  {
    path: "/student/grades",
    Component: ViewGrades,
  },
  {
    path: "/student/profile",
    Component: StudentProfile,
  },
  {
    path: "/faculty/dashboard",
    Component: FacultyDashboard,
  },
  {
    path: "/faculty/grade/:submissionId",
    Component: GradingPage,
  },
]);