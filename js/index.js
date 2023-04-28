/* eslint-disable import/extensions */
import keyboardLayout from './keys.js';

const keyboard = {
  elements: {
    mainContainer: null,
    heading: null,
    subheading: null,
    subsubheading: null,
    textarea: null,
    keyRow: [],
    keyContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
  },

  properties: {
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
    for (let i = 0; i < 5; i += 1) {
      this.elements.keyRow[i] = document.createElement('div');
      this.elements.keyRow[i].classList.add('keyboard-row');
      this.elements.keyContainer.appendChild(this.elements.keyRow[i]);
    }
    document.body.appendChild(this.elements.mainContainer);
  },

  createKeys() {
    const arrayOfRows = [];
    let k = 0;
    let j = 0;
    let keyElement;
    let keyValue;

    for (let i = 0; i < this.elements.keyRow.length; i += 1) {
      const style = getComputedStyle(this.elements.keyRow[i]);
      const template = style.gridTemplateColumns;
      const len = template.split(' ').length;
      arrayOfRows.push(len);
    }

    for (k = 0; k < 5; k += 1) {
      for (j = 0; j < arrayOfRows[k]; j += 1) {
        keyElement = document.createElement('div');
        keyValue = document.createElement('span');
        keyElement.classList.add('keyboard-key');
        keyElement.classList.add(`${keyboardLayout[k][j][0]}`);
        keyValue.classList.add('letter');
        keyValue.textContent = `${keyboardLayout[k][j][3]}`;
        keyElement.appendChild(keyValue);
        this.elements.keyRow[k].appendChild(keyElement);
      }
    }
  },

  triggerEvent(handlerName) {
    console.log(`Event triggered! Name of the event: ${handlerName}`);
  },

  toggleCapslock() {
    console.log('Capslock toggled!');
  },
};

// initialize the keyboard on DOMContentLoad
window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
  keyboard.createKeys();
});
