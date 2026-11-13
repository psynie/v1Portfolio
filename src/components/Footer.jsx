import { profile } from "../data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with React + Vite</span>
      </div>
    </footer>
  );
}
