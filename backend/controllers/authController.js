require("dotenv").config(); // 환경변수 로드
const nodemailer = require("nodemailer");
const User = require("../models/Recruiter");
const VerificationCode = require("../models/verificationCode");
const EmailVerificationCode = require("../models/emailVerificationCode");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 회원가입
exports.register = async (req, res) => {
  try {
    // 인증번호 없이 받도록 수정
    //const { name, email, password, phone, role, company_name } =
    ////req.body;

    const { name, email, verify_code, password, phone, role, company_name } =
      req.body;
    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !role ||
      !company_name ||
      !verify_code
    ) {
      return res
        .status(400)
        .json({ success: false, message: "모든 필드를 입력해주세요." });
    }

    // 인증번호 검증 제거
    /*
    const validCode = await VerificationCode.findOne({ phone, verify_code });
    if (!validCode) {
      return res
        .status(400)
        .json({ success: false, message: "인증번호가 올바르지 않습니다." });
    }
        */

    const codeRecord = await EmailVerificationCode.findOne({
      email,
      verify_code,
    });

    if (!codeRecord) {
      return res
        .status(400)
        .json({ success: false, message: "인증번호가 틀렸습니다." });
    }

    if (codeRecord.expires_at < new Date()) {
      return res
        .status(400)
        .json({ success: false, message: "인증번호가 만료되었습니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password_hash: hashedPassword,
      phone,
      role,
      company_name,
    });

    await newUser.save();

    // 인증번호 삭제 제거
    //await VerificationCode.deleteOne({ phone });
    await EmailVerificationCode.deleteOne({ email });

    return res.status(201).json({
      success: true,
      message: "회원가입이 완료되었습니다.",
    });
  } catch (error) {
    console.error("회원가입 오류:", error);

    // Mongoose validation 에러 처리
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages[0], // 여러 개일 경우 첫 번째만 보여줌
      });
    }

    res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다.",
    });
  }
};

// 로그인
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("로그인 요청 도착:", req.body);
  try {
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(400).json({ error: "등록되지 않은 사용자입니다." });
    }
    if (!(await bcrypt.compare(password, user.password_hash))) {
      return res.status(400).json({ error: "비밀번호가 잘못되었습니다." });
    }

    const token = jwt.sign(
      { userEmail: user.email, userRole: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log(token);
    res.status(200).json({ token, userEmail: user.email });
  } catch (error) {
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
};

// 이메일 중복 체크
exports.checkIdAvailability = async (req, res) => {
  console.log("중복 확인 요청:", req.body); // 로그 확인용
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "이메일을 입력해주세요." });
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(200).json({ available: true });
  }

  return res.status(200).json({ available: false });
};

// 인증번호 전송
exports.sendVerifynumber = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "전화번호를 입력해주세요." });
    }

    const verifyCode = "123456"; // 임시 인증번호

    await VerificationCode.deleteOne({ phone });

    const newCode = new VerificationCode({
      phone,
      code: verifyCode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    await newCode.save();

    return res.status(200).json({ message: "인증번호가 전송되었습니다." });
  } catch (error) {
    console.error("인증번호 전송 오류:", error);
    return res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 이메일 인증번호 전송
exports.sendEmailVerifynumber = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "이메일을 입력해주세요." });
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 랜덤

    await EmailVerificationCode.deleteOne({ email });

    const newCode = new EmailVerificationCode({
      email,
      verify_code: verifyCode,
      expires_at: new Date(Date.now() + 10 * 60 * 1000), // 10분 유효
    });
    await newCode.save();

    const mailOptions = {
      from: `"HireRithm 인증센터" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "[HireRithm] 이메일 인증번호",
      html: `<h2>인증번호: ${verifyCode}</h2><p>10분 안에 입력해주세요!</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`이메일 ${email}로 인증번호 ${verifyCode} 전송`);

    return res.status(200).json({ message: "인증번호가 전송되었습니다." });
  } catch (error) {
    console.error("이메일 인증번호 전송 오류:", error);
    return res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 이메일 인증번호 확인
exports.checkVerifyCode = async (req, res) => {
  try {
    const { email, verify_code } = req.body;
    if (!email || !verify_code) {
      return res
        .status(400)
        .json({ success: false, message: "모든 필드를 입력해주세요." });
    }

    const codeRecord = await EmailVerificationCode.findOne({
      email,
      verify_code,
    });

    if (!codeRecord) {
      return res
        .status(400)
        .json({ success: false, message: "인증번호가 틀렸습니다." });
    }

    if (codeRecord.expires_at < new Date()) {
      return res
        .status(400)
        .json({ success: false, message: "인증번호가 만료되었습니다." });
    }

    await EmailVerificationCode.deleteOne({ email });

    return res.status(201).json({
      success: true,
      message: "인증이 완료되었습니다.",
    });
  } catch (error) {
    console.error("인증 오류:", error);
    return res
      .status(500)
      .json({ success: false, message: "서버 오류가 발생했습니다." });
  }
};

// 아이디 찾기
exports.findId = async (req, res) => {
  try {
    const { name, phone } = req.body;
    //console.log(name, phone);

    /*
    const validCode = await VerificationCode.findOne({ phone, verify_code });
    if (!validCode) {
      return res
        .status(400)
        .json({ success: false, message: "인증번호가 올바르지 않습니다." });
    }
        */

    const user = await User.findOne({ name, phone });
    if (!user) {
      return res
        .status(404)
        .json({ message: "일치하는 사용자를 찾을 수 없습니다." });
    }

    res.status(200).json({ email: user.email, created_at: user.created_at });
  } catch (error) {
    console.error("아이디 찾기 오류:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};
// 비밀번호 찾기
exports.findPassword = async (req, res) => {
  try {
    const { email, verify_code } = req.body;

    // 이메일 인증 코드 검증
    const validCode = await EmailVerificationCode.findOne({
      email,
      verify_code,
    });
    if (!validCode) {
      return res
        .status(400)
        .json({ success: false, message: "인증번호가 올바르지 않습니다." });
    }

    if (validCode.expires_at < new Date()) {
      return res
        .status(400)
        .json({ success: false, message: "인증번호가 만료되었습니다." });
    }

    await EmailVerificationCode.deleteOne({ email });

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "일치하는 사용자를 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "비밀번호 재설정 페이지로 이동.", email });
  } catch (error) {
    console.error("비밀번호 찾기 오류:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 비밀번호 재설정
exports.resetPassword = async (req, res) => {
  try {
    const { email, new_password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "해당 이메일의 사용자를 찾을 수 없습니다." });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    user.password_hash = hashedPassword;
    await user.save();

    res.status(200).json({ message: "비밀번호가 성공적으로 변경되었습니다." });
  } catch (error) {
    console.error("비밀번호 재설정 오류:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 토큰 검증
exports.verifyToken = (req, res) => {
  console.log("verifyToken 실행됨, req.decoded:", req.decoded);
  res.status(200).json({ success: true, user: req.decoded });
};

exports.getUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "토큰이 없습니다." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.userEmail }).select(
      "-password_hash"
    );

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("getUser 오류:", err);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};

// 사용자 정보 수정
exports.updateUser = async (req, res) => {
  try {
    const userEmail = req.decoded.userEmail;
    const { name, phone, company_name } = req.body;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "사용자를 찾을 수 없습니다." });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.company_name = company_name || user.company_name;

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "회원 정보가 수정되었습니다.", user });
  } catch (error) {
    console.error("회원 정보 수정 오류:", error);
    return res
      .status(500)
      .json({ success: false, message: "서버 오류가 발생했습니다." });
  }
};
