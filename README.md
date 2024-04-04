# Bath: A  Learning Management System
- Bath is a streamlined learning management solution tailored for startups,  which offer BootCamps, aiming to materialize their concepts. Designed to adapt to the contemporary landscape of predominantly online learning, this app caters to the evolving dynamics of education.

## Overview
- The App is made mainly for Software Development / Engineering
- Students are part of a Cohort and they do project-based-learning


<img src="/bathgraph.png" alt="graph img">


<a href="https://github.com/de-mawo/bath-backend">Nodejs Standalone Backend </a>  - Work In Progress


### Technologies Used
- Nextjs
- Tailwindcss for styling
- TypeScript programmimg language
- Shadcn UI for the UI
- Next-Auth for handling authentication
- Postgresql for database management
- Prisma for generating SQL schema and type safety

### Prerequisites
- Nodejs installed on your machine
- Postgresql database either Cloud based or on your local machine
- JavaScript , SQL, React, CSS basics




### Set Up (I am using yarn )
- Clone the project and run `yarn` or delete the yarn.lock file and run any other package manager of your choice
- NB I am using yarn run v1.22.19 , if encountering issues, delete the yarn lock for your project an re-install dependencies
- Setup env variables. Checkout `.env.example` for guidance
- Run `yarn prisma migrate dev ` to populate your database
- Run `yarn prisma generate ` to make sure you create the @prisma client

- Open 2 more terminal on 1 run `yarn dev` & the other `yarn prisma studio`
- On the prisma studio  go to `AllowedEmails` table and add a record there (add a string id `83f1d583-1309-4d49-bebd-66002c713984 `  or any of your choice for the id field & in the emails , add the admin email as a string like --> [admin@bath.io])

### Usage 

1. ##### ADMIN
- Add a Course
- Add a Module
- Add a Project
- Add a Task
- Add Allowed Emails to the App
- Edit User Roles
- Add Events

2. ##### USER
- View Events
- View Projects and Tasks
- Edit Own Profile
- Submit Project Work links for marking/review



### Future Updates
- Sorting & Filtering for the Admin Tables
- Include AI for auto-marking
- View Curriculum
- Edit Events, Tasks, Projects etc
- Add Moderator allowed features
- Create a mobile app version
- Add Table filters & Pagination
- Add Dashboard Stats
- Add Admin settings
- Scale up to include many courses that a learner can be part of



