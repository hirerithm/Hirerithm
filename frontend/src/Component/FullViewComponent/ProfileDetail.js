import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileIcon from "../../Image/Icon/ProfileIcon.svg";
import "./profileDetail.css";
import PdfDownload from "../../Image/Icon/PdfDownload.svg";
import EmptyHeart from "../../Image/Icon/heart_empty.svg";
import FilledHeart from "../../Image/Icon/heart_filled.svg";

const ProfileDetail = ({
  onClose,
  name,
  keyword,
  age,
  userEmail,
  resume_id,
  onToggleWishlist,
}) => {
  const [liked, setLiked] = useState(false);
  const BACK_URL = process.env.REACT_APP_BACKEND_ADDRESS;

  useEffect(() => {
    axios
      .get(`${BACK_URL}/resume/wishlist/${userEmail}`)
      .then((res) => {
        const wishedIds = res.data.map((resume) => resume.resume_id);
        setLiked(wishedIds.includes(resume_id));
      })
      .catch((err) => console.error("찜 상태 확인 실패:", err));
  }, [userEmail, resume_id]);

  const toggleWishlist = async () => {
    try {
      if (liked) {
        await axios.delete(
          `${BACK_URL}/resume/wishlist/${userEmail}/${resume_id}`
        );
        setLiked(false);
        onToggleWishlist?.(resume_id, false); // 상태 변경 알림
      } else {
        await axios.post(
          `${BACK_URL}/resume/wishlist/${userEmail}/${resume_id}`
        );
        setLiked(true);
        onToggleWishlist?.(resume_id, true); // 상태 변경 알림
      }
    } catch (err) {
      console.error("찜 토글 실패:", err);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </header>

        <div className="detail-wrapper">
          <div className="profile">
            <img src={ProfileIcon} alt="-" />
          </div>

          <div className="detail">
            <h1>
              {name} 후보자 ({age}세)
              <button
                className="detail-heart-toggle-btn"
                onClick={toggleWishlist}
              >
                <img alt="찜하기" src={liked ? FilledHeart : EmptyHeart} />
              </button>
            </h1>
            <ul>
              {keyword?.map((word, idx) => (
                <li key={idx}># {word}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pdf-wrapper">
          <div className="pdf">
            <button className="pdf-download-button">
              <img src={PdfDownload} alt="이력서 pdf 다운로드" />
            </button>
            <p>
              이력서 다운받기 <span>(.pdf)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
