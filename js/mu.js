// [Mu]stify 0.1 - AryKay , arykermanchi@gmail.com

  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render images.
    for (var i = 0, f; f = files[i]; i++) {

      // ONLY images.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var choice;
          var span = document.createElement('span');
          // ONLY FOR DEMO
          $.getJSON("http://developer.echonest.com/api/v4/song/search?api_key=MWVQLCZIQNXYIMKIE&artist=" + choose + "&sort=song_hotttnesss-desc", function(chosen){
		  choice = chosen.response.songs[0].id;
          $.getJSON("http://developer.echonest.com/api/v4/song/profile?api_key=MWVQLCZIQNXYIMKIE&id=" + choice + "&bucket=audio_summary", function(obj){
// Song's details
	var energy = obj.response.songs[0].audio_summary.energy;
	var dance = obj.response.songs[0].audio_summary.danceability;
	var loud = obj.response.songs[0].audio_summary.loudness;
	var tempo = obj.response.songs[0].audio_summary.tempo;
// Filter's details
	var contrast = 0;
	var saturate = 0;
	var blur = 0;
	var huerotate = 0;
	var brightness = 0;
	var sepia = 0;
	var grayscale = 0;
// Filter generation algorithm - WARNING: THIS ALGORITHM RADIATES A DANGEROUS AMOUNT OF AWESOMENESS. DO NOT STARE AT IT FOR TOO LONG OR YOU WILL BE [MY]STIFIED.
if (energy < 0.5) {
		contrast = 4.8;
		if (dance < 0.5) {
			saturate = 4.3;
		} else if (loud < 0.5) {
			saturate = 3.4;
		} else if (tempo < 0.5) {
			saturate = 2;
		} else {
			saturate = -1.8;
		}
	}
if (loud < -3) {
	brightness = 1.2;
	contrast = Math.max(contrast,1.4)
	saturate = Math.max(saturate,3.4);
    }	

if (dance > 0.5) {
	blur = 2;
	huerotate = 240;
	saturate = 4.3;
	}

if (tempo < 140) {
	sepia = 0.3;
	contrast = Math.max(contrast,1.6);
	saturate = Math.max(saturate,2);
    }
if (dance <= 0.5) {
	brightness = Math.max(brightness,1.1);
	grayscale = 0.6;	
	}
if (energy >= 0.5) {
	blur = 2;
	grayscale = Math.max(grayscale,0.5);
	huerotate = Math.max(huerotate,90);
	}
if (loud >= -3) {
	blur = Math.max(blur,1);
	grayscale = Math.max(grayscale,0.4);
	huerotate = Math.max(huerotate,150);
	}
if (tempo >= 140) {
	blur = Math.min(blur,1);
	brightness = Math.min(brightness,0.9);
	huerotate = Math.max(huerotate,180);
}

// Applying the filter to css
set('hue-rotate', huerotate + 'deg', 'blur', blur + 'px', 'saturate', saturate, 'contrast', contrast, 'sepia', sepia, 'grayscale', grayscale, 'brightness', brightness);
// Filter modifier
var el = document.querySelector('img');
var FILTER_VALS = {};

function go(me, className) {
  var activeButton = document.querySelector('button.active');
  if (activeButton) {
    activeButton.classList.remove('active');
    el.classList.remove(activeButton.textContent);
  }

  me.classList.add('active');
  el.classList.toggle(className);
}
function set(filter1, value1, filter2, value2, filter3, value3, filter4, value4, filter5, value5, filter6, value6, filter7, value7) {
  FILTER_VALS = {};

    FILTER_VALS[filter1] = typeof value1 == 'number' ? Math.round(value1 * 10) / 10 : value1;
  if (value1 == 0 || (typeof value1 == 'string' && value1.indexOf('0') == 0)) {
    delete FILTER_VALS[filter1];
  }
  render();
  
    FILTER_VALS[filter2] = typeof value2 == 'number' ? Math.round(value2 * 10) / 10 : value2;
  if (value2 == 0 || (typeof value2 == 'string' && value2.indexOf('0') == 0)) {
    delete FILTER_VALS[filter2];
  }
  render();
  
    FILTER_VALS[filter3] = typeof value3 == 'number' ? Math.round(value3 * 10) / 10 : value3;
  if (value3 == 0 || (typeof value3 == 'string' && value3.indexOf('0') == 0)) {
    delete FILTER_VALS[filter3];
  }
  render();
  
    FILTER_VALS[filter4] = typeof value4 == 'number' ? Math.round(value4 * 10) / 10 : value4;
  if (value4 == 0 || (typeof value4 == 'string' && value4.indexOf('0') == 0)) {
    delete FILTER_VALS[filter4];
  }
  render();
  
    FILTER_VALS[filter5] = typeof value5 == 'number' ? Math.round(value5 * 10) / 10 : value5;
  if (value5 == 0 || (typeof value5 == 'string' && value5.indexOf('0') == 0)) {
    delete FILTER_VALS[filter5];
  }
  render();
  
    FILTER_VALS[filter6] = typeof value6 == 'number' ? Math.round(value6 * 10) / 10 : value6;
  if (value6 == 0 || (typeof value6 == 'string' && value6.indexOf('0') == 0)) {
    delete FILTER_VALS[filter6];
  }
  render();
  
    FILTER_VALS[filter7] = typeof value7 == 'number' ? Math.round(value7 * 10) / 10 : value7;
  if (value7 == 0 || (typeof value7 == 'string' && value7.indexOf('0') == 0)) {
    delete FILTER_VALS[filter7];
  }
  render();
}

function render() {
  el = document.querySelector('img');
  var vals = [];
  Object.keys(FILTER_VALS).sort().forEach(function(key, i) {
    vals.push(key + '(' + FILTER_VALS[key] + ')');
  });
  var val = vals.join(' ');
  el.style.webkitFilter = val;
  document.querySelector('output').textContent = '-webkit-filter: ' + (val ? val : 'none') + ';';
}

function jsonFlickrFeed(feed) {
  var items = feed.items;
  el.src = items[Math.floor(Math.random() * items.length)].media.m;
  el.onload = function(e) {
    this.parentElement.classList.add('drop-shadow');
  }
}

window.addEventListener('keydown', function(e) {
  if (e.keyCode == 27) { // ESC
    document.querySelector('details').open = false;
  }
}, false);
});
}); 
       span.innerHTML = ['<img id="pic" src="', e.target.result,
                         '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
    
  })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
  
  