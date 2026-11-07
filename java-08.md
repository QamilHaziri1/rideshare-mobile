# RideShare — Java 8

## Çfarë ndërtova
Përgjigje: Në këtë javë e verifikova veprimin e aplikacionit në kohën e tyre të vërteta: hyrja me GitHub, kontrolli i lejeve dhe kufizimi i veprimeve për përdoruesit pa autorizim. Në praktikë, unë nuk e ndryshova funksionalitetin e bazës, por e kontrollova që logjika e aplikacionit ndjek modelin e duhur: identiteti vjen nga GitHub, roli vendoset nga `profilet`, dhe pronësia kontrollohet në `udhetimet` përmes `shofer_id`. Gjithashtu, e korrigjova një pjesë të vogël të `public/sw.js` për të trajtuar më mirë fallback-in offline kur përdoruesi hap një faqe të navigimit pa internet, pa e lejuar qasjen në pjesë private. Pra, Java 8 ishte një javë vërtetimi dhe rregullimi i vogël, jo ndërtim i ri i një module të plotë.

## Provat që bëra
### Prova 1: Leja nuk kërkohet sapo hapet faqja.
Përgjigje: Hapa `/panel` pa një sesion të aktivizuar. Si rezultat, aplikacioni nuk bllokoi faqen e plotë; në vend të kësaj, ai shfaqi listën publike dhe një mesazh ku thuhej se për panelin duhet të hyni me GitHub. Kjo është e saktë, sepse `profiliIm()` në `lib/lejet.ts` kthen `null` kur nuk ka sesion, dhe `panel/page.tsx` e tregon listën publike në mënyrë të qartë. Kjo do të thotë: nuk kërkohet leje për të parë listën publike, por vërtetimi kërkohet për veprimet private ose të ndjeshme. 

### Prova 2: Refuzimi i lejes nuk e bllokon përdoruesin.
Përgjigje: Prova u bë duke përdorur një profil të loguar dhe duke ndryshuar formulën në një `id` që nuk i takonte atij përdoruesi. `ndryshoOren()` kontrollon dy gjëra thelbësore: se përdoruesi ka rolin `shofer` dhe se `shofer_id` e udhëtimit përputhet me `p.id`. Nëse njëra prej këtyre sendeve dështon, funksioni kthen `"ndaluar"` dhe nuk bën update. Për këtë arsye, përdoruesi nuk bllokohet ose “mbyllet” për përgjithmonë; ai merr vetëm një mesazh refuzimi dhe mbetet në panel. Kjo është e duhura, sepse kontrolli i lejes është i detyrueshëm, jo një ndalje e përgjithshme të përdoruesit.

### Prova 3: Dëshmitë në GitHub nuk tregojnë adresën time reale.
Përgjigje: Në projektin tim, identiteti nuk vjen nga adresa fizike ose nga email-i privat, por nga GitHub. Në `lib/auth.ts` përdoren `token.sub` dhe `session.user.id` për të vendosur identitetin e përdoruesit, ndërsa `profilet` ruan `github_id`, `emri` dhe `roli`; nuk ka kolona për adresën reale të banimit, adresën e shtëpisë ose të dhëna personale. Kjo do të thotë se një “dëshmi” në GitHub tregon profilin e GitHub-it, jo adresën time reale. Nëse një person shikon commit-et ose GitHub profile, ai mund të sheh përdoruesin, jo informacionin e vendbanimit. Kjo është një praktikë më e sigurt dhe më e qetë për testim dhe demonstrim.

## Ku gjendet puna
Përgjigje: Puna kryesore ndodhet në projektin `rideshare-mobile/my-app`, dhe skedarët kryesorë janë:
- `lib/auth.ts` — logjika e autentikimit me GitHub dhe sesionit
- `lib/lejet.ts` — kontrolli i rolit dhe pronësisë
- `app/panel/actions.ts` — server action për ruajtje të orës
- `public/sw.js` — cache offline dhe fallback për navigim
- `app/manifest.ts` — konfigurimi i PWA-së
- `public/offline.html` — faqja e fallback-it offline

Nuk kam publikuar një demo në Vercel, prandaj nuk ka link të jashtëm të ekzekutimit, por kodi i projektit është i disponueshëm në repo-n e lokalizuar dhe në GitHub për verifikim.

## Çfarë mbetet për përmirësim
Përgjigje: Një pengesë e dukshme është se sistemi i listës publike është i mirëmbajtur mirë, por jo çdo rrugë private është e mbrojtur në mënyrë të njëtrajtshme në të gjitha skedarët e aplikacionit. Për shembull, `offline` dhe `public` cache janë të qarta, por përmbajtjet private duhet të mbrohen me kontrollin e duhur në çdo route dhe në çdo server action. Një përmirësim i rëndësishëm do të ishte: kontroll më të fortë në çdo kërkesë të serverit, verifikim i plotë i roles dhe ownership në të gjitha rrugët, dhe një logjikë më të qartë për rezervime, vendet e lira dhe konfirmimin e përdoruesit. Kjo është hapi i rradhës për të bërë aplikacionin më të fortë dhe më të besueshëm.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Përgjigje: Përdora AI për të shpjeguar strukturën e kodit, veçanërisht në lidhje me autentikimin, `session`, kontrollin e lejeve dhe mënyrën se si funksionon `fetch` në service worker. 

## Prova me një hyrje të re
Përgjigje: Zgjodha provën e ndryshimit të vendtakimit pa konfirmim.
- Hyrja që provova: në panel, si përdorues i loguar, ndryshova `id` e një udhëtimi që nuk i përkiste profilit tim dhe dërgova formularin.
- Parashikimi im para klikimit: sistemi do ta refuzonte ndryshimin sepse `shofer_id` nuk përputhet me identitetin e përdoruesit.
- Çfarë pashë realisht: u shfaq mesazhi “Nuk ke leje për këtë udhëtim”, dhe baza e të dhënave mbeti e njëjtë.
- Skedari dhe funksioni që e shpjegojnë: `lib/lejet.ts` dhe funksioni `ndryshoOren()`, së bashku me `app/panel/actions.ts` që e thërret serverin.
- Çfarë kuptova ose korrigova: kuptova se kontrolli i lejes është i saktë dhe jo vetëm vizual; ai ndodh në server, duke e bërë të pamundur të manipulohet `id` nga front-end. Kjo ka qenë prova e rëndësishme për të kuptuar se si sigurohet integriteti i të dhënave.

Këtë pjesë e shpjegoj në klasë. Kontrolli automatik nuk verifikon vërtetësinë e provës.
