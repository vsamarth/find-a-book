import { Author, Book } from "@/app/page";


interface PageProps {
  params: {
    id: string;
  };
}

async function fetchAuthor(id: string): Promise<Author> {
  const url = `https://openlibrary.org${id}.json`;
  const response = await fetch(url);

  const { personal_name } = await response.json();

  return {
    name: personal_name,
  }
}

async function fetchBooks(id: string): Promise<Book> {
  const response = await fetch(`https://openlibrary.org/work/${id}.json`);

  const { title, authors, covers, first_publish_year, key , description} =
    await response.json();

  const cover_id = covers[0];

  const authorsInfo = await Promise.all(
    authors.map((author: any) => fetchAuthor(author.author.key)),
  );
  
  
  const book = {
    title,
    authors: authorsInfo,
    year: first_publish_year,
    cover: `https://covers.openlibrary.org/b/id/${cover_id}-L.jpg`,
    key,
    description,
  };

  return book;
}

const fetchRecommendations = async (id: string): Promise<Book[]> => {

  const url = `https://openlibrary.org/subjects/thrillers.json?limit=4`;
  console.log(url, encodeURI(url));
  const response = await fetch(encodeURI(url));
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

export default async function Page({ params }: PageProps) {
  const book = await fetchBooks(params.id);
  const recommendations = await fetchRecommendations(params.id);

  return (
    <>
      <section className="rounded-xl border bg-card text-card-foreground shadow flex p-8 w-full justify-between gap-16">
        <div className="flex justify-center items-center">
          <img src={book.cover} className="max-h-96" alt="" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-2xl font-semibold ">{book.title}</h3>
          <p className="mx-4">{book.authors ? book.authors.map((a) => a.name).join(", ") : null}</p>
          <div>
            <p className="line-clamp-6 leading-5 text-lg mx-3 my-4">{book.description}</p>
          </div>
        </div>
      </section>
      <section className="flex w-full flex-col gap-8">
        <h2 className="text-xl font-semibold">Recommendations</h2>
        <div className="flex flex-col w-full gap-8">
          {recommendations.map((book, idx) => (
            <div className="flex gap-4" key={idx}>
              <div className="flex justify-center items-center">
                <img src={book.cover} className="h-36" alt="" />
              </div>
              <h3 className="text-center truncate">{book.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
