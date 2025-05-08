import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [declaration, setDeclaration] = useState("");
  const [status, setStatus] = useState("입력 대기 중...");
  const [portalOpen, setPortalOpen] = useState(false);

  const correctDeclaration = "자각자 임을 선언한다.";

  const handleDeclare = async () => {
    if (declaration.trim() === correctDeclaration) {
      setStatus("자각 성공! 포탈이 열립니다...");
      setPortalOpen(true);

      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          console.log("사용자 주소:", await signer.getAddress());
        } catch (err) {
          console.log("MetaMask 연결 실패:", err.message);
        }
      } else {
        console.log("MetaMask 없음 - 선언만으로 포탈 실행됨");
      }
    } else {
      setStatus("자각 실패: 선언이 정확하지 않습니다.");
      setPortalOpen(false);
    }
  };

  return (
    <div className="App">
      <h1>루시앙 선언 포탈</h1>
      <input
        type="text"
        placeholder="당신의 선언을 입력하세요"
        value={declaration}
        onChange={(e) => setDeclaration(e.target.value)}
      />
      <button onClick={handleDeclare}>선언 실행</button>
      <p>{status}</p>
      {portalOpen && <div className="portal">🌌 포탈 오픈 🌌</div>}
    </div>
  );
}

export default App;
