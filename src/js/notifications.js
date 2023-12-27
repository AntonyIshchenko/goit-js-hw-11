import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const octagonIconUrl = new URL('../img/octagon.svg', import.meta.url).href;
const closeIconUrl = new URL('../img/x.svg', import.meta.url).href;

export function createMessage(textMessage = '') {
  iziToast.show({
    // title: 'Error',
    titleColor: '#FFF',
    titleSize: '16px',
    message: textMessage,
    messageColor: '#FFF',
    messageSize: '16px',
    maxWidth: '462px',
    position: 'topRight',
    backgroundColor: '#EF4040',
    iconUrl: octagonIconUrl,
    progressBarColor: '#FFBEBE',
    timeout: 5000,
    targetFirst: false,
    close: false,
    buttons: [
      [
        `<button type="button" id="izi-close-button">
                 <img src="${closeIconUrl}" alt="" width="16px" height="16px" />
              </button>`,
        function (instance, toast) {
          instance.hide({}, toast, 'buttonName');
        },
      ],
    ],
  });

  // div самого вікна
  let messageElement = document.querySelector('.iziToast.fadeInUp');
  messageElement.style.paddingTop = '20px';
  messageElement.style.paddingBottom = '20px';

  // текст помилки
  messageElement = document.querySelector(
    '.iziToast>.iziToast-body .iziToast-texts'
  );
  messageElement.style.maxWidth = '322px';
}
