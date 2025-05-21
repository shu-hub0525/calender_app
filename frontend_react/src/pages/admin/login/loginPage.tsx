import Header from "../../../components/header/header";
import './LoginPage.css';
import { useState } from "react";

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8173/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          administorator_code: Number(adminCode),
        }),
      });
      if (!res.ok) {
        setError("ログインに失敗しました");
        return;
      }
      const data = await res.json();
      // トークン保存や画面遷移など
      alert("ログイン成功: " + data.access_token);
    } catch {
      setError("通信エラーが発生しました");
    }
  };

  return (
    //<Header title="管理者ログイン" />
    <div className="login-container">
      <div className="login-title">NakaLab App</div>
      <div className="login-subtitle">管理者</div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>ID</label>
          <input className="login-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>パスワード</label>
          <input className="login-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>管理者コード</label>
          <input className="login-input" type="number" value={adminCode} onChange={e => setAdminCode(e.target.value)} required />
        </div>
        <button className="login-button" type="submit">ログイン</button>
        {error && <div style={{color:"red"}}>{error}</div>}
      </form>
    </div>
      
  );
};

export default AdminLoginPage;