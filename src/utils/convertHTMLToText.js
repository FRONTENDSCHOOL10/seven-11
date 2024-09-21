export function convertHTMLToText(htmlString) {
  return htmlString
    .replace(/<[^>]+>/g, ($1) => {
      if ($1.includes('/')) return '\n\n';
      return '';
    })
    .trim();
}

export function convertTextToHTMLString(text, tagName = 'p') {
  return /\s+/g
    .exec(text)
    .input.split('\n')
    .filter(Boolean)
    .reduce(
      (htmlString, text) => htmlString + `<${tagName}>${text}</${tagName}>`,
      ''
    );
}
