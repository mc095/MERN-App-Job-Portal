import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/UpdateJob";
import JobDetails from "../Pages/JobDetails";
import Resumes from "../Pages/Resumes";

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
        loader: ({ params }) => fetch(`https://mern-app-job-portal-backend.vercel.app/all-jobs/${params.id}`)
      },
      { path: "/job/:id", element: <JobDetails /> },
      { path: "/resumes", element: <Resumes /> }
    ]
  }
]);

export default router;
