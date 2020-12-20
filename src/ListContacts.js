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

    //This methods resests the input field in the form
    //This method is called when the user clicks the 'show all' button right below the search imput box
    clearQuery = () => {
        this.updateQuery('')
    }

    //A prop is any input that you pass to a React component. Just like an HTML attribute, a prop name and value are added to the Component.
    //we can access a component's props with this.props (or props in stateless functional components).


    //Having a 'Unique key' arritbute on one of those key item, React is able to performably know which item in the list has changed rather than recreating the list everytime. In our case, the contact.id is unique
    render() {

        /** A more nicer coding practise for variables in js by destructing. So we refrence this.state and ths.props once
         * rather than all over the place in oue JSX
         */
        const { query } = this.state //Remember with class components you can initialize the component with a state directly rather than props
        const { contacts, onDeleteContact } = this.props
    
        //this variable will become the what we will use to map the UI that is gotten from the new filtered contacts list. Remember we used the contacts from the props directly before we added this feature where the contact list depends on the value of the query property state 
        const showingContacts = query === '' 
          ? contacts //if the search field is empty, we leave the list as it is
          : contacts.filter((c) => ( //when the list is not empty, we filter the list
              c.name.toLowerCase().includes(query.toLowerCase())  //filter the list by  matchig the name of the users and the value in the input box eg 'ka' in the input box will match 'karen' and 'kalehof' in contact list
        ))

        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search Contacts'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>

                { //the '&&' below is called a guard-up operator in JS. The code inside the () after the operator will only run if the condition written before the operator is true
                //Show we show ths code when we have contacts filtered out is less than the actual contact length. Remember React is just JavaScript so you can weite intuitive logic too!
                showingContacts.length !== contacts.length && (
                <div className='showing-contacts'>
                    <span>Now showing {showingContacts.length} of {contacts.length}</span>
                    <button onClick={this.clearQuery}>Show all</button>
                </div>
                )}


                <ol className='contact-list'>
                {showingContacts.map((contact) => (
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
                        <button className='contact-remove' onClick={() => onDeleteContact(contact)}>
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