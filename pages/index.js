import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-8">
      <ul className="space-y-3">
        <li>
          <Link href="/1-steps">
            <a className="text-blue-600 underline">Lesson 1</a>
          </Link>
        </li>
        <li>
          <Link href="/2-email">
            <a className="text-blue-600 underline">Lesson 2</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
