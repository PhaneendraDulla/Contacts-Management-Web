import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://localhost:44367/api/contacts';

  constructor(private http: HttpClient) { }

  getAllContacts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetAllContacts`);
  }

  getContactById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetContactById?Id=${id}`);
  }

  addContact(contact: Contact): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddContact`, contact);
  }

  updateContact(contact: Contact): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/UpdateContact`, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeleteContact?Id=${id}`);
  }
}
