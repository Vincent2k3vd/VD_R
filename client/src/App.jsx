import { RouterProvider } from "react-router-dom";
import routes from "./routers/routes.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer
        position="top-right"
        autoClose={3000} // 3s
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
