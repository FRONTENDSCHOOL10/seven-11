export default function getPbImageURL(item, fileName = 'img') {
  return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${item.id}/${item[fileName]}`;
}
