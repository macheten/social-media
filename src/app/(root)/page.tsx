import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/comments/123"}>show comments</Link>
    </div>
  );
}
