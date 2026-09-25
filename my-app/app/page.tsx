import { KartaUdhetimi } from "@/components/KartaUdhetimi";
import { udhetimet } from "@/lib/udhetimet";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-900">RideShare - Lista e udhetimeve</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Te gjitha te dhenat jane fiktive per demo. Pa databaze dhe pa pagese.
      </p>

      <section className="mt-6 grid gap-4">
        {udhetimet.map((udhetim) => (
          <KartaUdhetimi key={udhetim.id} udhetim={udhetim} />
        ))}
      </section>
    </main>
  );
}
