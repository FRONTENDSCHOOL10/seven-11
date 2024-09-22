const getDetailedAddress = (address) => {
  // address가 문자열인지 확인
  if (typeof address !== 'string') {
    console.error('유효한 주소 문자열이 아닙니다');
    return null;
  }

  // "동" 또는 "군"이 포함된 경우 처리
  if (!address) {
    return null;
  }
  if (address.includes('동') || address.includes('군')) {
    const addressArray = address.split(' ');
    const detailed = addressArray.find(
      (array) => array.endsWith('동') || array.endsWith('군')
    );
    return detailed;
  } else {
    console.error('주소는 반드시 군 또는 동을 포함하고 있어야 합니다');
    return null;
  }
};

export default getDetailedAddress;
