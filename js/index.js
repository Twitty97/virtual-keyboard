/* eslint-disable import/extensions */
import keyboardLayout from './keys.js';
// import create from './create.js';

const keyboard = {
  elements: {
    mainContainer: null,
    heading: null,
    subheading: null,
    subsubheading: null,
    textarea: null,
    keyContainer: null,
    keys: [],
    keyRow: [],
  },

  eventHandlers: {
    oninput: null,
    onmouseclick: null,
    onkeyboardclick: null,
  },

  p: {
    value: '',
    capsLock: false,
  },

  init() {
    // create elements
    this.elements.mainContainer = document.createElement('div');
    this.elements.keyContainer = document.createElement('div');
    this.elements.heading = document.createElement('h2');
    this.elements.subheading = document.createElement('h4');
    this.elements.subsubheading = document.createElement('h4');
    this.elements.textarea = document.createElement('textarea');

    // add classes
    this.elements.mainContainer.classList.add('container');
    this.elements.keyContainer.classList.add('keyboard-inputarea');
    this.elements.heading.classList.add('title');
    this.elements.subheading.classList.add('subtitle');
    this.elements.subsubheading.classList.add('subtitle-lang');
    this.elements.textarea.classList.add('keyboard-textarea');

    // add text inside the headings
    this.elements.heading.textContent = 'Virtual Keyboard';
    this.elements.subheading.textContent = 'The keyboard was created using Windows OS';
    this.elements.subsubheading.textContent = 'Please use CTRL + ALT to switch the language';

    // add to DOM
    this.elements.mainContainer.appendChild(this.elements.heading);
    this.elements.mainContainer.appendChild(this.elements.subheading);
    this.elements.mainContainer.appendChild(this.elements.subsubheading);
    this.elements.mainContainer.appendChild(this.elements.textarea);
    this.elements.mainContainer.appendChild(this.elements.keyContainer);

    // generate keyboard-rows with keys
    this.elements.keyContainer.appendChild(this.createKeys());
    this.elements.keys = this.elements.keyContainer.querySelectorAll('.keyboard-row .keyboard-key');

    document.body.appendChild(this.elements.mainContainer);
  },

  createKeys() {
    let k = 0;
    let j = 0;
    let keyElement;
    let keyValue;
    const fragment = document.createDocumentFragment();

    for (k = 0; k < keyboardLayout.length; k += 1) {
      this.elements.keyRow[k] = document.createElement('div');
      this.elements.keyRow[k].classList.add('keyboard-row');
      for (j = 0; j < keyboardLayout[k].length; j += 1) {
        const key = keyboardLayout[k][j][3];
        const keyclass = keyboardLayout[k][j][0];
        keyElement = document.createElement('div');
        keyValue = document.createElement('span');
        keyElement.classList.add('keyboard-key');
        keyElement.classList.add(`${keyclass}`);
        keyValue.classList.add('letter');
        keyValue.textContent = `${key}`;
        keyElement.appendChild(keyValue);
        this.elements.keyRow[k].appendChild(keyElement);
        switch (key) {
          case 'Backspace':
            keyElement.addEventListener('click', () => {
              this.p.value = this.p.value.substring(0, this.p.value.length - 1);
              console.log(this.p.value);
              this.triggerEvent('oninput');
            });

            break;

          case 'CapsLock':
            keyElement.addEventListener('click', () => {
              this.toggleCapslock();
            });

            break;

          case 'Enter':
            keyElement.addEventListener('click', () => {
              this.p.value += '\n';
              this.triggerEvent('oninput');
            });

            break;

          case 'space':
            keyElement.addEventListener('click', () => {
              this.p.value += ' ';
              this.triggerEvent('oninput');
            });

            break;

          default:
            keyElement.addEventListener('click', () => {
              this.p.value += this.p.capsLock ? key.toUpperCase() : key.toLowerCase();
              console.log(this.p.value);
              this.triggerEvent('oninput');
            });

            break;
        }
      }
      fragment.appendChild(this.elements.keyRow[k]);
    }
    return fragment;
  },

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      console.log(this.eventHandlers[handlerName](this.p.value));
    }
  },

  toggleCapslock() {
    this.p.capsLock = !this.p.capsLock;
    const regex = /^[a-zA-ZЁёА-я]$/;
    const arr = this.elements.keys;
    for (let n = 0; n < arr.length; n += 1) {
      if (regex.test(arr[n].textContent)) {
        if (this.p.capsLock) {
          arr[n].textContent = arr[n].textContent.toUpperCase();
        } else {
          arr[n].textContent = arr[n].textContent.toLowerCase();
        }
      }
    }
  },

};

// initialize the keyboard on DOMContentLoad
window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
  keyboard.createKeys();
});

const s = [];
document.onkeydown = (event) => {
  s.push(event.key);
  console.log(s);
};
