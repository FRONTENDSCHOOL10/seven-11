// 사용자 주소에서 시, 구 정보 추출
function extractCityDistrict(address) {
  const addressParts = address.split(' ');
  return addressParts.length >= 2
    ? `${addressParts[0]} ${addressParts[1]}`
    : null;
}

export default extractCityDistrict;
