document.getElementById("test1").addEventListener("click", function () {
  var el = document.getElementById("effect1");
  var style = window.getComputedStyle(el);
  if (style.display === 'none') {
    el.removeAttribute("style");
  } else {
    el.setAttribute("style", "display:none;");
  }
});
