import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css',
})
export class ContactDetailsComponent implements OnInit {
  @ViewChild('contactModal') contactModal: ElementRef;
  @ViewChild(ContactFormComponent) contactFormComponent: ContactFormComponent;

  contacts: Contact[] = [];
  selectedContact: Contact | undefined;
  contactForm: FormGroup;
  isModalOpen = false;
  contactId = 0;
  
  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder
  ) {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts(): void {
    this.contactService.getAllContacts().subscribe(
      (response) => {
        this.contacts = response.items;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }

  openAddContact(): void {
    this.contactFormComponent.contact = null;
    this.contactFormComponent.reset(); 
    this.showModal();
  }

  openEditContact(contact: Contact): void {
    this.contactId = contact.id;
    this.selectedContact = contact;    
    this.showModal();
  }

  showModal(): void {
    this.isModalOpen = true;
    this.contactModal.nativeElement.style.display = 'block';
  }

  hideModal(): void {    
    this.contactFormComponent.contact = this.selectedContact;
    this.contactFormComponent.reset();      
    this.isModalOpen = false;
    this.contactModal.nativeElement.style.display = 'none';
  }

  addContact(newContact: Contact): void {
    this.contactService.addContact(newContact).subscribe(
      () => {
        this.hideModal();
        this.getAllContacts();
      },
      (error) => {
        console.error('Error adding contact:', error);
      }
    );
  }

  editContact(contact: Contact): void {
    contact.id = this.contactId;
    this.contactService.updateContact(contact).subscribe(
      () => {
        this.hideModal();
        this.getAllContacts();
      },
      (error) => {
        console.error('Error updating contact:', error);
      }
    );
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id).subscribe(() => {
      this.getAllContacts();
    },
    (error) => {
      console.error('Error deleting contact:', error);
    });
  }
}
