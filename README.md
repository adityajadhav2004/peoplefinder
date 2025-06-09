# People Finder

A modern web application to search for people by name, email, or company, displaying professional and social information in a clean UI.

## Features
- Search by name, email, or company
- Displays job title, location, and social links (LinkedIn, Twitter, Facebook, GitHub, website)
- Responsive and modern UI built with React, Next.js, and Tailwind CSS
- Robust error handling and debug information for API responses

## Tech Stack
- **Next.js**: React framework for server-side rendering and API routes
- **React**: UI library for building interactive interfaces
- **TypeScript**: Type-safe JavaScript for better maintainability
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Icon library for modern SVG icons

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/adityajadhav2004/peoplefinder.git
   cd peoplefinder
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local` and add your People Data Labs API key:
     ```env
     PDL_API_KEY=your_api_key_here
     ```
   - **Never commit your real API key to version control!**
4. **Run the development server:**
   ```sh
   npm run dev
   ```
5. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Author
**Aditya Jadhav**  
[GitHub](https://github.com/adityajadhav2004)

## License
This project is licensed under the MIT License.

---

> **Note:** This project uses a third-party API (People Data Labs). Make sure to keep your API key secure and never expose it in public repositories.
