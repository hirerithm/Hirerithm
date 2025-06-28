require("dotenv").config(); // 환경변수 로드
const express = require("express");
const authRoutes = require("./routes/authRoute");
const companyRoutes = require("./routes/companyRoute");
const resumeRoutes = require("./routes/resumeRoute");
const recommendationRoutes = require("./routes/recommendationRoute");
const db = require("./config/db"); // DB 연결 모듈 불러오기

const app = express();

const bodyParser = require("body-parser");
const path = require("path"); // path 모듈 추가

const cors = require("cors");
app.use(cors()); // 모든 출처를 허용

// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 라우팅 설정
app.use("/auth", authRoutes);
app.use("/company", companyRoutes);
app.use("/resume", resumeRoutes);
app.use("/recommendation", recommendationRoutes);

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error("서버 오류:", err);
  res.status(500).send("서버에서 오류가 발생했습니다(server.js).");
});

// DB 연결
db.connect();

// 서버 실행
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});

// 정적 파일 설정 (public 폴더)
app.use(express.static(path.join(__dirname, "public")));
