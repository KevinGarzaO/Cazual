import Link from "next/link";
import { Search, MessageCircle, Heart, User } from "lucide-react";

const navItems = [
  { label: "Explorar", href: "/", icon: Search },
  { label: "Favoritos", href: "/favoritos", icon: Heart },
  { label: "Mensajes", href: "/mensajes", icon: MessageCircle },
  { label: "Cuenta", href: "/cuenta", icon: User },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 sm:px-10">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="inline-flex flex-col items-center gap-1 text-center text-xs text-textSecondary transition hover:text-white"
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
