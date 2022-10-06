import Link from "next/link";

let links = [
  { path: "/1-steps", label: "Lesson 1 - Multistep wizard" },
  { path: "/2-email", label: "Lesson 2 - Email client" },
  { path: "/3-header", label: "Lesson 3 - Fixed header" },
];

export default function HomePage() {
  return (
    <div className="p-8">
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.path}>
            <Link href={link.path}>
              <a className="text-blue-600 underline">{link.label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
