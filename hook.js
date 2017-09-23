// Hide Wayback nav bar.
document.getElementById("wm-ipp").style.display = "none";

console.log(document.URL, 'content');

html2canvas(document.body, {
  onrendered: function(canvas) {
    chrome.runtime.sendMessage(canvas.toDataURL());
  },
  width: 600,
  height: 500
});
