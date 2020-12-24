import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts'
import ListProfiles from './ListProfiles';
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'


//  ListContacts.propTypes //i write this code to check up the props that this component expect. I can do this for third party library components too!


const profiles = [
  {
    id: 1,
    userID: '1',
    favoriteMovieID: '1',
  },
  {
    id: 2,
    userID: '2',
    favoriteMovieID: '1',
  },
  {
    id: 3,
    userID: '4',
    favoriteMovieID: '5',
  },
  {
    id: 4,
    userID: '5',
    favoriteMovieID: '2',
  },
  {
    id: 5,
    userID: '3',
    favoriteMovieID: '5',
  },
  {
    id: 6,
    userID: '6',
    favoriteMovieID: '4',
  },
];

const users = {
  1: {
    id: 1,
    name: 'Jane Cruz',
    userName: 'coder',
  },
  2: {
    id: 2,
    name: 'Matthew Johnson',
    userName: 'mpage',
  },
  3: {
    id: 3,
    name: 'Autumn Green',
    userName: 'user123',
  },
  4: {
    id: 4,
    name: 'John Doe',
    userName: 'user123',
  },
  5: {
    id: 5,
    name: 'Lauren Carlson',
    userName: 'user123',
  },
  6: {
    id: 6,
    name: 'Nicholas Lain',
    userName: 'user123',
  },
};

const movies = {
  1: {
    id: 1,
    name: 'Planet Earth 1',
  },
  2: {
    id: 2,
    name: 'Selma',
  },
  3: {
    id: 3,
    name: 'Million Dollar Baby',
  },
  4: {
    id: 4,
    name: 'Forrest Gump',
  },
  5: {
    id: 5,
    name: 'Get Out',
  },
};


//This variable lives outside of React. Any change to this variable willl not refelct in our UI
//For use to be able to keep track of the vairable and its state, we have to move it inside the State property of react.
/*const contacts = [
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
 ];*/


class App extends Component {

  //A State that is needed by multiple components needs to be lifted up to the closest common ancestor. In our case, App component is the closest ancestor to ListContacts
  //so the state that keeps track of state for the UI for ListContnect is living inside App component
  
  /*A component's state can be defined at initialization. we did this by contacts={this.state.contacts}. It is advised that, you sont want to intialize a 
  the state with props eg
  this.state = {
    user: props.user
  }
  This is an error-prone anti-pattern, since state will only be initialized with props when the component is first created. What happens when you initialize a
  state with props is the current state will not change unless the component is "refreshed." Using props to produce a component's initial state also leads to 
  duplication of data, deviating from a dependable "source of truth."
  */
  state = {
    contacts : [ // contacts is the key we will use to acess this list which is the particular state
        /* now we have an empty array. But
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
        }*/
    ],
    //screen: 'list-contact',
  }

  //this gets called right after the DOM for this component is rendered. So we update the state in here. Updating the state causes a re-render in React automatically. So our Ui will show what we want
  componentDidMount() {
    ContactsAPI.getAll() //get the contacts from the server
      .then((contacts) => {
        this.setState(() => ({ //with the response gotten from the server, we update the local state
          contacts //means contacts: contacts. so we wrote the shorthand version in js
        }))
      })
  }

//A component can alter its own internal state.
//This method is responsible for taking a specific contact and thendeleting that contact from the contact array. So this most live inside wherever the state is living. If we want another method that will add to this contact list, it will also live in this App Component etc... 
//in Order to get the method down to the ListContacts component and hook it up to the button, we passed this method as prop to the component ListContacts( onDeleteContact={this.removeContact} ) that references the function that will set the state(), then we add an onClick listener to each of the contact the map at ListContacts that will call an function(using arrow function is more easy to look) that will call the function(props.onDeleteContacr) set as props
removeContact = (contact) => {

  //we used this when the new state does not depend on the previoudState
  //so setState acceps an object as first argument
  /*this.setState({
    key: "tyler"
  })*/

  //We preferd this state because of we are updating the state based on the previousState which is passed in the argument(currentState). setState() accepsts a function with the previous sate as its first argument
  //Our teacher uses this one at all times. But it is up to you
  this.setState((currentState) => ({
    //the result of the new contacts state will be the result of calling the filter function on the previous state property (currentState.contacts) that returns the new list with the contact.id filtered out that is passed into this function based on the position of delete button clicked
    contacts: currentState.contacts.filter((c) => {
      return c.id !== contact.id
    })
  }))

  // We update our API also after updating our local state
  ContactsAPI.remove(contact)
}

createContact = (contact) => {
  ContactsAPI.create(contact)
    .then((contact) => {
      this.setState((currentState) => ({
        contacts: currentState.contacts.concat([contact])
      }))
    })
}

  render() {	
    //easily reusing all the elements is the reason why we encapsulate many elements inside a componets!
    //we also have a clean interface so that we can configure each components nicely like we did below by just giving then different 'props'
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts contacts={this.state.contacts} onDeleteContact={this.removeContact}/>
        )}/>
        <Route path='/profiles' render={() => (
          <ListProfiles profiles={profiles} movies={movies} users={users}/>
        )}/>
        <Route path='/create' render={({ history }) => ( //we now use the Router Render prop because we are now passing a custom prop to our Component
          <CreateContact 
          onCreateContact={ /**One reason we did not pass just this.createContact inside as a prop is because we wanted to navigate back to the home screen of our React Router
            So we had to use one of the prop that React gives us which is history that we destructed*/
            (contact) => {
              this.createContact(contact)
              history.push('/') /*The will re-route us to our home view */}
          }/>
        )}/>
      {/*
      We replaced the code were we dyamically render the code based on state completely with the Route
      component
      this.state.screen === 'list-contact' && (
      <ListContacts contacts={this.state.contacts} onDeleteContact={this.removeContact}
      onNavigate={() => {
        this.setState(() => ({
          screen: 'create'
        }))
      }}/>
      )*/}
      {/*this.state.screen === 'profiles' && (
      <ListProfiles profiles={profiles} movies={movies} users={users}/>
      )*/}
      {/*this.state.screen === 'create' && (
          <CreateContact />
      )*/}
      </div>
    )
  }
}


export default App;


