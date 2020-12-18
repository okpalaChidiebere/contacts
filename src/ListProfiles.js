import React from 'react';


/*class ListProfiles extends Component{

    //A row will look like 'Jane Cruz's favorite movie is Planet Earth 1.'
  render(){
    return(
      <ol>
      {this.props.profiles.map( profile => (
      <li key={profile.userID} ><p>{this.props.users[profile.userID].name}'s favorite movie is {this.props.movies[profile.favoriteMovieID].name}.</p></li>
       ))}
      </ol>
    )
  }
}*/

const ListProfiles = props => {
  return (
    <ol>
      {props.profiles.map( profile => (
      <li key={profile.userID} ><p>{props.users[profile.userID].name}'s favorite movie is {props.movies[profile.favoriteMovieID].name}.</p></li>
       ))}
    </ol>
  )
}

export default ListProfiles