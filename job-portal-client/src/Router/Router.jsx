import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/UpdateJob";
import JobDetails from "../Pages/JobDetails";
import Resumes from "../Pages/Resumes";
import Signup from "../Pages/Signup"; // Updated import
import Login from "../Pages/Login"; // Updated import

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/post-job", element: <CreateJob /> },
      { path: "/my-job", element: <MyJobs /> },
      { path: "/salary", element: <SalaryPage /> },
      {
        path: "/edit-job/:id",
        element: <UpdateJob />,
        loader: ({ params }) => fetch(`http://localhost:5000/all-jobs/${params.id}`)
      },
      { path: "/job/:id", element: <JobDetails /> },
      { path: "/resumes", element: <Resumes /> },
      { path: "/signup", element: <Signup /> }, // Updated component import
      { path: "/login", element: <Login /> } // Updated component import
    ]
  }
]);

export default router;
