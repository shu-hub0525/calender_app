import Header from "../../../components/header/header";
import { useState } from "react";

const StudentLoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8173/auth/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
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
    <>
      <Header title="学生ログイン" />
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>パスワード</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">ログイン</button>
        {error && <div style={{color:"red"}}>{error}</div>}
      </form>
    </>
  );
};

export default StudentLoginPage;