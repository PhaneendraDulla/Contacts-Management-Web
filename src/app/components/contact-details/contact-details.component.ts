import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact';
import { GetContactsQuery } from 'src/app/models/get-contacts-query';
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

  totalItems: number = 0;
  itemsPerPage: number = 5;
  page: number = 1;
  pagedContacts: Contact[] = [];

  sortField: string = 'id';
  sortOrder: string = 'asc';

  id: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';

  selectedRow: any;
  selected: boolean = false;
  isEdit: boolean = false;
  isDelete: boolean = false;

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
    this.getContacts();
  }

  selectRow(contact: any) {
    if (this.selected && this.selectedRow == contact) {
      this.clearSelection();
    } else {
      if (!(this.isEdit || this.isDelete)) {
        this.selected = true;
        this.selectedRow = contact;
      } else {
        this.clearSelection();
      }
    }
  }

  clearSelection() {
    this.selected = false;
    this.selectedRow = null;
    this.isEdit = false;
    this.isDelete = false;
  }

  pageChanged(event: any): void {
    this.page = event.page;
    this.getContacts();
  }

  sortBy(field: string): void {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.getContacts();
  }

  reset() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.page = 1;
    this.itemsPerPage = 5;
    this.sortField = 'id';
    this.sortOrder = 'asc';
    this.clearSelection();
    this.getContacts();
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

  getContacts(): void {
    this.clearSelection();
    var query: GetContactsQuery = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      page: this.page,
      itemsPerPage: this.itemsPerPage,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
    };

    this.contactService.getContacts(query).subscribe(
      (response) => {
        this.pagedContacts = response.items;
        this.totalItems = response.totalItems;
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
    this.isEdit = true;
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
    this.clearSelection();
  }

  addContact(newContact: Contact): void {
    newContact.id = 0;
    this.contactService.addContact(newContact).subscribe(
      () => {
        this.hideModal();
        this.getContacts();
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
        this.getContacts();
      },
      (error) => {
        console.error('Error updating contact:', error);
      }
    );
  }

  deleteContact(id: number): void {
    this.isDelete = true;
    this.contactService.deleteContact(id).subscribe(
      () => {
        this.getContacts();
      },
      (error) => {
        console.error('Error deleting contact:', error);
      }
    );
  }
}
