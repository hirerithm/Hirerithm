import { useState, useEffect } from "react";
import axios from "axios";
import ProfileIcon from "../../Image/Icon/ProfileIcon.svg";
import EmptyHeart from "../../Image/Icon/heart_empty.svg";
import FilledHeart from "../../Image/Icon/heart_filled.svg";

const DBItem = ({
  candidate,
  onClick,
  userEmail,
  liked: initialLiked,
  onToggleWishlist,
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const BACK_URL = process.env.REACT_APP_BACKEND_ADDRESS;

  useEffect(() => {
    setLiked(initialLiked); // props로 받은 liked 상태 동기화
  }, [initialLiked]);

  const toggleWishlist = async (e) => {
    e.stopPropagation();

    try {
      if (liked) {
        await axios.delete(
          `${BACK_URL}/resume/wishlist/${userEmail}/${candidate.resume_id}`
        );
        setLiked(false);
        onToggleWishlist?.(candidate.resume_id, false); // 상위 컴포넌트로 전달
      } else {
        await axios.post(
          `${BACK_URL}/resume/wishlist/${userEmail}/${candidate.resume_id}`
        );
        setLiked(true);
        onToggleWishlist?.(candidate.resume_id, true); // 상위 컴포넌트로 전달
      }
    } catch (err) {
      console.error("찜 토글 실패:", err);
    }
  };

  return (
    <div className="db-item" onClick={() => onClick(candidate)}>
      <div className="db-item-profile">
        <img src={ProfileIcon} alt="프로필" />
        <p>
          {candidate.name} ({candidate.age}), {candidate.gender}
        </p>
      </div>
      <div className="db-item-detail">
        <ul>
          {candidate.keyword?.map((keyword, idx) => (
            <li key={idx}># {keyword}</li>
          ))}
        </ul>
      </div>
      <button className="heart-toggle-btn" onClick={toggleWishlist}>
        <img alt="찜하기" src={liked ? FilledHeart : EmptyHeart} />
      </button>
      <p className="wishlist-count-text">{candidate.wishlist?.length || 0}</p>
    </div>
  );
};

export default DBItem;
