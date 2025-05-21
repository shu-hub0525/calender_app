import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopPage from "./pages/top/topPage.tsx";
import SignupPage from "./pages/signup/signupPage";
import AdminLoginPage from "./pages/admin/login/loginPage.tsx";
import AdminMeetingPage from "./pages/admin/meeting/meetingPage.tsx";
import StudentLoginPage from "./pages/student/login/loginPage.tsx";
import StudentMeetingPage from "./pages/student/meeting/meetingPage.tsx";

// 認証チェック用コンポーネント
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  // ここではlocalStorageに"access_token"があればログイン済みとみなす例
  const token = localStorage.getItem("access_token");
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/admin/login" element={<AdminLoginPage />} /> 
        <Route path="/admin/meeting" element={<AdminMeetingPage />} />

        <Route path ="/student/login" element={<StudentLoginPage />} />
        <Route path ="/student/meeting" element={<StudentMeetingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
