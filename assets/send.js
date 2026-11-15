// "Send this song to someone" button. Runs only when pressed. Sends nothing anywhere.
(function () {
  function info() {
    var title = document.querySelector('h1').textContent.trim();
    return {
      title: title,
      url: location.origin + location.pathname,
      text: 'I thought of you when I heard this song, "' + title + '." It is free to listen:'
    };
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.sendbtn');
    if (b) {
      var s = info();
      var touch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      if (touch && navigator.share) {
        navigator.share({ title: s.title, text: s.text, url: s.url }).catch(function () {});
        return;
      }
      var box = b.closest('.send').nextElementSibling;
      box.querySelector('.sendmail').href = 'mailto:?subject=' + encodeURIComponent('A song I thought you would like: ' + s.title) +
        '&body=' + encodeURIComponent(s.text + '\n\n' + s.url + '\n');
      box.hidden = !box.hidden;
      return;
    }
    var c = e.target.closest('.sendcopy');
    if (c) {
      var msg = c.closest('.sendbox').querySelector('.sendmsg');
      var url = info().url;
      var ok = function () { msg.textContent = 'Copied. Now open a message or email and paste it in.'; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(ok, function () { msg.textContent = 'Copy this address: ' + url; });
      } else { msg.textContent = 'Copy this address: ' + url; }
    }
  });
})();
