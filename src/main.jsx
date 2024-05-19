import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useParams
} from "react-router-dom";

import {App} from './App.jsx'
import { MainTask, TaskDetail } from './taskComponents/mainTask.jsx'
import {ROUT_PATH} from './utils.js'


const router = createBrowserRouter([
    {
      path: ROUT_PATH['home'],
      element: <App />,
    },
    {
      path: ROUT_PATH['task'],
      children: [
        {
            path: "",
            element: <MainTask />,
        },
        {
            path: ROUT_PATH['task_detail'],
            element: <TaskDetail />,
        },
      ],
    },
  ]);



createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
  );

// React.ReactDOM.createRoot(document.getElementById('root')).render(
//     <App />
// )

// createRoot(document.getElementById("root")).render(
//     <App />
//   );
