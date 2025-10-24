import Link from "next/link";

export const revalidate = 60;

async function getCategories() {
  const res = await fetch("https://api.escuelajs.co/api/v1/categories", {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <Link href={`/category/${cat.id}`} key={cat.id}>
            <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg bg-white">
              <div className="w-full overflow-hidden">
                <img
                  src={cat.image || "https://via.placeholder.com/600x400"}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 text-center">
                <h2 className="text-black font-semibold">{cat.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
