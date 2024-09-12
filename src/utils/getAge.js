// 만나이 계산
export default function getAge(birthdate) {
  const birthDate = new Date(birthdate);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  // 생일이 지났는지 여부
  const isPastBirthday =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  // 생일이 지나지 않으면 -> -1살
  if (!isPastBirthday) {
    age--;
  }

  return age;
}
