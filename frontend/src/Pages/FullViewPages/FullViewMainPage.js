import { useState, useEffect } from "react";
import axios from "axios";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import SearchIcon from "../../Image/Icon/SearchIcon.svg";
import RefreshIcon from "../../Image/Icon/RefreshIcon.svg";
import ProfileIcon from "../../Image/Icon/ProfileIcon.svg";
import "./fullViewMainPage.css";
import ProfileDetail from "../../Component/FullViewComponent/ProfileDetail";
import CareerFilterBar from "../../Component/FullViewComponent/CareerFilterBar";
import EducationFilterBar from "../../Component/FullViewComponent/EducationFilterBar";
import CompanyTypeFilterBar from "../../Component/FullViewComponent/CompanyTypeFilterBar";
import DBItem from "../../Component/FullViewComponent/DBItem";

const FullViewMainPage = () => {
  const [candidateData, setCandidateData] = useState([]);
  const [sortType, setSortType] = useState("latest");
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const toggleDetailModal = () => setDetailModalOpen((prev) => !prev);

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHoveringRefresh, setIsHoveringRefresh] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  // 필터링바 관련 상태 관리
  const [selectedCareer, setSelectedCareer] = useState("경력 무관");
  const [selectedEducation, setSelectedEducation] = useState("학력 무관");
  const [selectedCompanyType, setSelectedCompanyType] =
    useState("맞춤기업 TEST 결과 유형 무관");

  // 검색어 입력 키워드 상태
  const [searchKeyword, setSearchKeyword] = useState("");

  const userEmail = localStorage.getItem("email");

  const BACK_URL = process.env.REACT_APP_BACKEND_ADDRESS;

  useEffect(() => {
    getCandidateList();
  }, []);

  // 후보자 데이터 받아오기
  const getCandidateList = () => {
    setIsLoading(true);
    let url = `${BACK_URL}/resume/list`;
    if (sortType === "popular") {
      url = `${BACK_URL}/resume/wishlist/sort/popular`;
    } else if (sortType === "latest") {
      url = `${BACK_URL}/resume/wishlist/sort/latest`;
    }
    axios
      .get(url)
      .then((res) => {
        setCandidateData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("후보자 데이터 가져오기 에러:", err.message);
        setIsLoading(false);
      });
  };

  // 찜한 이력서 목록 불러오기 (찜한 사용자 표시하기 위해 불러옴)
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `${BACK_URL}/resume/wishlist/${userEmail}`
        );
        const wishedIds = response.data.map((resume) => resume.resume_id);
        setWishlist(wishedIds);
        console.log("찜한 후보자 resume_id 리스트:", wishedIds);
      } catch (error) {
        console.error("찜 목록 불러오기 실패:", error);
      }
    };

    fetchWishlist();
  }, [userEmail]);

  // 클릭 시 선택된 후보 모달 열기
  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
    setDetailModalOpen(true);
  };

  // 경력 계산 함수 (start_year~end_year 기준)
  const calculateExperienceYears = (careerList) => {
    if (!careerList || careerList.length === 0) return 0;
    const totalMonths = careerList.reduce((sum, item) => {
      const start = new Date(item.start_year);
      const end = new Date(item.end_year || new Date());
      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
      return sum + (months > 0 ? months : 0);
    }, 0);
    return Math.floor(totalMonths / 12);
  };

  // 학력 필터링 함수
  const passesEducationFilter = (educationList) => {
    if (selectedEducation === "학력 무관") return true;

    const degreeOrder = {
      초등학교: 1,
      중학교: 2,
      고등학교: 3,
      학사: 4,
      석사: 5,
      박사: 6,
    };

    const required = {
      무관: 0,
      "초등학교 졸업 이상": 1,
      "중학교 졸업 이상": 2,
      "고등학교 졸업 이상": 3,
      "학사 학위 이상": 4,
      "석사 학위 이상": 5,
      "박사 학위 이상": 6,
    }[selectedEducation];

    if (!educationList || educationList.length === 0) return false;

    const maxDegree = Math.max(
      ...educationList.map((e) => degreeOrder[e.degree] || 0)
    );

    return maxDegree >= required;
  };

  // 맞춤기업 TEST 결과 유형 필터링
  const passesCompanyTypeFilter = (companyTest) => {
    if (selectedCompanyType === "맞춤기업 TEST 결과 유형 무관") return true;
    if (!companyTest || !companyTest.scores) return false;

    const scoreMap = {
      "평가 및 성장 가능성 강점 기업 인재": companyTest.scores.Evaluation,
      "높은 보상 강점 기업 인재": companyTest.scores.PayLevel,
      "비전 및 방향성 강점 기업 인재": companyTest.scores.VisionDirection,
      "복지 강점 기업 인재": companyTest.scores.Welfare,
      "업무 강도 강점 기업 인재": companyTest.scores.Workload,
    };

    const highestType = Object.entries(scoreMap).reduce((max, cur) => {
      return cur[1] > max[1] ? cur : max;
    })[0];

    return selectedCompanyType === highestType;
  };

  // 검색어 입력
  const passesSearchFilter = (candidate) => {
    if (!searchKeyword.trim()) return true;
    const lower = searchKeyword.toLowerCase();
    const nameMatch = candidate.name?.toLowerCase().includes(lower);
    const skillMatch = candidate.skills?.some((s) =>
      s.skill_name?.toLowerCase().includes(lower)
    );
    return nameMatch || skillMatch;
  };

  // 필터링바 + 검색바 입력 상태에 따라 db item들 렌더링
  const filteredCandidates = candidateData.filter((candidate) => {
    const years = calculateExperienceYears(candidate.career);
    const educationOk = passesEducationFilter(candidate.education);
    const companyTypeOk = passesCompanyTypeFilter(candidate.companyTest);
    const searchOk = passesSearchFilter(candidate);

    // 경력 필터링
    const careerPass = (() => {
      if (selectedCareer === "경력 무관") return true;

      switch (selectedCareer) {
        case "신입":
          return years === 0;
        case "1-5년":
          return years >= 1 && years <= 5;
        case "6-10년":
          return years >= 6 && years <= 10;
        case "11-15년":
          return years >= 11 && years <= 15;
        case "16-19년":
          return years >= 16 && years <= 19;
        case "20년 이상":
          return years >= 20;
        default:
          return true;
      }
    })();

    return careerPass && educationOk && companyTypeOk && searchOk;
  });

  // 필터링 결과 렌더링 로딩 상태 + 5초 지나도 검색 결과 찾지 못하면 후보자 존재하지 않는다는 메세지 띄우기
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 7000);
      return () => clearTimeout(timeout);
    }
  }, [filteredCandidates]);

  return (
    <div className="full-view-main-wrapper">
      {/* 네비게이션 */}
      <MemberNavigation />
      <header>
        {/* 페이지 인덱스 */}
        <div className="full-view-main-index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2>전체 DB 열람</h2>
        </div>

        {/* 페이지 소개글 */}
        <p>
          하이어리즘에서 열람 가능한 후보자 전체 DB 입니다. 더 자세한 필터링을
          원하시면 '추천' 서비스를 이용해보세요!
        </p>
      </header>

      <div className="filter-search-section">
        <div className="filter-controls">
          <div className="filter-wrapper">
            {/* 경력 필터링바 */}
            <CareerFilterBar
              selectedCareer={selectedCareer}
              onChange={(e) => {
                setSelectedCareer(e.target.value);
                setIsLoading(true);
              }}
            />
            {/* 학력 필터링바 */}
            <EducationFilterBar
              selectedEducation={selectedEducation}
              onChange={(e) => {
                setSelectedEducation(e.target.value);
                setIsLoading(true);
              }}
            />
            {/* 맞춤기업 TEST 결과 유형 필터링바 */}
            <CompanyTypeFilterBar
              selectedCompanyType={selectedCompanyType}
              onChange={(e) => {
                setSelectedCompanyType(e.target.value);
                setIsLoading(true);
              }}
            />
          </div>

          {/* 검색 바 */}
          <div className="search-bar">
            <img src={SearchIcon} alt="검색" className="search-icon" />
            <input
              type="text"
              placeholder="후보자명 or SKILLS 검색하기"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setIsLoading(true);
              }}
            />
          </div>
        </div>

        <div className="search-and-buttons-wrapper">
          {/* 최신순 / 인기순 필터링 버튼, 새로고침 버튼*/}
          <div className="sort-refresh-btns">
            <button
              className={`sort-filter-btn ${
                sortType === "latest" ? "selected" : ""
              }`}
              onClick={() => setSortType("latest")}
            >
              최신순
            </button>
            <button
              className={`sort-filter-btn ${
                sortType === "popular" ? "selected" : ""
              }`}
              onClick={() => setSortType("popular")}
            >
              인기순
            </button>
            <div
              className="refresh-btn-wrapper"
              onMouseEnter={() => setIsHoveringRefresh(true)}
              onMouseLeave={() => setIsHoveringRefresh(false)}
            >
              <button className="refresh-btns" onClick={getCandidateList}>
                <img src={RefreshIcon} alt="새로고침" />
              </button>
              {isHoveringRefresh && (
                <div className="refresh-hover-label">새로고침</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="db-list-wrapper">
        {isLoading ? (
          <div className="loading-wrapper">
            <div className="loading-spinner"></div>
            <span className="loading-text">
              후보자 정보를 불러오는 중입니다...
            </span>
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="no-result-wrapper">
            <span className="no-result-text">
              조건에 맞는 후보자가 존재하지 않습니다.
            </span>
          </div>
        ) : (
          filteredCandidates.map((candidate, index) => (
            <DBItem
              key={index}
              candidate={candidate}
              onClick={handleCandidateClick}
              userEmail={userEmail}
              liked={wishlist.includes(candidate.resume_id)}
              onToggleWishlist={(resumeId, isLiked) => {
                setCandidateData((prev) =>
                  prev.map((c) =>
                    c.resume_id === resumeId
                      ? {
                          ...c,
                          wishlist: isLiked
                            ? [...(c.wishlist || []), userEmail]
                            : (c.wishlist || []).filter((e) => e !== userEmail),
                        }
                      : c
                  )
                );
              }}
            />
          ))
        )}
      </div>

      {/* 후보자 상세보기 모달 */}
      {isDetailModalOpen && selectedCandidate && (
        <ProfileDetail
          onClose={toggleDetailModal}
          name={selectedCandidate.name}
          keyword={selectedCandidate.keyword}
          age={selectedCandidate.age}
          userEmail={userEmail}
          resume_id={selectedCandidate.resume_id}
          onToggleWishlist={(id, state) => {
            setCandidateData((prev) =>
              prev.map((c) =>
                c.resume_id === id
                  ? {
                      ...c,
                      wishlist: state
                        ? [...(c.wishlist || []), userEmail]
                        : (c.wishlist || []).filter((e) => e !== userEmail),
                    }
                  : c
              )
            );
          }}
        />
      )}
    </div>
  );
};

export default FullViewMainPage;
