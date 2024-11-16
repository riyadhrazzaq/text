/**
 * for some reason, the katex render is rendering both the mathml and the html version.
 */

// Get all elements with the class name "katex-html"
const katexElements = document.querySelectorAll('.katex-html');

// Remove each element from the DOM
katexElements.forEach(element => {
  element.remove();
});

console.log("cleaner ran")