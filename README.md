# Contacts-Management-Web
This UI (Web) project manages the contact Information



## Setup/Instructions:

### Prerequisites:
- Ensure `Node.js`, `Npm`, `Angular`, `Angular CLI` and `Typescript` are installed.
- Install Angular CLI globally using `npm install -g @angular/cli` 
- To check versions use `ng version` when you navigate to the project directory after cloning it.
- For example I got below response.
### Ng Version 
        Angular CLI: 17.0.6
        Node: 18.13.0
        Package Manager: npm 8.19.3
        OS: win32 x64
        Angular: 17.0.6
        ... animations, cli, common, compiler, compiler-cli, core, forms
        ... platform-browser, platform-browser-dynamic, router
        Package                         Version
        ---------------------------------------------------------
        @angular-devkit/architect       0.1700.6
        @angular-devkit/build-angular   17.0.6
        @angular-devkit/core            17.0.6
        @angular-devkit/schematics      17.0.6
        @schematics/angular             17.0.6
        rxjs                            6.6.7
        typescript                      5.2.2
        zone.js                         0.14.2

### Steps:
- Clone the project repository from Repository URL.
- Navigate to the project directory.
- Install project dependencies `npm install`
- Launch the App:
    - Execute the `ng serve` command
    - Access the provided link in the terminal 
    - For example I got `http://localhost:4200/`
    - Open this link via a browser to view the website.
    
### Checklist:
- Ensure the `API project` is running before starting this `Web project`.
- In line with the launch settings in the `API project`, if running via the `IIS Express` option, it will operate on `port number 44367`. Should it run on a different port, kindly update that port number within the `apiURL` variable in the file `contact.service.ts` in this Web Project.
    - Open the file `contact.service.ts` located in the Web Project.
    - Locate the variable `apiURL`.
    - Update its value with the appropriate port number (e.g., `http://localhost:44367/api/contacts`).



## Application Design:

### Components:
- `AppComponent`: The root component that hosts other components.
- `ContactDetailsComponent`: Displays a table of contacts, provides CRUD functionalities, and manages the modal to add/edit contacts.
- `ContactFormComponent`: Responsible for rendering the contact form, enabling addition and editing of contacts.

### Services:
- `ContactService`: Handles API requests related to contacts, such as fetching, adding, updating, and deleting contacts.

### Models:
- `Contact` Interface: Defines the structure of a contact object with properties like id, firstName, lastName, and email.



## Design Decisions:

### Component-Based Architecture:
The application follows Angular's component-based architecture, dividing the UI into reusable components, enhancing maintainability and reusability.

### Routing:
Utilizes Angular's `RouterModule` to set up routing.

### Forms and Form Handling:
Employs Angular's `ReactiveFormsModule` for form creation, validation, and form data handling.

### HTTP Requests:
Uses Angular's `HttpClientModule` to make HTTP requests to an API (`ContactService`), handling various CRUD operations related to contacts.

### Modal for Editing/Adding Contacts:
Utilizes a modal (`contactModal`) in `ContactDetailsComponent` to display the `ContactFormComponent` for adding/editing contacts.

### Event Emitter for Communication between Components:
Uses Angular's `@Output` and EventEmitter to emit events from `ContactFormComponent` to `ContactDetailsComponent` for adding/editing contacts. Uses `@Input` to get `Contact` information.

### Lifecycle Hooks:
Implements `OnInit` and `OnChanges` lifecycle hooks in `ContactFormComponent` to handle component initialization and changes in input properties.

### Data Binding:
Uses two-way data binding and property binding to bind form fields with the corresponding properties of the contact object.



## Application Flow:
- `AppComponent` hosts the routing module.
- `ContactDetailsComponent` fetches contacts from the backend through `ContactService` and displays them in a table.
- Clicking `New` opens a modal (`contactModal`) containing `ContactFormComponent` to add a new contact.
- Clicking `Edit` in the table row opens the modal to edit the selected `contact`.
- `ContactFormComponent` handles form submission for both adding and editing contacts, emitting events to `ContactDetailsComponent`.
- `ContactService` handles HTTP requests to perform CRUD operations on contacts.