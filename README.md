<h1 align="center">
  <a  href="https://raianebookwise.vercel.app">
   <div>
      <img src="./src/assets/logo.svg" alt="Ignite logo" width="200"  />
    </div>
  </a>
</h1>

<p align="center">
  <img src="https://badgen.net/npm/v/next/" />
  <img src="https://badgen.net/github/contributors/raiane-oliveira/ignite-call" />
</p>

<h4 align="center"> 
	✔️  BookWise - Completed ✔️ 
</h4>

<p align="center">
 <a href="#-about">About</a> •
 <a href="#-features">Features</a> •
 <a href="#-tech-stack">Tech Stack</a> • 
 <a href="#-documentation">Documentation</a> • 
 <a href="#-learnings">Learnings</a> •
 <a href="#-feedbacks">Feedbacks</a>
</p>

## 💻 About

A full-stack application that manages a virtual library, with the possibility to create an account, review, explore, search books, and visit other user's profiles.

<img src="https://github.com/raiane-oliveira/bookwise/assets/100815627/6046d25a-3507-45bf-8762-cd0dbaee88d7" />

The database was deployed in <a href="https://planetscale.com">Planetscale</a> and the application on <a href="https://vercel.com">Vercel</a>.
This challenge was offered in Rocketseat's Ignite course.

## 🪸 Features

- [x] Create a user account with Google or GitHub providers, or access the application as a visitor.
- [x] Shows profile page if the user is logged in.
- [x] Rate and review books.
- [x] Search books by category, title, or author. Same with user's reviewed books.
- [x] Display the number of pages, books, and authors read, as well as the most read category.
- [x] Shows recent user reviews and the last review of your account.
- [x] Responsive design

## 🛠 Tech Stack

- NextJS
  - next-auth
  - dayjs
  - Radix UI
- Prisma
- Storybook
- MySQL
- Docker
- TypeScript
- TailwindCSS

## 📃 Documentation

All the components were documented using the Atomic Design pattern and the Storybook tool. The storybook's deployment was published on the Chromatic platform and it was set CI deployment using Github Actions.

![image](https://github.com/raiane-oliveira/bookwise/assets/100815627/5a4d9434-c1a3-4f59-b434-0c0d5a200ecb)

Link: https://6535b4417ed85019858166ec-eojhirwxvj.chromatic.com/?path=/docs/home--docs

## 📒 Learnings

- Change the layout if the user is authenticated or not.
- Document components and pages using Storybook, based on the Atomic Design pattern.
- Database modulation with Prisma, defining many-to-many or one-to-many relationships
- Connect and run MySQL docker container into Prisma ORM
- Deploy MySQL database and manage Google Console and Github to get OAuth screen permissions.
- Deal with multiple layouts in NextJS.
- Document components based on the Atomic Design pattern.
- Setup Github Actions for CI deployment.

## 🤝 Feedbacks

If you have opinions on how I can improve this application, please send me a message on <a href="https://www.linkedin.com/in/raiane-oliveira-dev">Linkedin</a> or an <a href="mailto:raiane.oliveira404@gmail.com">email</a>.
I will be happy to answer and learn more from you! ;)
