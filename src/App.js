import React, { Component } from 'react';
import ListContacts from './ListContacts'

const contacts = [
  {
    "id": "karen",
    "name": "Karen Isgrigg",
    "handle": "karen_isgrigg",
    "avatarURL": "http://localhost:5001/karen.jpg"
  },
  {
    "id": "richard",
    "name": "Richard Kalehoff",
    "handle": "richardkalehoff",
    "avatarURL": "http://localhost:5001/richard.jpg"
  },
  {
    "id": "tyler",
    "name": "Tyler McGinnis",
    "handle": "tylermcginnis",
    "avatarURL": "http://localhost:5001/tyler.jpg"
  }
 ];


class App extends Component {
  render() {	
    //easily reusing all the elements is the reason why we encapsulate many elements inside a componets!
    //we also have a clean interface so that we can configure each components nicely like we did below by just giving then different 'props'
    return (
      <div>
      <ListContacts contacts={contacts}/>
      </div>
    )
  }
}


export default App;


