import React from 'react'


class ListContacts extends React.Component {

    state = {
        contacts : [ // contacts is the key we will use to acess this list which is the particular state
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
        ]
    
    }

    //A prop is any input that you pass to a React component. Just like an HTML attribute, a prop name and value are added to the Component.
    //we can access a component's props with this.props (or props in stateless functional components).


    //Having a 'Unique key' arritbute on one of those key item, React is able to performably know which item in the list has changed rather than recreating the list everytime. In our case, the contact.id is unique
    render() {
        return (
            <ol className='contact-list'>
                {this.state.contacts.map((contact) => (
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

//we switched back to class component for this because we had to mamage state for this component.
//If we just had to just render this component without worying about updating the UI redndered by this component when the remove button is clicked, we would still use our function component
/*function  ListContacts (props) {

    return (
        <ol className='contact-list'>
            {props.contacts.map((contact) => (
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
}*/

export default ListContacts