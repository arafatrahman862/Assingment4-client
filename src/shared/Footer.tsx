
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-12 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm">&copy; {year} Library Management System. All rights reserved.</p>
        <div className="flex space-x-4 mt-3 sm:mt-0">
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://yourwebsite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Website
          </a>
          <a
            href="mailto:support@yourlibrary.com"
            className="hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
