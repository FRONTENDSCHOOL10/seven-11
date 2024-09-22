export default function getPbImageURL(item, fileName = 'avatar') {
  return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${item.id}/${item[fileName]}`;
}
