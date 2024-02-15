import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";

export const metadata = {
  title: "Chair | Not Found Page",
};

export default function NotFound() {
  return (
    <div className="grid items-center justify-center space-y-4 text-center">
      <Image src="/404.png" width={300} height={300} alt="not found" />
      <div>
        <h2 className="mb-2 text-4xl font-bold">Not Found</h2>
        <p>the page you are looking for does not exist</p>

        <Button variant="link" className="mx-auto mt-2 w-fit">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
