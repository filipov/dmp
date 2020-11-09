export class ClickMe {
  private readonly element: HTMLElement;

  constructor(handler: () => undefined) {
    this.element = document.createElement('div');
    this.element.classList.add('click-me');
    this.element.innerHTML = 'Нажми<small>Внимание, на странице<br />воспроизводится звук!</small>';
    this.element.onclick = handler;

    this.element.onclick = () => {
      handler();
    }

    document.body.prepend(this.element);
  }
}
