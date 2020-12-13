import React, { Component } from 'react';

class ContactList extends React.Component {
  render() {
    const people = this.props.contacts //this way we can initilalze the data dynamically inside the JSX when with the data passed to the props of this component instead of hard coding the data in here

    return <ol>
      {people.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ol>
  }
}


class App extends Component {
  render() {	
    //easily reusing all the elements is the reason why we encapsulate many elements inside a componets!
    //we also have a clean interface so that we can configure each components nicely like we did below by just giving then different 'props'
    return (
      <div className="Apps">
      <ContactList contacts={[{ name: 'Tyler '},{ name: 'Karen' },{ name: 'Richard '}]}/>
      <ContactList contacts={[{ name: 'chidi '},{ name: 'Ezeh' },{ name: 'Ifeanyi'}]}/>
      </div>
    )
  }
}


export default App;


