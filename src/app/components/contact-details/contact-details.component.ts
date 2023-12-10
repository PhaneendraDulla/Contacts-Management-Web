import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css',
})
export class ContactDetailsComponent implements OnInit {
  @ViewChild('contactModal') contactModal: ElementRef;

  contacts: Contact[] = [];
  selectedContact: Contact | undefined;
  contactForm: FormGroup;
  editMode = false;
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
    console.log('getAllContacts');
    this.contactService.getAllContacts().subscribe(
      (response) => {
        console.log(response);
        this.contacts = response.items;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }

  openAddContact(): void {
    this.selectedContact = undefined;
    this.contactForm.reset();
    this.isModalOpen = true;
    this.showModal();
  }

  openEditContact(contact: Contact): void {
    this.contactId = contact.id;
    this.selectedContact = contact;    
    this.contactForm.patchValue(contact);    
    this.isModalOpen = true;
    this.showModal();
  }

  showModal(): void {
    this.contactModal.nativeElement.style.display = 'block';
  }

  hideModal(): void {
    this.contactForm.reset();
    this.selectedContact = undefined; 
    this.contactModal.nativeElement.style.display = 'none';
    this.isModalOpen = false;
  }

  addContact(newContact: Contact): void {
    this.contactService.addContact(newContact).subscribe(
      () => {
        this.contactForm.reset();
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
        this.contactForm.reset();
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
    });
  }
}
