// function to check if JavaScript is running in the browser or in node.

export function isBrowser() {
  // Check if the environment is Node.js
  if (typeof process === 'object' && typeof require === 'function') {
    return false;
  }

  // Check if the environment is a
  // Service worker
  if (typeof importScripts === 'function') {
    return false;
  }

  // Check if the environment is a Browser
  if (typeof window === 'object') {
    return true;
  }
}
