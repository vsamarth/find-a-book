import Link from "next/link";
import { Book } from "./page";

async function fetchBooks(subject: string): Promise<Book[]> {
  const response = await fetch(
    `https://openlibrary.org/subjects/${subject}.json?limit=4`,
  );
  const { works } = await response.json();
  const books = works.map((work: any) => {
    const { title, authors, cover_id, first_publish_year, key } = work;
    return {
      title,
      authors,
      year: first_publish_year,
      cover: `https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`,
      key,
    };
  });

  return books;
}

interface BookSectionProps {
  title: string;
}

export default async function BookSection(props: BookSectionProps) {
  const books = await fetchBooks(props.title);

  return (
    <section className="flex w-full flex-col gap-4">
      <h2 className="text-2xl font-semibold tracking-wide capitalize">
        {props.title}
      </h2>
      <div className="grid grid-cols-4 gap-8">
        {books.map((book, idx) => (
          <Link href={`${book.key.replace("works", "book")}`} key={idx}>
            <div className="flex flex-col gap-4">
              <div className="flex justify-center items-center">
                <img src={book.cover} className="h-36" alt="" />
              </div>
              <h3 className="text-center truncate">{book.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
