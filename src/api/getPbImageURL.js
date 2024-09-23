export default function getPbImageURL(item, fileName = 'avatar') {
  return `${import.meta.env.VITE_PB}/api/files/${item.collectionId}/${item.id}/${item[fileName]}`;
}
