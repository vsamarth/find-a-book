import { Input } from "@/components/ui/input";
import Link from "next/link";
import BookSection from "./book-section";
import { Suspense } from "react";

export type Author = {
  name: string;
};

export type Book = {
  key: string;
  title: string;
  authors?: Author[];
  year?: number;
  cover?: string;
  description?: string;
};



export default async function Page() {
  const sections = ["thrillers", "fantasy"];
  return (
    <>
      <div className="w-full">
        <Input
          placeholder="Where The Crawdads Sing by Delia Owens"
          className="h-12 w-full placeholder:text-slate-300 focus:placeholder:text-slate-500"
        />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {sections.map((section, idx) => (
          <BookSection title={section} key={idx} />
        ))}
      </Suspense>
    </>
  );
}
