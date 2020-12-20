import React from 'react'
import PropTypes from 'prop-types'


class ListContacts extends React.Component {


    static propTypes = {
        contacts: PropTypes.array.isRequired,  //we specifiy this props is required
        onDeleteContact: PropTypes.func.isRequired,
    }

    state = {
        query: '',  //we will bind our input field to to whatever the value of a certain property of a state is
    }

    //THis function gets invoked whenever the onchnage event is triggerd on that input field
    //This function will set set the new value of query property to new input value
    updateQuery = (query) => { //the query argument will be passed event.target.value which is the value of the input field.
        this.setState(() => ({
          query: query.trim()
        }))
    }

    //A prop is any input that you pass to a React component. Just like an HTML attribute, a prop name and value are added to the Component.
    //we can access a component's props with this.props (or props in stateless functional components).


    //Having a 'Unique key' arritbute on one of those key item, React is able to performably know which item in the list has changed rather than recreating the list everytime. In our case, the contact.id is unique
    render() {
        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search Contacts'
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>   
                {JSON.stringify(this.state)}
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
            </div>      
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
                    <button className='contact-remove' onClick={() => props.onDeleteContact(contact)}>
                            Remove
                    </button>
                </li>
            ))}
        </ol>	
    )
}*/

/**
 * yarn add prop-types to install the library
 * 
 * There can be a scenario where someone in our team or maybe us accidentally passed the wrong dataType.
 * Eg. our contacts props expects an array in other for the map property to work. Someone that maybe not know component too well might pass in an Object
 * The PropTypes library allows us to specify the specific props that a component needs when the component or element is created
 * So we still get errors maybe on the page, but we have a better more detailed information in the browser console
 * 
 * One important thing about Proptypes is how it relates to third party components. Sometimes it is hard to know which specific props to pass to a component expecially if it is from a third party library.
 * If the Author of that library implemented PropTypes all you need to so is look up the PropTypes definition in other to know what specific props need to be passed to the component that you are using
 * Eg if i go to App.JS page and write ListContacts.propTypes after i imported it, then hover over 'propeTypes' i get the code below
 * 
 * (property) ListContacts.propTypes: {
    contacts: Validator<any[]>; //says contacts props expects an array
    onDeleteContact: Validator<(...args: any[]) => any>; //says on deleteCOntact expects an arrow function
    }
 * 
 * 
 * This objects will reperesent all of the different props that can be passed to this ListContacts component 
 */
/*ListContacts.propTypes = {
    contacts: PropTypes.array.isRequired,  //we specifiy this props is required
    onDeleteContact: PropTypes.func.isRequired,
}*/

export default ListContacts