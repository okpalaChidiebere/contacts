import React, { Component } from 'react'
import { Link } from 'react-router-dom' //we imported React router Link Component beacuse we want to create a back button. Normal backButton form browser will still work though ;)
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize' //instead of having the browser to serialize our form and throw the values into the url like '' we want to do that ourselves and save it into an object. The library will helps us acheive that

class CreateContact extends Component {

  handleSubmit = (e) => {
    e.preventDefault() //this will prevent the browser from serializing our form and  throwing the values of the form in the url
    const values = serializeForm(e.target, { hash: true })
    //console.log('values', values) //when you look at the log you see,  an object that represents our form data

    if (this.props.onCreateContact) {
      this.props.onCreateContact(values) //we invoke this function that will be passed as a prop to CreateContact component that will not decide what to do with the data from our form
    }
  }

  render() {
    return (
      <div>
        <Link
          className='close-create-contact'
          to='/'>
            Close
        </Link>
        <form className='create-contact-form' onSubmit={this.handleSubmit}>
          <ImageInput
            className='create-contact-avatar-input'
            name='avatarURL'
            maxHeight={64}
          />
          <div className='create-contact-details'>
            <input type='text' name='name' placeholder='Name' />
            <input type='text' name='handle' placeholder='Handle' />
            <button>Add Contact</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateContact 