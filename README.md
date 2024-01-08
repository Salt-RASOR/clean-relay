# Clean Relay

![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![image](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![image](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![image](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)
![image](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description

<p>Clean Relay is a community-driven mobile application designed to empower users in actively contributing to the improvement of their neighborhoods. With a focus on enhancing local environments, Clean Relay allows individuals to effortlessly report issues and concerns they encounter on the streets, such as potholes, graffiti, or damaged infrastructure. Users can submit detailed problem descriptions along with location tags, creating a dynamic, real-time map of community-reported issues.</p>

<p>What sets Clean Relay apart is its unique point-based reward system – users earn points for their contributions, fostering a sense of pride and accomplishment. These points not only recognize and appreciate the reporting user's efforts but also incentivize others to step up and address reported issues, fostering a collaborative spirit in maintaining clean and vibrant communities.</p>

<p>Join Clean Relay today to be an active participant in the positive transformation of your neighborhood.</p>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [License](#license)

## Installation

Install the whole repository from its root folder:

```
git clone https://github.com/Salt-RASOR/clean-relay.git
cd clean-relay
npm install
```

Create an .env file based on env.example and paste in your (postgreSQL) database string. Then run:

```
npx prisma generate
npx prisma migrate dev
npm run seed
```

Create an .env.local file based on env.local.example and paste in your variables from your database and storage services. You will need:

- A Vercel deployment site for external deployment
- A Supabase project with the following:
  - A PostgreSQL database for storing strings and numbers
  - A Supabase storage for files (images) with full public access for viewing
  - A Supabase authentication service
- Google Maps API keys:
  - A public key with the Maps Javascript API enabled
  - A private key with the Geocoding API enabled

## Usage

**To run locally:**

```
npm run dev
```

**To deploy to Vercel:**

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## API

The app is deployed on Vercel at https://clean-relay.vercel.app/

The API docs can be found at https://clean-relay.vercel.app/docs, showing a Swagger list of the available API endpoints.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
