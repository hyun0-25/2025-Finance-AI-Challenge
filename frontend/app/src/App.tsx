import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileFrame from "./layouts/MobileFrame";
import HomePage from "./pages/HomePage";
import ReportsPage from "./pages/ReportsPage";
import CardRecommendPage from "./pages/CardRecommendPage";
import CardDetailPage from "./pages/CardDetailPage";
import AlarmPage from "./pages/AlarmPage";

function App() {
  return (
    <BrowserRouter>
      <MobileFrame>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/card-recommend" element={<CardRecommendPage />} />
          <Route path="/card-detail/:cardName" element={<CardDetailPage />} />
          <Route path="/alarm" element={<AlarmPage />} />
          {/* 다른 페이지도 필요시 추가 */}
        </Routes>
      </MobileFrame>
    </BrowserRouter>
  );
}

export default App;
