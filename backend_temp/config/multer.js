const multer = require("multer");
const path = require("path");

const uploadDir = path.join(__dirname, "../pdf");

// 파일 저장 위치 및 파일명 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // 확장자 추출
    const baseName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9가-힣_]/g, ""); // 특수문자 제거
    const fileName = `${Date.now()}-${baseName}${ext}`; // 날짜-파일명 형식으로 저장
    cb(null, fileName);
  },
});

// 파일 필터링 (PDF만 허용)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("PDF 파일만 업로드할 수 있습니다."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한(임시)
});

module.exports = upload;
