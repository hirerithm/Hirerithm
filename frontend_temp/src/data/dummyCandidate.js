// 테스트용 더미 데이터

const dummyCandidates = [
  {
    name: "홍길동",
    birth: "20030219",
    age: 22,
    gender: "남성",
    address: "서울특별시 성북구 석관동 두산위브아파트",
    phone: "010-1231-1231",
    currentSalary: "5000 만원",
    desiredSalary: "6000 만원",
    education: [
      { school: "서울대학교", major: "컴퓨터공학과", year: "2018 - 2022" },
    ],
    experience: [
      {
        company: "카카오",
        role: "프론트엔드 개발자",
        duration: "2022 - 현재",
        datail:
          "카카오톡 채팅 서버 유지보수 및 기능 개발. 실시간 메시지 처리 성능 개선 프로젝트에 참여하였으며, Go 기반 마이크로서비스 아키텍처 전환 작업 주도.",
      },
    ],
    license: [
      {
        licenseName: "정보처리기사",
        licenseDate: "20220402",
        licenseNumber: "12345678901A",
      },
      {
        licenseName: "TOEIC",
        licenseDate: "20210909",
        licenseNumber: "12345678901A",
      },
    ],
    skills: [
      "Language: Java, Python, JavaScript",
      "Web FE & BE: React, Node.js",
      "DB: MySQL, MongoDB",
      "Tool: Git, Jenkins, Docker",
    ],
    other: "병역: 육군 병장 만기전역 (2013-03 ~ 2015-01)",
    test: [
      {
        TeamCulture: 33.0,
        Evaluation: 33.0,
        PayLevel: 33.0,
        VisionDirection: 30.3,
        Welfare: 27.0,
        Workload: 24.0,
      },
    ],
  },
  {
    name: "김민수",
    birth: "19980314",
    age: 27,
    gender: "남성",
    address: "경기도 수원시 영통구 매탄동",
    phone: "010-5678-1234",
    currentSalary: "4800 만원",
    desiredSalary: "5500 만원",
    education: [
      { school: "고려대학교", major: "산업경영공학", year: "2016 - 2020" },
    ],
    experience: [
      {
        company: "삼성전자",
        role: "데이터 분석가",
        duration: "2020 - 2023",
        datail:
          "제품 판매 데이터 분석 및 수요 예측 모델 개발. Tableau 및 Python 기반의 대시보드 구축.",
      },
    ],
    license: [
      {
        licenseName: "SQL 개발자",
        licenseDate: "20201010",
        licenseNumber: "987654321B",
      },
    ],
    skills: ["Python", "Pandas", "Tableau", "SQL"],
    other: "해외경험: 독일 교환학생 (2019년 하반기)",
  },
  {
    name: "이수빈",
    birth: "19971005",
    age: 28,
    gender: "여성",
    address: "서울특별시 마포구 서교동",
    phone: "010-2345-6789",
    currentSalary: "4300 만원",
    desiredSalary: "5000 만원",
    education: [
      { school: "연세대학교", major: "디자인학과", year: "2017 - 2021" },
    ],
    experience: [
      {
        company: "네이버",
        role: "UX 디자이너",
        duration: "2021 - 현재",
        datail:
          "네이버 지도 및 파파고 서비스의 UX/UI 설계 담당. 사용자 리서치 및 프로토타입 제작 주도.",
      },
    ],
    license: [
      {
        licenseName: "GTQ 1급",
        licenseDate: "20210520",
        licenseNumber: "456789123C",
      },
    ],
    skills: ["Figma", "Sketch", "Adobe XD"],
    other: "수화 가능, 일본어 JLPT N2 보유",
    test: [
      {
        TeamCulture: 33.0,
        Evaluation: 33.0,
        PayLevel: 33.0,
        VisionDirection: 30.3,
        Welfare: 27.0,
        Workload: 24.0,
      },
    ],
  },
  {
    name: "정우진",
    birth: "19960222",
    age: 29,
    gender: "남성",
    address: "부산광역시 해운대구 좌동",
    phone: "010-8765-4321",
    currentSalary: "5100 만원",
    desiredSalary: "5800 만원",
    education: [
      { school: "부산대학교", major: "전기전자공학", year: "2015 - 2019" },
    ],
    experience: [
      {
        company: "현대자동차",
        role: "임베디드 소프트웨어 개발자",
        duration: "2019 - 2022",
        datail:
          "차량 내 임베디드 시스템용 펌웨어 개발 및 유지보수. C/C++ 기반 ECU 개발 경험 다수.",
      },
    ],
    license: [
      {
        licenseName: "임베디드 소프트웨어 전문가",
        licenseDate: "20191210",
        licenseNumber: "654321789D",
      },
    ],
    skills: ["C", "C++", "RTOS", "MATLAB"],
    other: "자격증: 전기기사 (필기 합격)",
  },
  {
    name: "박지연",
    birth: "19950218",
    age: 30,
    gender: "여성",
    address: "서울특별시 서초구 반포동",
    phone: "010-4321-8765",
    currentSalary: "4700 만원",
    desiredSalary: "5500 만원",
    education: [
      { school: "이화여자대학교", major: "경영학과", year: "2014 - 2018" },
    ],
    experience: [
      {
        company: "쿠팡",
        role: "마케팅 매니저",
        duration: "2018 - 2023",
        datail:
          "이커머스 마케팅 캠페인 기획 및 운영. 데이터 기반 퍼포먼스 마케팅 전략 수립 및 KPI 분석.",
      },
    ],
    license: [
      {
        licenseName: "ADsP",
        licenseDate: "20200115",
        licenseNumber: "321654987E",
      },
      {
        licenseName: "TOEIC",
        licenseDate: "20191201",
        licenseNumber: "123123123F",
      },
    ],
    skills: ["Google Analytics", "SQL", "Excel", "PowerPoint"],
    other: "취미: 브런치 작가, 매주 1편 이상 글 게시",
    test: [
      {
        TeamCulture: 33.0,
        Evaluation: 33.0,
        PayLevel: 33.0,
        VisionDirection: 30.3,
        Welfare: 27.0,
        Workload: 24.0,
      },
    ],
  },
];

export default dummyCandidates;
