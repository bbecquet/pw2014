function getJSON(options, callback, error) {
  var xhr = new XMLHttpRequest();
  options.url = options.url || location.href;
  options.data = options.data || null;
  callback = callback || function() {};
  var url = options.url;
  
  if (options.type == 'jsonp') {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);

  } else {
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if(xhr.status == 200) {
          callback(xhr.responseText);
        } else if(error) {
          error(xhr);
        }
      }
    };
    xhr.open('GET', options.url, true);
    xhr.send(options.data);
  }
}

function createButton(parent, className, label, action) {
  var buttonElt = L.DomUtil.create('button', className, L.DomUtil.get(parent));
  buttonElt.innerHTML = label;
  L.DomEvent.addListener(buttonElt, 'click', action);
  return buttonElt;
};