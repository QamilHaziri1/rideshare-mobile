import Link from "next/link";
import type { Udhetim } from "@/lib/udhetimet";

export function KartaUdhetimi({ udhetim }: { udhetim: Udhetim }) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900">
        {udhetim.nisja} - {udhetim.destinacioni}
      </h2>
      <p className="mt-1 text-sm text-zinc-600">Ora: {udhetim.ora}</p>
      <p className="text-sm text-zinc-600">Takimi: {udhetim.vendtakimi}</p>
      <p className="text-sm text-zinc-600">Vende te lira: {udhetim.vende}</p>
      <Link
        className="mt-3 inline-block rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        href={`/udhetimi/${udhetim.id}`}
      >
        Shiko detajet
      </Link>
    </article>
  );
}