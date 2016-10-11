var React = require("react");
var ReactDOM = require("react-dom");

class Footer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<footer>
	        <div>
	          <div className='pull-left'>
	            <button className="btn btn-default" onClick={() => {this.props.handleClick(this.props.index - 1)}}>
	              <span className="glyphicon glyphicon-step-backward"></span>
	            </button>
	            <button className={this.props.isPlaying ? "btn btn-default hide" : "btn btn-default"}>
	              <span className="glyphicon glyphicon-play" onClick={() => {this.props.play()}}></span>
	            </button>
	            <button className={this.props.isPlaying ? "btn btn-default" : "btn btn-default hide"} onClick={() => {this.props.pause()}}>
	              <span className="glyphicon glyphicon-pause"></span>
	            </button>
	            <button className="btn btn-default" onClick={() => {this.props.handleClick(this.props.index + 1)}}>
	              <span className="glyphicon glyphicon-step-forward"></span>
	            </button>
	          </div>
	          <div className="bar">
	            <div className="progress">
				<div className="progress-bar" style={{width: `${this.props.progress}%`}}>
				</div>

	            </div>
	          </div>
	        </div>
	      </footer>
		);
	}
}

module.exports = Footer;