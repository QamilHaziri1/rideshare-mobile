# Java 3: Kartat dhe faqet

## Provat

1. **Lista në telefon** – Hapat: hape aplikacionin në telefon ose në pamjen mobile të shfletuesit dhe kontrollo listën e udhëtimeve. Rezultati i pritshëm sipas kodit: shfaqen tri karta me nisjen, destinacionin, orën dhe vendet e lira; butoni “Shiko detajet” hap udhëtimin përkatës. Shëno këtu rezultatin real pas provës në telefon.

2. **Detajet e kartës 2, zero vende dhe ID 99** – Hapat: hape `/udhetimi/2`, pastaj `/udhetimi/3` (udhëtimi pa vende) dhe `/udhetimi/99`. Rezultati i pritshëm sipas kodit: ID 2 tregon detajet dhe një vend të lirë, ID 3 tregon zero vende, ndërsa ID 99 kthen faqen “Not Found”. Shëno këtu rezultatin real pas provës.

3. **Simulimi i kërkesës dhe kthimi mbrapa** – Hapat: nga detajet e një udhëtimi zgjidh “Dërgo kërkesë”, kontrollo njoftimin dhe përdor lidhjen për t'u kthyer te lista. Rezultati i pritshëm: shfaqet “Në pritje” si simulim dhe mund të kthehesh te lista pa u regjistruar pagesë apo kërkesë reale. Shëno këtu rezultatin real pas provës.

## Përfundimi

Provat duhen kryer në klasë; rezultatet e mësipërme janë të pritshme nga kodi dhe nuk pretendojnë se janë verifikuar në pajisje.
