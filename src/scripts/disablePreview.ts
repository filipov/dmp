export const disablePreview = () => {
  const filipov = document.getElementsByClassName('filipov');

  const duration = 300;

  for (let element of filipov) {
    element.setAttribute('style', `transition: opacity ${duration}ms 0.0s ease; opacity: 0;`);
  }

  setTimeout(() => {
    for (let element of filipov) {
      element.setAttribute('style', `display: none;`);
    }
  }, duration);
}
