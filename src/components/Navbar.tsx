import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Safaris", href: "#safaris" },
  { label: "Destinations", href: "#destinations" },
  { label: "Experiences", href: "#experiences" },
  { label: "Our story", href: "#story" },
];

interface NavbarProps {
  onOpenBooking?: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="site-header__inner page-shell">
        <a className="brand" href="#home" aria-label="Vespers home">
          <img src="/logo/vespers-logo.svg" alt="Vespers" onError={(event) => { event.currentTarget.style.display = "none"; }} />
          <span className="brand__fallback">VESPERS</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </nav>
        <button
          type="button"
          className="header-cta"
          onClick={() => {
            if (onOpenBooking) onOpenBooking();
            else window.location.hash = "contact";
          }}
        >
          Plan your safari <ArrowUpRight size={15} />
        </button>
        <button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} aria-label="Mobile navigation">
            {links.map((link) => <a key={link.label} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
            <button
              type="button"
              className="text-link"
              style={{ padding: "14px 0", color: "#f7f3eb", borderBottom: "1px solid rgba(255,255,255,0.15)", background: "transparent", borderTop: "none", borderLeft: "none", borderRight: "none", cursor: "pointer", justifyContent: "space-between" }}
              onClick={() => {
                setOpen(false);
                if (onOpenBooking) onOpenBooking();
                else window.location.hash = "contact";
              }}
            >
              Plan your safari <ArrowUpRight size={15} />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}