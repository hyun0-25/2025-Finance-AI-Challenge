import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileFrame from "./layouts/MobileFrame";
import ReportsPage from "./pages/ReportsPage";

function App() {
  return (
    <BrowserRouter>
      <MobileFrame>

        <Routes>
          <Route path="/reports" element={<ReportsPage />} />
          {/* 다른 페이지도 필요시 추가 */}
        </Routes>
      </MobileFrame>
    </BrowserRouter>
  );
}

export default App;
