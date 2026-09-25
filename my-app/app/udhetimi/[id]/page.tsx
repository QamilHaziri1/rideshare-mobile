import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";

type DetajePageProps = {
  params: Promise<{ id: string }>;
};

export default async function UdhetimiDetajePage({ params }: DetajePageProps) {
  const { id } = await params;
  const udhetim = gjejUdhetimin(id);

  if (!udhetim) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8">
      <Link href="/" className="text-sm font-medium text-zinc-700 hover:underline">
        Kthehu te lista
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-zinc-900">
        {udhetim.nisja} - {udhetim.destinacioni}
      </h1>

      <section className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-zinc-700">Ora: {udhetim.ora}</p>
        <p className="text-sm text-zinc-700">Vendtakimi: {udhetim.vendtakimi}</p>
        <p className="text-sm text-zinc-700">Vende te lira: {udhetim.vende}</p>
      </section>

      <section className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4">
        <h2 className="text-base font-semibold text-amber-900">Kerkesa</h2>
        <p className="mt-1 text-sm text-amber-800">Simulim: Në pritje</p>
        <p className="mt-2 text-xs text-amber-800/80">Pa databazë dhe pa pagesë.</p>
      </section>
    </main>
  );
}