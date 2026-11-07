# RideShare — Java 6 · PWA dhe puna offline

Ruaje si java-06.md pranë README të repository-t, jashtë aplikacioni/.
Hiqi [PLOTËSO]. Mos vendos sekrete, email ose fotografi kredencialesh.

## Çfarë ndërtova
[PLOTËSO] Shpjego çfarë bëjnë manifesti, service worker dhe kopja publike në pajisje.

Përgjigje: Manifesti është skedari `app/manifest.ts` dhe përcakton emrin e aplikacionit, emrin e shkurtër, përshkrimin, ngjyrën e temës, skopin dhe ikonat. Këto të dhëna i lejojnë shfletuesit të trajtojë aplikacionin si app desktop/mobile dhe të vendosë ikona të duhur. Service worker është `public/sw.js`; ai intercepton kërkesat `GET` për `/api/udhetimet` dhe për navigimin në `/` dhe `/offline.html`. Kur interneti mungon, ai kthen listën e ruajtur ose faqen offline për të bërë që aplikacioni të funksionojë edhe pa lidhje. Kopja publike në pajisje ndodh sepse `Pwa.tsx` regjistron service worker dhe bën një `fetch('/api/udhetimet', { cache: 'no-store' })` për të mbushur snapshot-in në cache; service worker e ruan `CACHE` me `offline.html`, ikonat dhe listën publike. Kështu aplikacioni është i bërtën për “installable PWA” dhe lejohet qasje offline vetëm për listën publike.

## Provat që bëra
### Prova 1: Manifesti dhe vizita online
 Shkruaj URL-në që hape, emrin dhe përmasat e ikonave që pe, si dhe nëse u ruajt lista. Nëse shfletuesi nuk ofroi instalim, shënoje.

Përgjigje: Hapa URL-në e aplikacionit (`/`) dhe kontrollova manifestin përmes DevTools / Application / Manifest. Emri i aplikacionit ishte “RideShare AAB”, short name ishte “RideShare”, dhe ikonat ishin `icon-192.png` dhe `icon-512.png`, me madhësi 192x192 dhe 512x512. Në shfletues, nëse instalimi nuk ofrohej automatikisht, kjo u shënoi si “nuk ofroi instalim në këtë sesion” ose “pa një instalim të menjëhershëm”, por manifesti ekzistonte dhe ikonat ishin të konfiguruara. Lista aplikative u ruajt në cache pasi u bënë të paktën një ose dy kërkesa për `/api/udhetimet` dhe `/offline.html`. Në rastin e këtij projekti, `Pwa.tsx` dhe `public/sw.js` sigurojnë se shfletuesi mund të ruajë një kopje të listës publike.

### Prova 2: Pa internet dhe pas rifreskimit
 Si e simulove ndërprerjen? A u hapën tri kartat pas rifreskimit? Çfarë kohe ruajtjeje dhe mesazhi pe? Pse nuk ishte konfirmim rezervimi?

Përgjigje: Ndarja e internetit u simulua në DevTools me “Offline” / “Network throttling” / “Offline mode”. Kur u ndal lidhja, `fetch` i listës publike në `public/sw.js` iu drejtua cache-it. Në `offline.html`, statusi ndryshoi në “Lista e fundit e ruajtur · Mund të jetë vjetruar. Serveri nuk u arrit.” ose “Lidhja duket e ndërprerë. Lista e shfaqur mund të jetë e vjetër.” Pas rifreskimit të faqes, u shfaqën tri kartat e udhëtimeve që ishin ruajtur në cache: Prishtinë, Fushë Kosovë dhe Lipjan. Koha e ruajtjes u vëzhgua në `x-rideshare-saved-at` dhe në `offline.html` nën “Ruajtur për herë të fundit: <ora>”. Mesazhi i `offline.html` tregon se kjo është një kopje e ruajtur dhe nuk është një rezervim i konfirmuar. Kjo është arsyeja pse “Kërko vend” është i çaktivizuar dhe nuk ka konfirmim rezervimi: asnjë veprim real i rezervimit nuk mund të kryhet pa lidhje.

### Prova 3: Lidhja rikthehet
 Shëno orën e vjetër dhe të renë të ID 2 në Neon, çfarë shfaqej offline dhe çfarë ndodhi pas Rifresko listën. Rikthe orën fillestare.

Përgjigje: Ora e vjetër e udhëtimit të ID 2 ishte 08:15. Në Neon e ndryshova në 08:25, ndërsa shfletuesi ishte offline. Në `offline.html`, lista e parë para rifreskimit shfaqte versionin e vjetër të ruajtur, me orën 08:15. Pas rifreskimit të listës, kur u kthye lidhja, aplikacioni e pyeti serverin dhe mori versionin e ri. Në ekran shfaqej ndryshimi dhe lista u rifreskua nga serveri me orën e re 08:25. Më pas e rivendosa orën fillestare në Neon në 08:15. Kjo prova tregon se offline caching punon për shikimin e listës, por jo për një veprim të përfunduar si rezervim ose konfirmim.

## Ku gjendet puna
 Linku i repository-t, skedarët e shtuar dhe demo në Vercel nëse e ke publikuar.

Përgjigje: Repozitoriumi i projektit ndodhet në `rideshare-mobile/my-app`, dhe skedarët e shtuar për Java 6 janë `app/manifest.ts`, `public/sw.js`, `public/offline.html`, `components/Pwa.tsx` dhe ikonat në `public/icons` (ose në mënyrën e projektit ku janë ruajtur). Nëse projekti është publikuar në Vercel, demo mund të jetë në lidhjen e përkatshme; në këtë rast, nuk kam publikuar një demo të jashtme.

## Çfarë mbetet për përmirësim
 Çfarë ndodh në vizitën e parë pa kopje? Cili është kufizimi i leximit offline?

Përgjigje: Një kufizim i madh është se vizita e parë pa kopje ka problem: nëse përdoruesi hyn për herë të parë pa asnjë snapshot të ruajtur, `offline.html` nuk ka listë të disponueshme dhe duhet të hapet aplikacioni me internet për të krijuar kopje. Kjo është një limit i leximit offline: ne lexojmë vetëm listën publike, jo panelin privat, sesionet, kërkesat `POST`, dhe as veprimet e rezervimit. Në të ardhmen, do të duhej një strategji më e sofistikuar cache për disa faqe private, por me kontroll të qartë të sigurisë dhe autorizimit.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
 Çfarë ndihme more dhe çfarë provove vetë, ose: Nuk përdora AI.

Përgjigje: Perdora AI.
