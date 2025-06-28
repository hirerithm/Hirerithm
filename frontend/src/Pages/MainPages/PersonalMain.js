import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./styles/PersonalMain.css";
import NotMemberNavigation from "../../Component/Navigation/NotMemberNavigation";
import ResumeRegistrationIcon from "../../Image/Icon/ResumeRegistrationIcon.svg";
import UpAnimation from "../../Image/Icon/UpAnimation.svg";
import DownAnimation from "../../Image/Icon/DownAnimation.svg";
import DownAnimation2 from "../../Image/Icon/DownAnimation2.svg";
import BannerImage1 from "../../Image/Image/009.jpg";
import BannerImage2 from "../../Image/Image/010.gif";
import BannerImage5 from "../../Image/Image/last.jpg";

const bannerData = [
  { image: BannerImage1, downIcon: DownAnimation },
  { image: BannerImage2, downIcon: DownAnimation2 },
  { image: BannerImage5, downIcon: null },
];

function CorporateMain() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const maxPage = bannerData.length - 1;
  const [isScrolling, setIsScrolling] = useState(false);

  const goNext = () => setPage((p) => Math.min(p + 1, maxPage));
  const goPrev = () => setPage((p) => Math.max(p - 1, 0));

  const handleWheel = useCallback(
    (e) => {
      if (isScrolling) return;

      if (e.deltaY > 50) {
        if (page < maxPage) {
          setIsScrolling(true);
          setPage((p) => Math.min(p + 1, maxPage));
        }
      } else if (e.deltaY < -50) {
        if (page > 0) {
          setIsScrolling(true);
          setPage((p) => Math.max(p - 1, 0));
        }
      }
    },
    [page, maxPage, isScrolling]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  useEffect(() => {
    if (isScrolling) {
      const timeout = setTimeout(() => setIsScrolling(false), 800);
      return () => clearTimeout(timeout);
    }
  }, [isScrolling]);

  return (
    <div className="personal-main_container">
      <NotMemberNavigation />
      <motion.div
        className="slides-wrapper"
        animate={{ y: `-${page * 100}vh` }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {bannerData.map((banner, index) => (
          <section
            key={index}
            className="banner"
            style={{
              backgroundColor: index === 0 ? "#f2fff7" : "#E6EFEB",
              backgroundImage: `url(${banner.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              aspectRatio: "16 / 9",
            }}
          >
            {index !== 0 && (
              <div className="banner-top-button-wrapper">
                <button className="up-scroll-button" onClick={goPrev}>
                  <motion.img
                    src={UpAnimation}
                    alt="↑ 이전으로"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                </button>
              </div>
            )}

            <div className="banner-button-wrapper">
              {index !== maxPage && (
                <button className="down-scroll-button" onClick={goNext}>
                  <motion.img
                    src={banner.downIcon}
                    alt="↓ 다음으로"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                </button>
              )}

              {index === maxPage && (
                <button
                  className="resume-button"
                  onClick={() => navigate("/user/resume")}
                >
                  <img src={ResumeRegistrationIcon} alt="📄" />
                  <p>이력서 등록하러 가기</p>
                </button>
              )}
            </div>
          </section>
        ))}
      </motion.div>
    </div>
  );
}

export default CorporateMain;
