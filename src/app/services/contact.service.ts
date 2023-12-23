import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { GetContactsQuery } from '../models/get-contacts-query';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://localhost:44367/api/contacts';

  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetAllContacts`);
  }

  getContactById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetContactById?Id=${id}`);
  }

  getContacts(
   query: GetContactsQuery
  ): Observable<any> {
    let params = new HttpParams()
    .append('page', query.page)
    .append('itemsPerPage', query.itemsPerPage)
    .append('sortField', query.sortField)
    .append('sortOrder', query.sortOrder)
    .append('id', query.id)
    .append('firstName', query.firstName)
    .append('lastName', query.lastName)
    .append('email', query.email);
    return this.http.get<any>(`${this.apiUrl}/GetContacts`, {params});
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
