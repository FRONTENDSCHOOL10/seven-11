const getDetailedAddress = (address) => {
  if (address.includes('동') || address.includes('군')) {
    const addressArray = address.split(' ');
    const detailed = addressArray.find(
      (array) => array.endsWith('동') || array.endsWith('군')
    );
    return detailed;
  } else {
    console.error('주소는 반드시 군 또는 동을 포함하고 있어야 합니다');
  }
};

export default getDetailedAddress;
