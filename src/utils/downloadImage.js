export async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to download image');
  }
  const blob = await response.blob();
  return blob;
}
