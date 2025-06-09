# People Finder

A modern web application to search for people by name, email, or company, built with Next.js, React, and Tailwind CSS.

## Features
- Search for people using name, email, or company
- Clean, responsive UI with cards and social links
- Robust error handling and debug output for API responses
- Built with a modular, scalable component structure

## Tech Stack
- **Next.js** (App Router)
- **React** (Functional Components & Hooks)
- **Tailwind CSS** (Utility-first styling)
- **TypeScript** (Type safety)
- **Lucide React** (Icon library)
- **People Data Labs API** (for people search)

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
3. **Configure your API key:**
   - Copy `.env.local.example` to `.env.local` (create if not present)
   - Add your People Data Labs API key:
     ```env
     PDL_API_KEY=your_api_key_here
     ```
   - **Never commit your real API key to version control!**
4. **Run the development server:**
   ```sh
   npm run dev
   ```
5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Author
**Aditya Jadhav**  
[GitHub](https://github.com/adityajadhav2004)

## Security
- **API keys are never committed to the repository.**
- Make sure to keep your `.env.local` file private and never share it publicly.

---

Made with ❤️ by Aditya Jadhav
