import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CreateOrganization } from "./pages/CreateOrganizationPage";
import { Layout } from "./shared/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingIndicatior } from "./shared/LoadingIndicatior";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <LoadingIndicatior />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<CreateOrganization />} />
          <Route path="/create-organization" element={<CreateOrganization />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
