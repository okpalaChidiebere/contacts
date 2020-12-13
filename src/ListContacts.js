import React, { Component } from 'react'


class ListContacts extends Component {

    //A prop is any input that you pass to a React component. Just like an HTML attribute, a prop name and value are added to the Component.
    //we can access a component's props with this.props (or props in stateless functional components).


    //Having a 'Unique key' arritbute on one of those key item, React is able to performably know which item in the list has changed rather than recreating the list everytime. In our case, the contact.id is unique
    render() {
        return (
            <ol className='contact-list'>
                {this.props.contacts.map((contact) => (
                <li key={contact.id} className='contact-list-item'>
                    <div
                    className='contact-avatar'
                    style={{
                        backgroundImage: `url(${contact.avatarURL})`
                    }}
                    ></div>
                    <div className='contact-details'>
                        <p>{contact.name}</p>
                        <p>@{contact.handle}</p>
                    </div>
                    <button className='contact-remove'>
                            Remove
                    </button>
                </li>
                ))}
            </ol>	      
        )
    }
}

export default ListContacts