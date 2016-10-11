var React = require("react");
var ReactDOM = require("react-dom");

var Sidebar = require("./sidebar");
var Footer = require("./footer");
var Album = require("./album");


const audio = document.createElement('audio');

class Main extends React.Component {
	constructor() {
		super();
		this.state = {
		  name: 'Abbey Road',
		  imageUrl: 'http://fillmurray.com/300/300',
		  songs: [{
		    name: 'Romeo & Juliette',
		    artists: [{name: 'Bill'}],
		    genre: 'Funk',
		    audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
		  }, {
		    name: 'White Rabbit',
		    artists: [{name: 'Bill'}, {name: 'Bob'}],
		    genre: 'Fantasy',
		    audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
		  }, {
		    name: 'Lucy in the Sky with Diamonds',
		    artists: [{name: 'Bob'}],
		    genre: 'Space',
		    audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
		  }]
		};
		// this.start = this.start.bind(this);
		this.state.currentSong = -1;
		this.state.isPlaying = false;
		this.state.index = -1;
		this.state.progress = 0;
	}

	// start() {
	// 	audio.src = '';
	// 	audio.load();
	// 	audio.play();
	// }	
	componentDidMount() {
		$.ajax({
			url: '/api/albums/1',
			method: 'GET',
			success: function(data)  {
				console.log("success");
			},
			error: function() {
				console.log("error");

			} 
		})
		.then((data) => {
			console.log("this.state", this.state);
			data.imageUrl = `/api/albums/${data.id}/image`;
			data.handleClick = (index) => {

				if(index > data.songs.length - 1) {
					index = 0;
				} else if( index < 0) {
					index = data.songs.length - 1;
				}

				var songId = data.songs[index].id;
				this.setState({index: index, currentSong: songId, isPlaying: true})
				console.log(this.state.currentSong);

				audio.src = data.songs[index].url;
				audio.load();
				audio.play();
			}

			data.pause = () => {
				this.setState({isPlaying: false})
				audio.pause();
			}
			data.play = () => {
				this.setState({isPlaying: true});
				audio.play();
			}
			this.setState(data);

			audio.addEventListener('ended', () => {
				data.handleClick(this.state.index + 1)

			});

			audio.addEventListener('timeupdate', () => {
			  this.setState({
			    progress: 100 * audio.currentTime / audio.duration
			  });
			});

			console.log("------------this.state", this.state);
		});

	}
	render() {
		return (
			<div id="main" className="container-fluid">
				<div className="col-xs-2">
					<Sidebar />
				</div>
				<Album {...this.state} start={this.start} />
				<Footer {...this.state}/>
			</div>
		);
	}
}

const toJson = (response) => {return response.json()};
const log = console.log.bind(console);
const logError = console.error.bind(console);

fetch('/api/songs/1')
  .then(toJson)
  .then(log)
  .catch(logError);

module.exports = Main;