import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./screens/Dashboard";

function App() {
  return (
    <BrowserRouter>
    {/* This is root layout */}
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard /> } />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
