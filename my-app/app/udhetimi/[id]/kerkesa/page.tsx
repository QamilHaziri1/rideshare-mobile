"use client";

import Link from "next/link";
import { use, useState } from "react";

export default function KerkesaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [uDergua, caktoUDergua] = useState(false);

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-900">Simulimi i kërkesës</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Kjo është demonstrim lokal; nuk dërgon kërkesë reale dhe nuk kryen pagesë.
      </p>

      <section className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4">
        <p role="status" className="text-sm text-amber-900">
          {uDergua ? "Kërkesa u regjistrua në simulim: Në pritje." : "Statusi: Në pritje."}
        </p>
        <button
          type="button"
          onClick={() => caktoUDergua(true)}
          className="mt-4 rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Konfirmo simulimin
        </button>
      </section>

      <Link
        href={`/udhetimi/${id}`}
        className="mt-5 inline-block text-sm font-medium text-zinc-700 hover:underline"
      >
        Kthehu te detajet
      </Link>
    </main>
  );
}
