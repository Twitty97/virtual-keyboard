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

  p: {
    value: '',
    capsLock: false,
    cursorPosition: 0,
    input: null,
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
    this.elements.textarea.setAttribute('autofocus', true);
    this.elements.textarea.setAttribute('spellcheck', false);

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

    // apprently querySelector works with static elements only
    this.p.input = document.querySelector('.keyboard-textarea');
    this.p.input.addEventListener('blur', () => this.p.input.focus());
    this.p.input.addEventListener('focus', () => this.p.input.focus());
  },

  inputFunction(value) {
    const indexStart = this.p.input.selectionStart;
    const indexEnd = this.p.input.selectionEnd;
    this.getCursorPosition(value.length);
    this.p.input.value = (
      this.p.input.value.slice(0, indexStart)
      + value
      + this.p.input.value.slice(indexEnd));
    this.setCursorPosition(0);
    return this.p.input.value;
  },

  backSpaceFunction() {
    const indexStart = this.p.input.selectionStart;
    const indexEnd = this.p.input.selectionEnd;
    this.getCursorPosition(0);
    if (indexStart <= 0) {
      this.p.input.value = this.p.input.value.slice(0);
      this.setCursorPosition(0);
    } else {
      this.p.input.value = (
        this.p.input.value.slice(0, indexStart - 1)
      + this.p.input.value.slice(indexEnd));
      this.setCursorPosition(-1);
    }
    return this.p.input.value;
  },

  delFunction() {
    const indexStart = this.p.input.selectionStart;
    const indexEnd = this.p.input.selectionEnd;
    this.getCursorPosition(0);
    this.p.input.value = (
      this.p.input.value.slice(0, indexEnd)
      + this.p.input.value.slice(indexStart + 1));
    this.setCursorPosition(0);
    return this.p.input.value;
  },

  getCursorPosition(len) {
    this.p.cursorPosition = this.p.input.selectionStart + len;
  },
  setCursorPosition(len) {
    this.p.input.selectionStart = this.p.cursorPosition + len;
    this.p.input.selectionEnd = this.p.cursorPosition + len;
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
              this.p.value = this.backSpaceFunction();
            });

            break;

          case 'CapsLock':
            keyElement.addEventListener('click', () => {
              this.toggleCapslock();
            });

            break;

          case 'Del':
            keyElement.addEventListener('click', () => {
              this.p.value = this.delFunction();
            });

            break;

          case 'Tab':
            keyElement.addEventListener('click', () => {
              this.p.value = this.inputFunction('    ');
            });

            break;

          case 'Enter':
            keyElement.addEventListener('click', () => {
              this.p.value = this.inputFunction('\n');
            });

            break;

          case 'space':
            keyElement.addEventListener('click', () => {
              this.p.value = this.inputFunction(' ');
            });

            break;

          default:
            keyElement.addEventListener('click', () => {
              console.log(key);
              const rexepr = /Ctrl|Alt|Win|Shift/i;
              if (!key.match(rexepr)) {
                this.p.value = this.p.capsLock ? this.inputFunction(key.toUpperCase())
                  : this.inputFunction(key.toLowerCase());
              }
            });

            break;
        }
      }
      fragment.appendChild(this.elements.keyRow[k]);
    }
    return fragment;
  },

  toggleCapslock() {
    this.p.capsLock = !this.p.capsLock;
    const regex = /^[a-zA-ZЁёА-я]$/;
    const arr = this.elements.keys;
    const capsLockButton = document.querySelector('.caps');

    if (capsLockButton.classList.contains('active')) {
      capsLockButton.classList.remove('active');
    } else {
      capsLockButton.classList.add('active');
    }

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
});
