let appHasStarted;

export function spyOnAddEventListener(win) {
  // win = window object in our application
  const addListener = win.EventTarget.prototype.addEventListener;
  win.EventTarget.prototype.addEventListener = function (name) {
    if (name === 'click') {
      // web app added an event listener to the input box -
      // that means the web application has started
      appHasStarted = true;
      // restore the original event listener
      win.EventTarget.prototype.addEventListener = addListener;
    }
    return addListener.apply(this, arguments);
  };
}

export function waitForAppStart() {
  // keeps rechecking "appHasStarted" variable
  return new Cypress.Promise((resolve, reject) => {
    const isReady = () => {
      if (appHasStarted) {
        return resolve();
      }
      setTimeout(isReady, 1);
    };
    isReady();
  });
}
