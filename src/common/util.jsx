export function autoResizeTextarea(el) {
  el.style.height = 0;
  el.style.height = el.scrollHeight + 'px';
}

export function getEncodeURI(str) {
  if (str) {
    let urlTitle = str.replace(/ /g, '-');
    return encodeURIComponent(urlTitle);
  }

  return '';
}
