{
    class AudioPlayer extends HTMLElement {
      playing = false;
      volume = 0.4;
      prevVolume = 0.4;
      initialized = false;
      barWidth = 3;
      barGap = 1;
      bufferPercentage = 75;
      nonAudioAttributes = new Set(['title', 'bar-width', 'bar-gap', 'buffer-percentage']);
      
      constructor() {
        super();
        
        this.attachShadow({mode: 'open'});
        this.render();
      }
      
      static get observedAttributes() {
        return [
          // audio tag attributes
          // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
          'src', 'muted', 'crossorigin', 'loop', 'preload', 'autoplay',
          // the name of the audio
          'title',
          // the size of the frequency bar
          'bar-width',
          // the size of the gap between the bars
          'bar-gap',
          // the percentage of the frequency buffer data to represent
          // if the dataArray contains 1024 data points only a percentage of data will
          // be used to draw on the canvas
          'buffer-percentage'
        ];
      }
      
      async attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
          case 'src':
            this.initialized = false;
            this.render();
            this.initializeAudio();
            break;
          case 'muted':
            this.toggleMute(Boolean(this.audio?.getAttribute('muted')));
            break;
          case 'title':
            this.titleElement.textContent = newValue;
            break;
          case 'bar-width':
            this.barWidth = Number(newValue) || 3;
            break;
          case 'bar-gap':
            this.barGap = Number(newValue) || 1;
            break;
          case 'buffer-percentage':
            this.bufferPercentage = Number(newValue) || 75;
            break;
          default:
        }
        
        this.updateAudioAttributes(name, newValue);
      }
      
      updateAudioAttributes(name, value) {
        if (!this.audio || this.nonAudioAttributes.has(name)) return;
        
        // if the attribute was explicitly set on the audio-player tag
        // set it otherwise remove it
        if (this.attributes.getNamedItem(name)) {
          this.audio.setAttribute(name, value ?? '')
        } else {
          this.audio.removeAttribute(name);
        }
      }
      
      initializeAudio() {
        if (this.initialized) return;
        
        this.initialized = true;
        
        this.audioCtx = new AudioContext();
        this.gainNode = this.audioCtx.createGain();
        this.analyserNode = this.audioCtx.createAnalyser();
        this.track = this.audioCtx.createMediaElementSource(this.audio);
        
        this.analyserNode.fftSize = 2048;
        this.bufferLength = this.analyserNode.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.analyserNode.getByteFrequencyData(this.dataArray);
        
        this.track
          .connect(this.gainNode)
          .connect(this.analyserNode)
          .connect(this.audioCtx.destination);
        
        this.changeVolume();
      }
      
        
      
      attachEvents() {
        this.volumeBar.parentNode.addEventListener('click', e => {
          if (e.target === this.volumeBar.parentNode) {
            this.toggleMute();
          }
        }, false);
        
        this.playPauseBtn.addEventListener('click', this.togglePlay.bind(this), false);
        
        this.volumeBar.addEventListener('input', this.changeVolume.bind(this), false);
        
        this.progressBar.addEventListener('input', (e) => this.seekTo(this.progressBar.value), false);
        
        this.audio.addEventListener('loadedmetadata', () => {
          this.progressBar.max = this.audio.duration;
          this.durationEl.textContent = this.getTimeString(this.audio.duration);
          this.updateAudioTime();
        })
        
        this.audio.addEventListener('error', (e) => {
          this.titleElement.textContent = this.audio.error.message;
          this.playPauseBtn.disabled = true;
        })
        
        this.audio.addEventListener('timeupdate', () => {
          this.updateAudioTime(this.audio.currentTime);
        })
        
        this.audio.addEventListener('ended', () => {
          this.playing = false;
          this.playPauseBtn.textContent = 'play';
          this.playPauseBtn.classList.remove('playing');
        }, false);
        
        this.audio.addEventListener('pause', () => {
          this.playing = false;
          this.playPauseBtn.textContent = 'play';
          this.playPauseBtn.classList.remove('playing');
        }, false);
        
        this.audio.addEventListener('play', () => {
          this.playing = true;
          this.playPauseBtn.textContent = 'pause';
          this.playPauseBtn.classList.add('playing');
          this.updateFrequency();
        }, false);
      }
      
      async togglePlay() {
        if (this.audioCtx.state === 'suspended') {
          await this.audioCtx.resume();
        }
        
        if (this.playing) {
          return this.audio.pause();
        }
        
        return this.audio.play();
      }
      
      getTimeString(time) {
        const secs = `${parseInt(`${time % 60}`, 10)}`.padStart(2, '0');
        const min = parseInt(`${(time / 60) % 60}`, 10);
    
        return `${min}:${secs}`;
      }
      
      changeVolume() {
        this.volume = Number(this.volumeBar.value);
        
        if (Number(this.volume) > 1) {
          this.volumeBar.parentNode.className = 'volume-bar over';
        } else if (Number(this.volume) > 0) {
          this.volumeBar.parentNode.className = 'volume-bar half';
        } else {
          this.volumeBar.parentNode.className = 'volume-bar';
        }
        
        if (this.gainNode) {
          this.gainNode.gain.value = this.volume;
        }
      }
      
      toggleMute(muted = null) {
        this.volumeBar.value = muted || this.volume === 0 ? this.prevVolume : 0;
        this.changeVolume();
      }
      
      seekTo(value) {
        this.audio.currentTime = value;
      }
      
      updateAudioTime() {
        this.progressBar.value = this.audio.currentTime;
        this.currentTimeEl.textContent = this.getTimeString(this.audio.currentTime);
      }
      
      style() {
        return `
        <style>
          :host {
            width: 100%;
            max-width: 400px;
          }
          
          * {
              box-sizing: border-box;
          }
          
          .audio-player {

            border-radius: 5px;
            padding: 5px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative; 
            margin: 3vh 4vw 3vh 4vw;
            margin-left: 250px;
          }
          
          .audio-name {
              position: absolute;
              padding: 5px 10px;
              font-size: 12px;
              width: 100%;
              left: 0;
              z-index: 2;
              text-transform: capitalize;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              font-weight: 400;
              top: calc(100% + 2px);
              background: #111;
              margin: 0;
              border-radius: 3px;
          }
          
          .play-btn {
              width: 30px;
              min-width: 30px;
              height: 30px;
              margin-right: 10px;
              background-image: url("../../assets/play.png");
             
              background-size: cover; 

              background-position: center center;

              appearance: none;
              border: none;
              text-indent: -999999px;
              overflow: hidden;
              background-color: black;
              cursor:pointer;
          }
          
          .play-btn.playing {
            //  border-radius: 50%;
            //  background-color: #BEB0A7

            appearance: none;
            border: none;
            text-indent: -999999px;
            overflow: hidden;
            background-image: url("../../assets/pause.png");

          }
          
          .volume-bar {
            margin-right: 200px;
            width: 30px;
            min-width: 30px;
            height: 30px;
            margin-left: -140px;          
            background-size: cover;
            background-image: url("../../assets/volume-mute.png");
            position: relative;
            cursor: pointer;
        }
    
        .volume-bar.half {
            background-image: url("../../assets/volume-min.png");
        }
    
        .volume-bar.over {
            background-image: url("../../assets/volume-max.png");
        }
    
        .volume-field {
            display: none;
            position: absolute;
            appearance: none;
            height: 20px;
            left: 100%;
            top: 50%;
            transform: translateY(-50%) rotate(180deg);
            z-index: 5;
            margin: 0;
            border-radius: 2px;
            background: #2a434c;
        }
    
        .volume-field::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 10px;
            background: whitesmoke;
        }
    
        .volume-field::-moz-range-thumb {
            appearance: none;
            height: 20px;
            width: 10px;
            background: whitesmoke;
        }
    
        .volume-field::-ms-thumb {
            appearance: none;
            height: 20px;
            width: 13vw;
            float: right;
            box-shadow: -1000px 0 0 1000px whitesmoke;
            background: whitesmoke;
        }
    
        .volume-bar:hover .volume-field {
            display: block;
        }
          
          .progress-indicator {
              display: flex;
              justify-content: flex-end;
              position: relative;
              flex: 1;
              font-size: 12px;
              align-items: center;
              height: 20px;
              color: none;
          }

          
          .progress-bar {
              flex: 1;
              position: relative;
              top: 50%;
              left: 0;
              z-index: 2;
              transform: translateY(-50%);
              width: 100%;
              appearance: none;
              margin: auto;
              margin-bottom: 20px;
              margin-right: 5px;
              margin-left: 5px;
              overflow: hidden;
              background:#2a434c;
              border-radius: 20px;
              height: 8px;
          }
          
          
      

          .progress-bar::-webkit-slider-thumb {
              appearance: none;
              height: 20px;
              width: 0;
              box-shadow: -1000px 0 0 1000px whitesmoke;     
              transition: background-color 0.3s ease; /* Aggiungi una transizione per un effetto più fluido */        
          }
          

          .progress-bar::-webkit-slider-thumb:hover {
            box-shadow: -1000px 0 0 1000px #55b6dc; /* Cambia il colore dell'ombra al passaggio del mouse */
            
        }

          .progress-bar::-moz-range-thumb {
              appearance: none;
              height: 20px;
              width: 0;
              // box-shadow: -300px 0 0 300px #ffffff21;
              box-shadow: -1000px 0 0 1000px whitesmoke;
              
          }
          
          .progress-bar::-ms-thumb {
              appearance: none;
              height: 20px;
              width: 0;
              // box-shadow: -300px 0 0 300px #ffffff21;
              box-shadow: -1000px 0 0 1000px whitesmoke;
              
          }
          
          .duration,
          .current-time {
              position: relative;
              z-index: 1;
              text-shadow: 0 0 2px #111;
          }
          
          .duration {
              margin-left: 2px;
              margin-right: 5px;
              margin-right: 150px;
          }
          
          .duration::before {
              content: '/';
              display: inline-block;
              margin-right: 2px;
          }
          
        </style>
      `
      }
      
      render() {
        this.shadowRoot.innerHTML = `
         ${this.style()}
          <figure class="audio-player">
            <audio style="display: none"></audio>
            <button class="play-btn" type="button">play</button>
            <div class="progress-indicator">
                <span class="current-time">0:0</span>
                <input type="range" max="100" value="0" class="progress-bar">
                <span class="duration">0:00</span>
            </div>
            <div class="volume-bar">
                <input type="range" min="0" max="2" step="0.01" value="${this.volume}" class="volume-field">
            </div>
          </figure>
        `;
        
        this.audio = this.shadowRoot.querySelector('audio');
        this.playPauseBtn = this.shadowRoot.querySelector('.play-btn');
        this.titleElement = this.shadowRoot.querySelector('.audio-name');
        this.volumeBar = this.shadowRoot.querySelector('.volume-field');
        this.progressIndicator = this.shadowRoot.querySelector('.progress-indicator');
        this.currentTimeEl = this.progressIndicator.children[0];
        this.progressBar = this.progressIndicator.children[1];
        this.durationEl = this.progressIndicator.children[2];
        
        // support retina display on canvas for a more crispy/HD look
        const scale = window.devicePixelRatio;
        this.volumeBar.value = this.volume;
        
        // if rendering or re-rendering all audio attributes need to be reset
        for (let i = 0; i < this.attributes.length; i++) {
          const attr = this.attributes[i];
          this.updateAudioAttributes(attr.name, attr.value);
        }
        
        this.attachEvents();
      }
    }
    
    customElements.define('audio-player', AudioPlayer);
  }
  