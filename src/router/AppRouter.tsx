import { Routes, Route, Link } from "react-router-dom";
import { LoginPage } from '../pages/Authentication/LoginPage';
import { UserPage } from '../pages/UserPages/UserPage';

export const AppRouter = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/userDashboard" element={<UserPage />} />
      </Routes>
    </div>
  );
}