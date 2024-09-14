// 이메일 형식 조건
export function isValidEmail(email) {
  const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
}

// 회원가입시 비밀번호 조건(영문, 숫자, 특수문자 포함 8~15자)
export function isValidPassword(password) {
  const regex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*])[a-zA-Z\d~!@#$%^&*]{8,15}$/;
  return regex.test(password);
}

// 로그인시 비밀번호 조건(8자 이상 15자 이하)
export function isValidLoginPwd(password) {
  const regexPwd = /^.{8,15}$/;
  return regexPwd.test(password);
}
