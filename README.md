# ⚡ PokeAnalyzer: Strategic Team Builder

A professional-grade Pokemon team analysis tool built with **React, TypeScript, and Tailwind CSS**. This application allows users to build a 6-Pokemon squad and receive real-time tactical insights into their team's offensive coverage, defensive gaps, and statistical roles.

## 🚀 Live Demo
[Netlify Deployment](https://frabjous-bublanina-8610e7.netlify.app/)


## 📖 Overview
The PokeAnalyzer is a decision-support system for trainers, transforming raw data from the [PokeAPI](https://pokeapi.co/) into actionable strategic insights.

### Approach & Architecture
* **Data Transformation Layer**: Implemented a strict mapping utility to clean raw API responses into local TypeScript interfaces. This ensures the UI is decoupled from the external API structure and provides full autocomplete/type-safety during development.
* **Functional Programming**: Used immutable state patterns for team management. All analysis (weaknesses, strengths, and roles) is calculated derived from the central `team` state, ensuring the UI stays in perfect sync.
* **Component-Driven Design**: The app is broken into modular, reusable components (Search, Grid, Dashboard), making the codebase maintainable and easy to scale.
* **Responsive Dashboard**: Utilized a Tailwind-based "Control Center" layout that adapts from a single-column mobile view to a sophisticated multi-column desktop dashboard.

---

## 🛠️ Setup Instructions

### Prerequisites
* **Node.js**: Version 20.x or higher
* **npm**: Version 10.x or higher

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/reginateh/pokemon-team-builder.git
    cd pokemon-team-builder
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App
Start the development server:
```bash
npm run dev
```
## 🧪 Testing Instructions

Add Pokemons to your team and check the stats analysis.

## 🧠 Assumptions & Challenges

### Strategic Logic & Heuristics
* **Relative Benchmarking**: I assumed that a Pokemon's role is best defined in the context of its current teammates. Instead of using hardcoded stat thresholds (e.g., "Attack > 100"), the app calculates roles **relative to the team's maximum**. This means a Pokemon with 80 Speed is classified as "High Speed" on a team of slow tanks, but "Balanced" on a team of speedsters, providing a more accurate analysis.

* **UI Hierarchy**: The layout assumes a Live Dashboard workflow. The search interface is positioned for rapid iteration, while the primary "Current Squad" display and "Analysis Dashboard" provide immediate visual feedback on team synergy.

### Technical Challenges
* **MIME Type Enforcement (Deployment)**: A critical challenge during the Netlify deployment was a `strict MIME type checking` error (responding with `application/octet-stream`). This was diagnosed as a pathing conflict within Vite's build process and resolved by explicitly configuring the `base` path in `vite.config.ts` and ensuring the Netlify "Publish Directory" was correctly mapped to `/dist`.
* **Stat Normalization**: Pokemon stats vary significantly in scale. I implemented a normalization factor to ensure the progress bars in the dashboard remain visually meaningful and comparable across different species without "overflowing" the UI containers.
* **Data Density & UX**: Balancing a 6-Pokemon grid with detailed base stats, abilities, and a dual-column analysis dashboard required a mobile-first responsive approach. I utilized Tailwind's `grid-cols-12` system to ensure the sidebar and main content areas remained legible and functional on all screen sizes.
* **Asynchronous State Sync**: Managing the latency between the PokeAPI fetch and the re-calculation of the Analysis Dashboard required careful state management to prevent "Layout Shift" and ensure that calculations only occur once the full Pokemon data object is validated.

## 📐 Design Limitations

As this application was developed as a rapid technical assessment, certain design trade-offs were made to prioritize core functionality and data accuracy.

### 1. Offensive Coverage Approximation
* **The Limitation**: The current "Strengths" analysis is derived from the Pokemon's **Types** rather than their individual **Move-sets**. 
* **The Impact**: While a Pokemon's type is a strong indicator of its offensive niche, a Pokemon like *Gyarados* (Water/Flying) often carries Dark or Dragon moves. A production-level version would need to fetch and filter the `moves` array from the PokeAPI to provide a more granular coverage report.

### 2. Static Benchmarking for Stats
* **The Limitation**: Stat normalization is currently scaled against a fixed maximum (e.g., 200 for Speed, 250 for HP). 
* **The Impact**: While this works for 99% of Pokemon, "statistical outliers" like *Chansey* (250 HP) or *Regieleki* (200 Speed) can make the progress bars for average Pokemon look disproportionately small. A more robust solution would involve dynamic scaling based on the entire PokeAPI dataset.

### 3. Single-Session State
* **The Limitation**: The application currently uses local React state to manage the team. 
* **The Impact**: Refreshing the browser clears the current squad. In a real-world scenario, implementing `localStorage` persistence or a backend database (Supabase/Firebase) would be necessary to allow users to save and share their teams.

### 4. API Rate Limiting & Caching
* **The Limitation**: Every search triggers a fresh network request to the PokeAPI. 
* **The Impact**: While sufficient for a single-user demo, high-volume traffic could lead to rate-limiting. Implementing a caching layer (like `React Query` or a service worker) would improve performance and reduce redundant API calls.

### 5. Type-Effectivity Edge Cases
* **The Limitation**: The analysis engine uses a standard $2\times$ effectiveness multiplier. 
* **The Impact**: It does not currently account for specific abilities that alter type-math, such as *Levitate* (immunity to Ground) or *Thick Fat* (resistance to Fire/Ice). This logic would require a more complex "Ability-Aware" simulation engine.