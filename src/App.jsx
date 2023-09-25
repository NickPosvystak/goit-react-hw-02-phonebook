import { Component } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm ';
import ContactList from 'components/ContactList/ContactList';
import defaultContacts from './defaultContacts.json';
import Filter from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: defaultContacts,
    filter: '',
  };

  handleAddContact = ({ name, number }) => {
    const { contacts } = this.state;
    const isContact = contacts.some(contact => contact.name === name);
    if (isContact) {
      alert(`${name} is already i contact.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
      name: '',
      number: '',
    }));
  };

  handleFilterChange = filter => {
    this.setState({ filter });
  };
  isContact = name => {
    const { contacts } = this.state;
    return contacts.some(contact => contact.name === name);
  };

  // Delete contact
  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <div className={css.box}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} />
        <h2 className={css.title}>Contacts</h2>
        <Filter
          filter={filter}
          onFilterChange={this.handleFilterChange}
          
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
