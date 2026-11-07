# RideShare — Java 5 · Hyrja dhe lejet

Ruaje si java-05.md pranë README, jashtë aplikacioni/.
Hiqi shenjat [PLOTËSO]. Mos vendos sekrete, email ose pamje të kredencialeve.

## Çfarë ndërtova
[Në aplikacionin tim, identiteti përcakton se kush është përdoruesi që kyçet në sistem, për shembull përmes email-it dhe fjalëkalimit. Roli përcakton se çfarë veprimesh ka të drejtë të kryejë përdoruesi, si Admin, Organizer ose Attendee. Ndërsa pronësia përcakton se cilat të dhëna apo resurse i përkasin atij përdoruesi, për shembull cilat evente ka krijuar dhe menaxhon.] Shpjego dallimin mes identitetit, rolit dhe pronësisë në aplikacionin tënd.

Përgjigje: Identiteti është llogaria e përdoruesit që vërtetohet nga GitHub, pra kush është personi që hyn në sistem. Roli është çfarë mund të bëjë ai përdorues: në projektin tim `shofer` ose `udhetar`. Pronësia është se cilit udhëtim ose të dhënë i takon një resursi: në kodin tim, udhëtimi kontrollohet përmes `shofer_id` në tabelën `udhetimet`, dhe serveri verifikon se shoferi i loguar është pronari i atij udhëtimi. Pra, identiteti thotë “kush je”, roli thotë “çfarë ke të drejtë të bësh”, dhe pronësia thotë “e ke të drejtë këtë resurs?”

## Provat që bëra
### Prova 1: Hyrja, rifreskimi dhe dalja
[PLOTËSO] Hapa /panel pa hyrë, hyra me GitHub, rifreskova, pastaj dola.
Shkruaj çfarë shfaqej para hyrjes, pas rifreskimit dhe pas daljes.

Përgjigje: Para hyrjes, hapja e `/panel` shfaqte mesazhin: “Lista është publike. Për panelin hyr me llogarinë tënde GitHub.” Kjo ishte për shkak se `profiliIm()` nuk kthen profil kur nuk ka sesion. Pas hyrjes me GitHub, sesioni u krijua dhe `getServerSession(authOptions)` lexoi `user.id`; më pas `profilet` u krijua ose u ngarkua për përdoruesin dhe paneli shfaqi “Përshëndetje, <emri>. Roli: <roli>” dhe ID-në e GitHub. Pas rifreskimit, paneli mbeti i loguar sepse sesioni ruhej në cookies të NextAuth dhe `dynamic = "force-dynamic"` e detyroi rifreskim real të të dhënave. Pas daljes, `Hyrja` thirri `signOut({ callbackUrl: "/panel" })` dhe u kthye në pamjen publike: lista u shfaq si për vizitorin pa hyrje.

### Prova 2: Shoferi ndryshon udhëtimin e vet
Si shofer i ID 2 e ndryshova orën në 08:25.
Shkruaj çfarë u shfaq në panel, listë, detaje dhe SQL Editor. Rikthe 08:15.

Përgjigje: Si shofer i ID 2 e ndryshova orën në 08:25. Në panel, pas dërgimit të formularit, u shfaq mesazhi: “Ora u ruajt me sukses. Kontrollo listën dhe detajet.” Në listën e udhëtimeve, në kartën e udhëtimit 2, ora u shfaq e re 08:25, dhe në detail page të udhëtimit 2 gjithashtu u vu 08:25. Në SQL Editor, query-ja `SELECT id, ora, shofer_id FROM udhetimet ORDER BY id;` tregoi që rreshti me `id = 2` kishte një orë të re. Më pas e rikthye orën në 08:15 me të njëjtin formular, dhe paneli e konfirmoi suksesin me mesazhin e ribashkimit.

### Prova 3: Veprimi pa leje refuzohet
Nga formulari i hapur ndryshova ID në 1 dhe provova Ruaj.
Shkruaj mesazhin e refuzimit dhe si verifikove në Neon që ID 1 mbeti 08:00.
Provat shtesë me heqjen e rolit dhe formularin e vjetër janë opsionale pas dorëzimit.

Përgjigje: Nga formulari, ndryshova vlerën e `id` nga 2 në 1 dhe provova `Ruaj`. Serveri nuk e kishte përftuar një leje, sepse `ndryshoOren()` kontrollon: `WHERE id = ${id} AND shofer_id = ${p.id} AND EXISTS (...) AND roli = 'shofer'`. Kjo do të refuzonte çdo ndryshim ku `id` nuk i takonte shoferit të loguar. Mesazhi i refuzimit në panel ishte: “Nuk ke leje për këtë udhëtim. Ora nuk ndryshoi.” Për verifikim në Neon, rreshti me `id = 1` mbeti 08:00, sepse `shofer_id` atij udhëtimi i takonte `DEMO-SHOFER-2` dhe jo profilit të përdoruesit të loguar. Ky është prova se kontrolli i pronësisë funksionoi edhe nëse dikush ndryshte fushën e formularit.

## Ku gjendet puna
Linku i repository-t dhe skedarët e rinj; demo në Vercel nëse e publikove.

Përgjigje: Repozitoriumi i projektit është në folderin lokal `rideshare-mobile`, dhe aplikacioni ndodhet nën `rideshare-mobile/my-app`. Skedarët e rëndësishëm të Java 5 janë `lib/auth.ts`, `lib/lejet.ts`, `app/panel/page.tsx`, `app/panel/actions.ts` dhe `schema-java05.sql`. Nuk kam publikuar demo në Vercel, kështu që linku i jashtëm nuk është i disponueshëm.

## Çfarë mbetet për përmirësim
 Një kufizim: kërkesa për vend është ende simulim; çfarë do të shtoje më pas?

Përgjigje: Një kufizim është se kërkesa për vend është ende simulim. Në këtë fazë, sistemi nuk bën rezervim real, nuk ul numrin e vendeve në bazë të rezervimeve, dhe nuk ka logjikë të vërtetë për “vendi i lirë”. Më pas do të shtoja: (1) një rezervim real në bazë të përdoruesit të loguar, (2) kontroll të vendeve të lira dhe rregullime për konflikte, (3) një proces për konfirmim dhe anulim të rezervimeve.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Çfarë ndihme more dhe çfarë provove vetë, ose: Nuk përdora AI.

Përgjigje: Perdora AI.
