// src/Pages/MainPages/MyPage.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import "./styles/MyPage.css";
import FileLogo from "../../Image/Icon/FileLogo.svg";

const MyPage = () => {
  const [user, setUser] = useState(null);
  const address =
    process.env.REACT_APP_BACKEND_ADDRESS || "http://localhost:5000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const parseJwt = (token) => {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
        return null;
      }
    };

    const decoded = parseJwt(token);
    const userEmail = decoded?.userEmail;
    if (!userEmail) return;

    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          `${address}/auth/get-user`,
          { email: userEmail },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("❌ 사용자 정보 불러오기 실패:", error.response || error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return (
      <div className="mypage_wrapper">
        <MemberNavigation />
        <div className="mypage_loading">사용자 정보를 불러오는 중입니다...</div>
      </div>
    );
  }

  return (
    <div className="mypage_wrapper">
      <MemberNavigation />

      <header>
        {/* 페이지 인덱스 */}
        <div className="mypage_index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2>회원 정보 열람 / 수정</h2>
        </div>
      </header>

      <div className="mypage_content">
        <p className="mypage_welcome">
          <strong>
            [{user.name}] [{user.role === "personal" ? "개인회원" : "헤드헌터"}]
          </strong>
          님, 반가워요!
        </p>
        <button className="mypage_edit-button">회원 정보 수정</button>

        <div className="mypage_info-box">
          <div className="mypage_row">
            <span>이름</span>
            <span>{user.name}</span>
          </div>
          <div className="mypage_row">
            <span>이메일</span>
            <span>{user.email}</span>
          </div>
          <div className="mypage_row">
            <span>비밀번호</span>
            <span>************</span>
          </div>
          <div className="mypage_row">
            <span>개인전화번호</span>
            <span>
              {user.phone.replace(/(\d{3})-?\d{4}-?(\d{4})/, "$1 - **** - $2")}
            </span>
          </div>
          <div className="mypage_row">
            <span>회원 형식</span>
            <span>{user.role === "headhunter" ? "헤드헌터" : "개인회원"}</span>
          </div>
          <div className="mypage_row">
            <span>회사/점포명</span>
            <span>{user.company_name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
