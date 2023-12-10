import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent implements OnInit, OnChanges{
  @Output() addContact = new EventEmitter<Contact>();
  @Output() editContact = new EventEmitter<Contact>();
  @Input() contact: Contact;
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.contact && !changes.contact.firstChange) {
      this.updateForm();
    }
  }

  updateForm(): void {
    if (this.contact) {
      this.contactForm.patchValue({
        firstName: this.contact.firstName,
        lastName: this.contact.lastName,
        email: this.contact.email,
      });
    }
  }

  reset(): void {
    this.contactForm.reset({
      firstName: this.contact ? this.contact.firstName : '',
      lastName: this.contact ? this.contact.lastName : '',
      email: this.contact ? this.contact.email : '',
    });    
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value as Contact;
      if (this.contact) {
        this.editContact.emit(formData);
      } else {
        this.addContact.emit(formData);
      }
      this.contactForm.reset();
    }
  }
}
