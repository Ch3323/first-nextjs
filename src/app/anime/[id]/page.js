import AnimeDetail from "@/components/AnimeList/AnimeDetail";

function page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 sm:px-12 lg:px-24 py-8">
        <AnimeDetail />
      </main>
    </div>
  );
}
export default page;
