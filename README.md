# menu-tech

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```
### npm version used: 6.14.10 
### node version used: 16.17.1

What is implemented: 
- Login page - contains two fields (email and password) with validation (email has to be an email and password length needs to be more or equal to six). When logged in, the app will cache username in the local storage until the user logout with the button in the top right corner. Also, logged in user won't be able to access login page again until the data from local storage is removed.
- Main page - contains header (where we showed first letter of the email, some icons and the logout button), navigation with which we can navigate through the application and different pages.
- Currencies page - main page where we implemented our functionalities. We have list of currencies which is empty in the beggining. We can add the currency, as well as edit it with add/edit section that will appear when clicked on either Add button or one of the currency (in order to edit). When we have some currencies in our list, we can search through it with search input. We can also delete wanted currency with the click on trash icon. Every action (add, edit, delete) will also be recorded in our local storage where we store array of our currencies. Also, user cannot access this page/s if not logged in.

