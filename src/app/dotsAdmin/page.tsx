import AdminLoginPage from '@/components/Pages/AdminLoginPage';
import '../assets/login.scss'
import api from "@/lib/api";

export default function AdminLogin() {
  return (
      <div className="login">
        <section className="bg-section">
          <div>
            <p className="login-p-1">스마트 제조 혁신[관리자화면]</p>
            <h1>도면 및 검사관리 솔루션 V1.0</h1>
            <p className="login-p-2">3차원 모델링의 업무 기록으로 언제 어디서든 빠른 정보 파악과<br/>
              기록된 업무 내용 공유를 통한 차별화된 업무 협업
            </p>
          </div>
        </section>
        <AdminLoginPage

        />
      </div>
  );
}
