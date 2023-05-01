/* eslint-disable import/extensions */
import keyboardLayout from './keys.js';

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
    letter: [],
  },

  p: {
    value: '',
    capsLock: false,
    cursorPosition: 0,
    shiftPressed: false,
    altPressed: false,
    ctrPressed: false,
    lang: 3,
    shiftIndexKey: 4,
    input: null,
  },

  init() {
    // create elements
    this.elements.mainContainer = document.createElement('div');
    this.elements.keyContainer = document.createElement('div');
    this.elements.heading = document.createElement('h3');
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

    this.createKeys();

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

  toggleCtrlAlt() {
    const arrCtrlAlt = [];
    this.p.ctrPressed = !this.p.ctrPressed;
    this.p.altPressed = !this.p.altPressed;
    const regexpression = /^[a-zA-ZЁёА-я]$/;
    this.elements.letter = this.elements.keyContainer.querySelectorAll('.keyboard-row .keyboard-key .letter');
    const arr = this.elements.letter;

    if (this.p.lang === 3) {
      this.p.lang = 1;
    } else if (this.p.lang === 1) {
      this.p.lang = 3;
    }

    for (let i = 0; i < keyboardLayout.length; i += 1) {
      for (let j = 0; j < keyboardLayout[i].length; j += 1) {
        const contentOnToggle = keyboardLayout[i][j][this.p.lang];
        arrCtrlAlt.push(contentOnToggle);
      }
    }

    for (let i = 0; i < arr.length; i += 1) {
      if (regexpression.test(arr[i].textContent)) {
        arr[i].textContent = this.p.capsLock ? arrCtrlAlt[i].toUpperCase()
          : arrCtrlAlt[i].toLowerCase();
      }
    }
  },

  toggleShift() {
    console.log('toggleShift');
    this.elements.letter = this.elements.keyContainer.querySelectorAll('.keyboard-row .keyboard-key .letter');
    const arrShift = [];
    const rexeprShift = /^[a-zA-ZЁёА-я]$/;

    if (this.p.lang === 3) {
      this.p.shiftIndexKey = 4;
    } else if (this.p.lang === 1) {
      this.p.shiftIndexKey = 2;
    }

    for (let i = 0; i < keyboardLayout.length; i += 1) {
      for (let l = 0; l < keyboardLayout[i].length; l += 1) {
        let shiftContent = this.p.shiftPressed ? keyboardLayout[i][l][this.p.shiftIndexKey]
          : keyboardLayout[i][l][this.p.lang];
        const shiftOnCaps = rexeprShift.test(shiftContent)
          ? shiftContent.toLowerCase() : shiftContent;
        shiftContent = this.p.capsLock ? shiftOnCaps : shiftContent;
        if (!this.p.shiftPressed && this.p.capsLock) {
          if (rexeprShift.test(shiftContent)) {
            shiftContent = shiftOnCaps.toUpperCase();
          }
        }
        arrShift.push(shiftContent);
      }
    }
    for (let i = 0; i < arrShift.length; i += 1) {
      this.elements.letter[i].textContent = arrShift[i];
    }
  },

  toggleCapslock() {
    this.p.capsLock = !this.p.capsLock;
    console.log(`capsLock: ${this.p.capsLock}`);
    const regex = /^[a-zA-ZЁёА-я]$/;
    this.elements.letter = this.elements.keyContainer.querySelectorAll('.keyboard-row .keyboard-key .letter');
    const arr = this.elements.letter;
    const capsLockButton = document.querySelector('.CapsLock');

    if (capsLockButton.classList.contains('activated')) {
      capsLockButton.classList.remove('activated');
    } else {
      capsLockButton.classList.add('activated');
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

  getCursorPosition(len) {
    this.p.cursorPosition = this.p.input.selectionStart + len;
  },

  setCursorPosition(len) {
    this.p.input.selectionStart = this.p.cursorPosition + len;
    this.p.input.selectionEnd = this.p.cursorPosition + len;
  },

  getKeyboardLanguage() {
    if (localStorage.getItem('lang') == null) {
      this.p.lang = 3;
    } else {
      this.p.lang = localStorage.getItem('lang');
    }
  },

  createKeys() {
    let k = 0;
    let j = 0;

    if (this.p.lang === 3) {
      this.p.shiftIndexKey = 4;
    } else if (this.p.lang === 1) {
      this.p.shiftIndexKey = 2;
    }

    for (k = 0; k < keyboardLayout.length; k += 1) {
      this.elements.keyRow[k] = document.createElement('div');
      this.elements.keyRow[k].classList.add('keyboard-row');
      for (j = 0; j < keyboardLayout[k].length; j += 1) {
        const key = keyboardLayout[k][j][this.p.lang];
        const shiftKey = keyboardLayout[k][j][this.p.shiftIndexKey];
        const keyClass = keyboardLayout[k][j][0];
        const keyElement = document.createElement('div');
        const keyValue = document.createElement('span');
        keyElement.classList.add('keyboard-key');
        keyElement.classList.add(`${keyClass}`);
        keyValue.classList.add('letter');
        keyValue.textContent = `${key}`;
        keyElement.appendChild(keyValue);
        this.elements.keyRow[k].appendChild(keyElement);

        keyElement.addEventListener('mousedown', (event) => {
          this.handler(event, keyClass, key, shiftKey);
        });
        keyElement.addEventListener('mouseup', (event) => {
          this.handler(event, keyClass, key, shiftKey);
        });
        document.addEventListener('keydown', (event) => {
          event.preventDefault();
          if (keyClass === event.code) {
            this.handler(event, keyClass, key, shiftKey);
          }
        });
        document.addEventListener('keyup', (event) => {
          event.preventDefault();
          if (keyClass === event.code) {
            this.handler(event, keyClass, key, shiftKey);
          }
        });
      }
      this.elements.keyContainer.appendChild(this.elements.keyRow[k]);
    }
  },

  handler(event, k, val, shiftVal) {
    if (event.altKey && event.ctrlKey) {
      console.log(`key pressed: ${event.code}`);
      this.toggleCtrlAlt();
    }
    switch (k) {
      // case 'ControlLeft':
      //   if (event.type === 'keydown') {
      //     this.p.ctrPressed = true;
      //     const findKey = document.querySelector(`.${k}`);
      //     findKey.classList.add('activated');
      //   } else if (event.type === 'keyup') {
      //     this.p.ctrPressed = false;
      //     const findKey = document.querySelector(`.${k}`);
      //     findKey.classList.remove('activated');
      //   }
      //   break;
      case 'ShiftRight':
      case 'ShiftLeft':
        if (event.type === 'keydown') {
          this.p.shiftPressed = true;
          this.toggleShift();
          const findKey = document.querySelector(`.${k}`);
          findKey.classList.add('activated');
        } else if (event.type === 'keyup') {
          this.p.shiftPressed = false;
          this.toggleShift();
          const findKey = document.querySelector(`.${k}`);
          findKey.classList.remove('activated');
        } else if (event.type === 'mousedown') {
          this.p.shiftPressed = true;
          this.toggleShift();
        } else if (event.type === 'mouseup') {
          this.p.shiftPressed = false;
          this.toggleShift();
        }
        break;

      case 'Backspace':
        if (event.type === 'mousedown') {
          this.p.value = this.backSpaceFunction();
        } else if (event.type === 'keydown') {
          this.p.value = this.backSpaceFunction();
          const findKey = document.querySelector(`.${k}`);
          findKey.classList.add('activated');
        } else if (event.type === 'keyup') {
          const findKey = document.querySelector(`.${k}`);
          findKey.classList.remove('activated');
        }
        break;

      case 'CapsLock':
        if (event.type === 'mousedown') {
          this.toggleCapslock();
        } else if (event.type === 'keydown') {
          this.toggleCapslock();
        }
        break;

      case 'Delete':
        if (event.type === 'mousedown') {
          this.p.value = this.delFunction();
        } else if (event.type === 'keydown') {
          this.p.value = this.delFunction();
          const findKey = document.querySelector(`.${k}`);
          findKey.classList.add('activated');
        } else if (event.type === 'keyup') {
          const findKey = document.querySelector(`.${k}`);
          findKey.classList.remove('activated');
        }
        break;

      case 'Tab':
        if (event.type === 'mousedown') {
          this.p.value = this.inputFunction('    ');
        } else if (event.type === 'keydown') {
          this.p.value = this.inputFunction('    ');
          const findKey = document.querySelector(`.${k}`);
          findKey.classList.add('activated');
        } else if (event.type === 'keyup') {
          const findKey = document.querySelector(`.${k}`);
          findKey.classList.remove('activated');
        }
        break;

      case 'Enter':
        if (event.type === 'mousedown') {
          this.p.value = this.inputFunction('\n');
        } else if (event.type === 'keydown') {
          this.p.value = this.inputFunction('\n');
          const findKey = document.querySelector(`.${k}`);
          findKey.classList.add('activated');
        } else if (event.type === 'keyup') {
          const findKey = document.querySelector(`.${k}`);
          findKey.classList.remove('activated');
        }
        break;

      case 'Space':
        if (event.type === 'mousedown') {
          this.p.value = this.inputFunction(' ');
        } else if (event.type === 'keydown') {
          this.p.value = this.inputFunction(' ');
          const findKey = document.querySelector(`.${k}`);
          findKey.classList.add('activated');
        } else if (event.type === 'keyup') {
          const findKey = document.querySelector(`.${k}`);
          findKey.classList.remove('activated');
        }
        break;

      default:
        if (event.type === 'mousedown') {
          const rexepr = /ControlLeft|ControlRight|AltRight|AltLeft|MetaLeft|ShiftLeft|ShiftRight/i;
          const rexeprShift = /^[a-zA-ZЁёА-я]$/;
          if (!k.match(rexepr)) {
            if (this.p.capsLock && !this.p.shiftPressed) {
              this.p.value = this.inputFunction(val.toUpperCase());
            } else if (this.p.shiftPressed && !this.p.capsLock) {
              this.inputFunction(shiftVal);
            } else if (!this.p.shiftPressed && !this.p.capsLock) {
              this.p.value = this.inputFunction(val.toLowerCase());
            } else if (this.p.shiftPressed && this.p.capsLock) {
              if (rexeprShift.test(shiftVal)) {
                this.inputFunction(shiftVal.toLowerCase());
              } else { (this.inputFunction(shiftVal)); }
            }
          }
        } else if (event.type === 'keydown') {
          const rexepr = /ControlLeft|ControlRight|AltRight|AltLeft|MetaLeft|ShiftLeft|ShiftRight/i;
          const rexeprShift = /^[a-zA-ZЁёА-я]$/;
          if (!k.match(rexepr)) {
            if (this.p.capsLock && !this.p.shiftPressed) {
              this.p.value = this.inputFunction(val.toUpperCase());
            } else if (this.p.shiftPressed && !this.p.capsLock) {
              this.inputFunction(shiftVal);
            } else if (!this.p.shiftPressed && !this.p.capsLock) {
              this.p.value = this.inputFunction(val.toLowerCase());
            } else if (this.p.shiftPressed && this.p.capsLock) {
              if (rexeprShift.test(shiftVal)) {
                this.inputFunction(shiftVal.toLowerCase());
              } else { (this.inputFunction(shiftVal)); }
            }
          }
          const findKey = document.querySelector(`.${k}`);
          findKey.classList.add('activated');
        } else if (event.type === 'keyup') {
          const findKey = document.querySelector(`.${k}`);
          findKey.classList.remove('activated');
        }
    }
  },

};

// initialize the keyboard on DOMContentLoad
window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
  keyboard.getKeyboardLanguage();
});
