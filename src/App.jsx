import { Component } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm ';
import ContactList from 'components/ContactList/ContactList';
import defaultContacts from './defaultContacts.json';
import { nanoid } from 'nanoid';  

export class App extends Component {
  state = {
    contacts: defaultContacts,
    filter: '',
    name: '',
    number: '',
  };


  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    if (name.trim() === '') return;

    const newContact = {
      id: nanoid(),
      name,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
    }));
  };

  render() {
    const { name, contacts } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleNameChange}
            required
          />
          <button type="submit">Add Contact</button>
        </form>
        <h2>Contacts</h2>
        <ul>
          {contacts.map(contact => (
            <li key={contact.id}>{contact.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
