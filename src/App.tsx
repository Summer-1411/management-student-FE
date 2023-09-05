import Home from "./pages/Home/Home"
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login/Login"
import DepartmentManager from "./components/department";
import MajorManager from "./components/major";
import TeacherManager from "./components/teacher";
import SubjectManager from "./components/subject";
import ClassSectionDetail from "./components/classSection/components/detail";
import { useSelector } from "react-redux";
import { ReactNode } from "react";
import ListClassRoot from "./components/class/components/listClass";
import ClassDetailRoot from "./components/class/components/detail";
import StudentRoot from "./components/student";
import ClassSectionRoot from "./components/classSection";
import ClassSectionDetailRoot from "./components/classSection/components/detail";
import { notification } from 'antd';
import Dashboard from "./components/dashboard";
function App() {
  const currentUser = useSelector((state: any) => state.user.currentUser);


  const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    if (!currentUser) {
      console.log('1');
      return <Navigate to="/login" />
    }
    return children
  }
  const AdminRoute = ({ children }: { children: ReactNode }) => {
    if ((currentUser.role === 2)) {
      return children
    }
    // toast.success("Bạn đã đăng nhập với vai trò Admin", toastOption)
    return <Navigate to="/login" />
  }
  const Logged = ({ children }: { children: ReactNode }) => {
    if (currentUser) {
      return <Navigate to="/" />
    }
    return children
  }
  console.log('currentUser', currentUser);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><AdminRoute><Home /></AdminRoute></ProtectedRoute>,
      children: [
        {
          path: "/",
          element: <Dashboard />
        },
        {
          path: "/department",
          element: <Outlet />,
          children: [
            {
              path: "",
              element: <DepartmentManager />
            }

          ]
        },
        {
          path: "/major",
          element: <MajorManager />
        },
        {
          path: "/teacher",
          element: <TeacherManager />
        },
        {
          path: "/subject",
          element: <SubjectManager />
        },
        {
          path: "/class-section",
          element: <ClassSectionRoot />
        },
        {
          path: "/class-section-detail/:id",
          element: <ClassSectionDetailRoot />
        },
        {
          path: "/class",
          element: <Outlet />,
          children: [
            {
              path: "",
              element: <ListClassRoot />
            },
            {
              path: "detail/:id",
              element: <ClassDetailRoot />
            }
          ]
        },
        {
          path: "/student",
          element: <StudentRoot />
        }
      ]
    },
    {
      path: "/login",
      element: <Logged><Login /></Logged>,
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
