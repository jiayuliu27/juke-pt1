var React = require("react");
var ReactDOM = require("react-dom");

function Album(props) {

	return (

		<div className="album col-xs-10">
				  <div>
				    <h3>{ props.name }</h3>
				    <img src={ props.imageUrl } className="img-thumbnail" />
				  </div>
				  <table className='table'>
				    <thead>
				      <tr>
				        <th></th>
				        <th>Name</th>
				        <th>Artists</th>
				        <th>Genre</th>
				      </tr>
				    </thead>
				    <tbody>
				      { props.songs.map(function(result, index) {
				      	return(
				      	<tr key={result.id}>
					        <td>
					          <button className={result.id === props.currentSong && props.isPlaying ? 'btn btn-default btn-xs hide' : 'btn btn-default btn-xs'} onClick={() => props.handleClick(index)}>
					            <span className="glyphicon glyphicon-play"></span>
					          </button>
					          <button className={result.id !== props.currentSong || (result.id === props.currentSong && props.isPlaying === false) ? 'btn btn-default btn-xs hide' : 'btn btn-default btn-xs'} onClick={() => props.pause()}>
					            <span className="glyphicon glyphicon-pause"></span>
					          </button>
					        </td>
					        <td>{result.name}</td>
					        <td>{ result.artists.map(function(a) {
					        	return (
					        		 a.name 
					        	)
					        }).join(" ")}
					        </td>
					        <td>{result.genre}</td>
					      </tr>
				      	);
				      }) }
				    </tbody>
				  </table>
				</div>
	);

}

module.exports = Album;