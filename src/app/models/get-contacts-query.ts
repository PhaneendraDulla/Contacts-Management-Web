export interface GetContactsQuery{
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    page: number,
    itemsPerPage: number,
    sortField: string,
    sortOrder: string
}