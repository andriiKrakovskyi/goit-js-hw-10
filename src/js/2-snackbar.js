import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formInput = document.querySelector('.form');
formInput.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const promiseState = event.target.elements.state.value;
  console.log(promiseState);
  const delay = Number(event.target.elements.delay.value);
  console.log(delay);

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseState === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })

    .then(delay => {
      iziToast.success({
        title: 'OK',
        titleColor: '#FFF',
        titleSize: '16px',
        titleLineHeight: '24px',
        message: `Fulfilled promise in ${delay}ms`,
        timeout: 5000,
        iconUrl: '',
        position: 'bottomCenter',
        messageColor: '#FFF',
        messageSize: '16px',
        messageLineHeight: '24px',
        backgroundColor: '#59A10D',
        iconUrl: '../img/ iconcheck.svg',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        titleColor: '#FFF',
        titleSize: '16px',
        titleLineHeight: '24px',
        message: `Rejected promise in ${delay}ms`,
        timeout: 5000,
        iconUrl: '../img/iconalert.svg',
        position: 'bottomCenter',
        messageColor: '#FFF',
        messageSize: '16px',
        messageLineHeight: '24px',
        backgroundColor: '#EF4040;',
      });
    });
}
