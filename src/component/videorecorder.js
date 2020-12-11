import React from "react";

import './video.css';


const videoType = 'video/webm';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      videos: [],
      time: {}, 
      seconds: 60
    };
    this.timer = 0;
    this.startRecording = this.startRecording.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  async componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    this.video.srcObject = stream;
    this.video.play();
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: videoType,
    });
    this.chunks = [];
    this.mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
  }

  startRecording(e) {
    e.preventDefault();
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
    let interval = setInterval(e => this.stopRecording(e), 60000);
    this.setState({ interval });
    this.chunks = [];
    this.mediaRecorder.start(10);
    this.setState({ recording: true });
  }

  stopRecording(e) {
    this.mediaRecorder.stop();
    this.setState({ recording: false });
    this.saveVideo();
    this.state.seconds=60;
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      clearInterval(this.timer);
    }
  }

  saveVideo() {
    const blob = new Blob(this.chunks, {type: videoType});
    const videoURL = window.URL.createObjectURL(blob);
    const videos = this.state.videos.concat([videoURL]);
    this.setState({videos});
  }

  deleteVideo(videoURL) {
    const videos = this.state.videos.filter(v => v !== videoURL);
    this.setState({videos});
  }

  render() {
    const {recording, videos} = this.state;
    const index=parseInt(this.props.match.params.id);

    return (
      <div className="maiin">
        <video
          class="vid"
          ref={v => {
            this.video = v;
          }}>
          Video stream not available.
        </video>
        <div>
          {!recording && <button class="buton1"  onClick={e => this.startRecording(e)}><b>Record</b></button>}
          {recording && <button class="buton2" onClick={e => this.stopRecording(e)}><b>Stop</b></button>}
          {recording && <div class="timer">m: {this.state.time.m} s: {this.state.time.s}</div>}
        </div>
        <div>
          <p class="recc">Recorded videos:</p>
          {videos.map((videoURL, i) => (
            <div key={`video_${i}`}>
              <video class="vid1" style={{width: 400}} src={videoURL} autoPlay loop />
              <div>
                <button class="buton4" onClick={() => this.deleteVideo(videoURL)}>Delete</button>
                <a class="buton3" href={videoURL}>Download</a>
                {!recording && <button class="buton5" onClick={()=> this.props.history.push(`/${index+1}`)} >Next</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}