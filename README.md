# 🍊 Sicilian Taste

**Sicilian Taste** è una piattaforma web moderna dedicata alla valorizzazione dei **presìdi Slow Food siciliani**, dei prodotti artigianali locali e delle **piccole aziende che non dispongono di un proprio e-commerce**.

La piattaforma consente:

- agli utenti di scoprire, acquistare e conoscere prodotti autentici siciliani
- alle aziende di pubblicare e vendere i propri prodotti tramite una sezione dedicata
- agli admin di gestire contenuti, prodotti e comunicazioni

---

## 🌍 Vision & Mission

### 🎯 Vision

Diventare il punto di riferimento digitale per la gastronomia siciliana autentica.

### 🫒 Mission

- Promuovere presìdi Slow Food e produttori locali
- Offrire un canale di vendita semplice per le piccole aziende
- Educare gli utenti alla qualità, alla tradizione e alla sostenibilità

---

## 🧑‍🤝‍🧑 Tipologie di Utenti

### 👤 User (Visitor / Customer)

- Naviga ricette e prodotti
- Scopre aziende locali
- Acquista prodotti
- Consulta ingredienti e valori nutrizionali

### 🏭 Company (Azienda)

- Si registra come azienda
- Crea, aggiorna ed elimina i propri prodotti
- Visualizza solo i prodotti creati
- Vende senza dover creare un sito web proprio

### 🛠 Admin

- Gestisce tutti i prodotti
- Modifica ed elimina prodotti
- Invia newsletter
- Supervisiona la piattaforma

---

## 📚 User Stories

### Visitor

- Come utente voglio esplorare prodotti tipici siciliani
- Come utente voglio leggere ricette dettagliate
- Come utente voglio acquistare prodotti facilmente

### Company

- Come azienda voglio pubblicare i miei prodotti
- Come azienda voglio modificarli e cancellarli
- Come azienda voglio vendere online senza creare un sito

### Admin

- Come admin voglio gestire tutti i prodotti
- Come admin voglio inviare newsletter
- Come admin voglio mantenere la qualità dei contenuti

---

## 🧱 Tech Stack

### 🎨 Frontend

- **Next.js 16 (App Router)**
- React
- Tailwind CSS
- Redux Toolkit
- Next Fonts (Google Fonts)
- SEO statico e dinamico

### ⚙️ Backend

- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (upload immagini)

---

## 🗂 Struttura delle Pagine

```
/
├─ recipe/[id]
├─ recipe/random
├─ categories
├─ categories/[category]
├─ company (protetta)
├─ admin (protetta)
├─ buy
├─ register
├─ login
├─ contact
├─ terms
├─ privacy

```

## 🧩 Wireframe (struttura concettuale)

### 🏠 Home Page

NAVBAR
HERO (Sicilian Taste)
SEZIONE “CHI SIAMO”
PRODOTTI IN EVIDENZA
CATEGORIE
FOOTER

### 🍝 Recipe / Product Detail

IMMAGINE
NOME
PREZZO
DESCRIZIONE
INGREDIENTI
RICETTA
VALORI NUTRIZIONALI
PRODOTTI SIMILI

### 🏭 Area Aziende (`/company`)

FORM CREAZIONE PRODOTTO | PREVIEW
LISTA PRODOTTI AZIENDA
[EDIT] [DELETE]

### 🛠 Admin (`/admin`)

LISTA TUTTI I PRODOTTI
NEWSLETTER
CREAZIONE PRODOTTO

---

## 🔐 Autenticazione & Sicurezza

- JWT Authentication
- Cookie HttpOnly
- Gestione ruoli:
  - `user`
  - `company`
  - `admin`
- Route protette lato server
- Middleware di autorizzazione

---

## ⚙️ Setup & Avvio del Progetto

### 1️⃣ Clonare il repository

```
git clone https://github.com/Damilola91/sicilian-taste-next.git
cd sicilian-taste
```

### 2️⃣ Installare le dipendenze

```
npm install
```

### 3️⃣ Variabili d’ambiente

Crea un file .env.local:

```
env
Copia codice
API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_SERVER_BASE_URL=http://localhost:5000
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

### 4️⃣ Avvio del progetto

```
npm run dev
📍 Il progetto sarà disponibile su:

http://localhost:3000
```

🚀 Funzionalità Principali
CRUD prodotti (company & admin)

Upload immagini con Cloudinary

Ricette e prodotti simili

Random recipe

Newsletter per admin

SEO ottimizzato

Design responsive

Accesso basato su ruolo

🧠 Filosofia del Progetto
Sicilian Taste non è solo un e-commerce.

È:

una vetrina culturale

un supporto digitale per piccole aziende

un progetto orientato alla qualità, non alla quantità

Ogni prodotto racconta una storia.
Ogni azienda ha il suo spazio.

📌 Stato del Progetto
✅ Core features completate

✅ Pagamenti online

🔜 Riepilogo Pagamenti

🔜 Dashboard analytics aziende

🔜 Internazionalizzazione (i18n)

👨‍💻 Autore
Damilola Abiola Wiwoloku
Full-Stack Developer
Specializzato in Next.js, Node.js, MongoDB
