import React from "react";
import ReactDOM from "react-dom";


const videoType = 'video/webm';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      videos: [],
    };
  }

  async componentDidMount() {
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
    this.chunks = [];
    this.mediaRecorder.start(10);
    this.setState({recording: true});
  }

  stopRecording(e) {
    e.preventDefault();
    this.mediaRecorder.stop();
    this.setState({recording: false});
    this.saveVideo();
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

    return (
      <div className="camera">
        <video
          style={{width: 400}}
          ref={v => {
            this.video = v;
          }}>
          Video stream not available.
        </video>
        <div>
          {!recording && <button onClick={e => this.startRecording(e)}>Record</button>}
          {recording && <button onClick={e => this.stopRecording(e)}>Stop</button>}
        </div>
        <div>
          <h5>Recorded videos:</h5>
          {videos.map((videoURL, i) => (
            <div key={`video_${i}`}>
              <video style={{width: 200}} src={videoURL} autoPlay loop />
              <div>
                <button onClick={() => this.deleteVideo(videoURL)}>Delete</button>
                <a href={videoURL}>Download</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
