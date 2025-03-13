import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <h1 className="text-xl font-bold">My Portfolio</h1>
      <div className="flex space-x-4">
        <a href="#" className="hover:text-emerald-400 transition-colors">Home</a>
        <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>
        <a href="#certifications" className="hover:text-emerald-400 transition-colors">Certifications</a>
        <a href="#blogs" className="hover:text-emerald-400 transition-colors">Blog</a>
        <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
      </div>
      <ThemeToggle />
    </nav>
  );
}
