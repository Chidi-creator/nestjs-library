# 📚 NestJS Library API



This is a simple Library Management API I built as part of my journey learning the **NestJS** framework. I just recently started using NestJS, and I wanted to put my new knowledge into practice by building something meaningful — so I created this library system.

## 🚀 What I Learned & Implemented

- ✅ **NestJS fundamentals** – Modules, Controllers, Services, DTOs, etc.
- 🔐 **Authentication** – Implemented using **Passport.js with JWT strategy**
- 🛡️ **Authorization** – Built using **custom decorators** and **guards**
  - I created a custom `@Roles()` decorator
  - Set up a `RolesGuard` to restrict access based on user roles like `admin`, `moderator`, and `user`

## 📦 Features

- Users can **sign up** and **log in**
- Authenticated users can **create**, **read**, and manage **books**
- Role-based access control on protected routes (e.g., only certain roles can access specific endpoints)
- Clean, scalable backend structure using best practices from NestJS

## 🛠️ Tech Stack

- **NestJS** (Node.js framework)
- **Mongoose** (MongoDB ODM)
- **Passport.js** (for authentication)
- **JWT** (JSON Web Tokens for secure sessions

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

