# MEAN CRUD SuperHeroes App

A **MEAN CRUD** project built with [Angular Material](https://material.angular.io/) for *Create, Read, Update and Delete* Super Heroes stored in a [MongoDB](https://www.mongodb.com) database.

It CRUDs heroes correctly, validates the image URL and falls back to a default image if none is provided.

It also implements **User Authentication** using `CanLoad` and `CanActivate` from `@angular/router`, storing a **JSON Web Token** in local storage. It shows the logged-in user's name and supports logout, routing back to the login page.

## Requirements

- Node.js / Angular CLI compatible with Angular 12.2.x
- A running backend API exposing the auth and heroes endpoints

## Development

```bash
npm install
ng serve
```

Configure the API base URL in `src/environments/environment.ts`.
