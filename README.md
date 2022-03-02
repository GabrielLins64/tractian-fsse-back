<h1>Tractian Challenge - Backend</h1>

Backend for the Tractian Challenge &mdash; *Full-Stack Software Engineer*

---

<h2>Index</h2>

- [Description](#description)
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the project](#running-the-project)

---

## Description

**Imagine the following situation:**

Our users, Emerson and Roberta, are maintenance managers at Industria Freios Supremos (auto parts manufacturer), and they have 2 units and 10 assets (machines) in total. They would like to be able to register and view both the units separately, as well as have an overview that condenses the data from the two units.

<center>
  <b>CHALLENGE</b><br><br>
  <b>Build a CRUD where the user can register companies, units, assets and users.</b>
</center>

**Important:**
- Each asset must have an image, name, description, model, owner, status and health level;
- Each asset is part of a unit;
- Each unit is part of a company;
- Every user is part of a company;
- There are three types of status: Running, Alerting, Stopped;
- Health level needs to be between 0% to 100%.

**Mandatory:**
- Database (MongoDB)
- Engine (NodeJS w/ Express)

**Differentials:**
- Typescript;
- Design Standard (Clean Code/Clean Architecture).

---

## Requirements

- [NPM](https://www.npmjs.com/)
- Node.js
- Express.js
- TypeScript

---

## Installation

1. Clone the project:

```shell
git clone https://github.com/GabrielLins64/tractian-fsse-back.git
```

2. Install the dependencies:

```shell
npm install
```

## Running the project

After [installing](#installation), type:

```shell
npm start
```
