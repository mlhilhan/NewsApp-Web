# News Application - Web

This project is the frontend part of a modern news portal application. It is developed using Next.js, TypeScript, and TailwindCSS.

## Features

- 📱 Responsive design (compatible with both mobile and desktop)
- 🔐 JWT-based authentication system
- 📰 News listing, filtering, and searching
- 🗂️ Category-based filtering
- 💬 Comment system
- 👍 Like and reaction system
- 🌙 User profile management

## Technologies

- **Next.js**: React framework
- **TypeScript**: For type safety
- **TailwindCSS**: For styling and UI components
- **React Hook Form**: For form management
- **Zod**: For form validation
- **Axios**: For API requests
- **Day.js**: For date formatting
- **React Icons**: For icons
- **React Toastify**: For notifications

## Installation

### Requirements

- Node.js (v14 or higher)
- npm or yarn

### Steps

1. Clone the repository:
```bash
git clone https://github.com/yourusername/news-frontend.git
cd news-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run in development mode:
```bash
npm run dev
# or
yarn dev
```

4. Open in browser:
```
http://localhost:3000
```

## Configuration

Create a `.env.local` file in the project root directory and set the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Project Structure

```
/src
  /components        # Reusable components
    /layout          # Layout components (Header, Footer, Sidebar)
    /news            # News-related components
    /comments        # Comment components
    /ui              # General UI components
  /contexts          # State management with Context API
  /hooks             # Custom React hooks
  /pages             # Next.js pages
  /services          # API services
  /styles            # Global styles
  /types             # TypeScript types
  /utils             # Helper functions
```

## Pages

- `/` - Home page
- `/news/[id]` - News detail page
- `/category/[slug]` - Category news page
- `/search` - Search results page
- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/profile` - User profile page

## API Integration

The frontend uses the `apiClient.ts` service to communicate with the backend API. All API requests are made through this service.

```typescript
// Example API request
const response = await apiClient.get('/news');
```

## Deployment

To deploy the project to production:

```bash
npm run build
npm run start
```

## License

This project is licensed under the MIT License.
