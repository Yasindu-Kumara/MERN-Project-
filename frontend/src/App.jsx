import LocationPage from "./pages/location_page";
import DevicePage from "./pages/device_page";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home_page";
import { ValidationSchemaExample } from "./pages/test";

function App() {
  return (
    <>
      <Routes>
        <Route element={<HomePage />}>
          <Route path="/" element={<LocationPage />} /> <Route path="/test" element={<ValidationSchemaExample />} />
          <Route path="/device" element={<DevicePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
