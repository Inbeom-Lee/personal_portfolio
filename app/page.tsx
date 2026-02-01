export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold">
        System Desinger
        <br />& Creative Developer
      </h1>
      <p>Designing decision-driven digital systems — from structure to code.</p>
      <div className="fixed w-screen h-screen top-0 left-0 pointer-events-none z-[-1] flex flex-col">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="w-full h-[10vh] bg-linear-to-b from-transparent to-neutral-200"
          />
        ))}
      </div>
    </main>
  );
}
