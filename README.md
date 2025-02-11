# email-saas-course

[Course Link](https://www.youtube.com/watch?v=zMJSyzg63o0)

## Intro

- We are gonna create an email client

- Main features:

  - Email client features
    - receive, response, organize threads, saved emails, search bar etc;
  - Command base actions (set actions via keyboard)
  - AI email assistant - to write email following instructions;
  - AS assistant - Look up for emails to answer questions
  - Manage payments and subscriptions
    - Unblicking features / limits for paying users

- Elliott Chong
  - Started with MERN
  - Started with his own libraries
  - He worked in a start up, which grew using his techs and frameworks
  -
  - [Start SaaS ($47)](https://www.start-saas.com/#pricing)

##### Tech Stack:

    - Clerk
    - Next.js
    - Prisma
    - Neon db (database provider)
    - tailwind
    - Shadcn
    - tRPC (type safe API)
    - postgreSQL
    - Stripe
    - TypeScript
    - Vercel
    - OpenAI
    - orama (full text search engine in database)
    - aurinko (powering inbox api)
        - It centers an api for different mailbox providers (google, Microsoft etc)

##### What will be learnt

    - RAG (retrieved aumenteg generation) pipeline with custom chatbot;
    - Full Text searc;
    - Full email client clone
    - AI smart compose
    - Add command bar
    - Stripe payment set up

##### Tutorial Flow:

    - Understand email client with Aurinko
    - Set Up Next, ShadCN, Clerk and DB;
    - Prepare Aurinko API;
    - Database engineering & webhook management
    - Text Search with Orama
    - Initial UI (display emails & threads)
    - Search UI
    - RAG pipelina QnA with Vercel SDK
    - Replies and Composing with Copilot
    - Stripe setup
    - Deployt to VErcel
    - Landing Page

## Aurinko and Emails

#### Overview

- Problem that makes Aurinko to exist:

  - Different email servers has different API's

- Aurinko basically is a central API that converts the actions to the different servers

#### Flow

1. User grant access to Aurinko
2. Aurinko sends us back a token + user info
3. Save it to the database
4. Use the token and sync the inbox
5. Webhooks - Event driven communication
   - Whenever gmail receives a new email, gmail is gonna ping our callback route
   - So we update and sync the boxes

#### Email related topics:

- Aurinko
- Emails (and data)
- Threads
- Metadata
- Accounts
- Syncing
- WebHooks

## Project

#### Initial Setup

- t3 stack

  - npm create t3-app@latest

- Shadcn

### Auth

- Remember we have a middleware which is guarding all routes (and we have to set explicitly the public routes)
  - So our webhook has to be a public endpoint

#### Clerk

- Following Clerk Steps in their [docs](https://dashboard.clerk.com/apps/app_2qXNTlfwEgGSmTOPKfFYndtpySi/instances/ins_2qXNTvhfvl6DgfbxQ8lX5uIUE6L);

#### Database (neon)

- Created a database in [neon](https://console.neon.tech/app/projects) (and updated env variable)

- Prisma

  - Create the model
  - npx prisma db push

#### Set webhook with clerk

- As Clerk has its own database, we want a webhook to make Clerk ping when there's a new user
- So it will send the data to our api
- Create the WebHook in Clerk config
- Create a Tunnel
  - npx untun@latest tunnel http://localhost:3000
  - Use the tunnel as url to the webhook
- Create in our api a route for the clerk webhook
- After testing, we already deployed (to get the real url)

  - To avoid type errors, we added this in next config:

    ```javascript
    const config = {
      typescript: {
        ignoreBuildErrors: true,
      },
      eslint: {
        ignoreDuringBuilds: true,
      },
    };
    ```

### Setup Aurinko and Sync Emails

- Create Aurinko Account and get keys

- Steps:

1. Grant access to Aurinko
2. Get a token back
3. Save the token in the db
4. Use the token to sync the inbox

## Random Notes and Observations during the project:

- `window.location.href = authUrl;`
  - window.location = Current URL
  - href contains the full URL (https//: etc)
  - So, when I asign a new it navigates the browser
