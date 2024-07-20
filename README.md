```markdown:README.md
# URL Shortener

This is a URL shortener project built with [Next.js](https://nextjs.org/). It allows users to shorten long URLs and provides a short link that redirects to the original URL.

## Features

- Shorten long URLs
- Redirect to the original URL using the short link
- Display a message if the short link is not found

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/shorturl.git
   cd shorturl
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your PostgreSQL connection string:

   ```env
   POSTGRES_URL=your_pooled_connection_string
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm start
# or
yarn start
```

### Deploying on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Project Structure

- `src/app/[key]/page.tsx`: Handles the redirection logic based on the short link key.
  ```typescript:src/app/[key]/page.tsx
  startLine: 1
  endLine: 21
  ```

- `src/app/api/route.ts`: API route to create a short link.
  ```typescript:src/app/api/route.ts
  startLine: 1
  endLine: 52
  ```

- `src/app/layout.tsx`: Root layout component.
  ```typescript:src/app/layout.tsx
  startLine: 1
  endLine: 20
  ```

- `src/app/page.tsx`: Home page component.
  ```typescript:src/app/page.tsx
  startLine: 1
  endLine: 27
  ```

- `src/components/ShortenForm.tsx`: Form component to input the URL to be shortened.
  ```typescript:src/components/ShortenForm.tsx
  startLine: 1
  endLine: 59
  ```

- `src/lib/db.ts`: Database connection logic.
  ```typescript:src/lib/db.ts
  startLine: 1
  endLine: 22
  ```

- `src/lib/seed.ts`: Database seeding logic.
  ```typescript:src/lib/seed.ts
  startLine: 1
  endLine: 12
  ```

- `src/models/apiResponse.model.ts`: TypeScript interface for API response.
  ```typescript:src/models/apiResponse.model.ts
  startLine: 1
  endLine: 4
  ```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## License

This project is licensed under the MIT License.
```

This README provides a clear overview of the project, including installation instructions, project structure, and links to relevant resources.