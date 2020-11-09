import { disablePreview } from '@/scripts/disablePreview.ts';
import DMPSvg from '@/images/player.svg';
import { DMPAudio } from '@/scripts/DMPAudio.ts';
import { DMPScreen } from '@/scripts/DMPScreen.ts';
import { ClickMe } from '@/scripts/ClickMe.ts';

(() => {
  const body = document.body;

  setTimeout(disablePreview, 1000);

  setTimeout(() => {
    fetch(DMPSvg)
      .then((response) => {
        new ClickMe(() => {
          response.text().then((svg: string) => {
            document.body.innerHTML = svg;

            const element = document.body.firstElementChild;

            import('../pkg/index.js').then((module) => {
              if (element instanceof SVGElement) {
                new DMPScreen(new DMPAudio(), element, module);
              }
            });
          });

          return undefined;
        });
      })
  }, 1000);

})();

// https://www.scottholmesmusic.com/
