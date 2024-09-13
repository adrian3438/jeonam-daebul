import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="login">
      <section>
        <p className="login-p-1">스마트 제조 혁신</p>
        <h1>도면 및 검사관리 솔루션 V1.0</h1>
        <p className="login-p-2">3차원 모델링의 업무 기록으로 언제 어디서든 빠른 정보 파악과<br/>
          기록된 업무 내용 공유를 통한 차별화된 업무 협업
        </p>
      </section>
      <section>
        <h2>로그인</h2>
        <form>
          <fieldset className="input-email">
            <label htmlFor="email">이메일</label>
            <input id="email" type="text"/>
          </fieldset>
          <fieldset className="input-password">
            <label htmlFor="password">이메일</label>
            <input id="password" type="password"/>
          </fieldset>
          <fieldset>
            <Link href="#">회원가입</Link> | <Link href="#">비밀번호 찾기</Link>
          </fieldset>
          <input type="submit" value="로그인"/>
        </form>
        <p><Image src="/images/login/img_logo.svg" alt="전남대불산학융합원" width={295} height={43}/></p>
      </section>
    </div>
  );
}
