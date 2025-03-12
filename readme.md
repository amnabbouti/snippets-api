# Code Snippets API & Dashboard

This project is a **Code Snippets API** built with **Node.js**, **Express**, and **Mongoose**, allowing users to store,
tag, share, and manage code snippets. It includes a **RESTful API** backend and a **Dashboard** frontend built using *
*EJS** templates for viewing and managing code snippets.

## Features

- **CRUD operations for code snippets:**
    - Create, Read, Update, and Delete code snippets.
    - Each snippet includes a title, code, language, tags, and an optional expiration time.

- **Filtering and Pagination:**
    - Filter snippets by language and tags.
    - Pagination support for managing large lists of snippets.

- **Expiration:**
    - Code snippets can expire after a specified time.

- **History:**
    - Track updates to each snippet (optional version history).

- **Frontend Dashboard:**
    - A simple dashboard to create and view code snippets.
    - Provides filtering and tag-based search.
    - Option to delete snippets directly from the dashboard.

## Technologies Used

- **Node.js** - JavaScript runtime environment for the backend.
- **Express** - Web framework for building the API.
- **MongoDB** - Database for storing snippets (via Mongoose ORM).
- **Mongoose** - MongoDB Object Modeling tool for Node.js.
- **EJS** - Template engine for rendering the frontend views.
- **HTML/CSS/JavaScript** - For building the frontend dashboard.