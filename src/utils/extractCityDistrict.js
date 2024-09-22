export default function extractCityDistrict(address) {
  const match = address.match(/(\S+구)/) || address.match(/(\S+군)/);
  return match ? match[1] : null;
}
