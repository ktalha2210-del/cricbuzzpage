---
name: casestudy-pm
description: >
  Generates a complete, premium product manager (PM) case study web page — built in React + Vite — that mirrors the exact structure, design system, interactive patterns, and component library of the District Crowd Visibility case study. Use when asked to create a PM case study page, portfolio case study, or product case study from provided content. The output is a single-page React app with a sticky navbar, light/dark theme toggle, scroll-active nav, and all standard PM sections (Overview, Discovery, Problem, Journey, Solution, Wireframes/Prototype, PRD).
---

# PM Case Study Page Generator

A comprehensive skill for generating production-ready PM case study web pages that exactly match the design system, layout, and interactive patterns established in the District Crowd Visibility case study (built with React + Vite). The final output is a polished, portfolio-quality page ready to present to hiring managers or post publicly.

---

## 0. How to Use This Skill

**Input you need from the user:**
1. The case study content (problem, product, research, solutions, metrics, etc.)
2. Optionally: a theme color override (default is purple `#8B5CF6`)
3. Optionally: whether to include a video mockup in the hero (default: static placeholder)

**What this skill produces:**
- `/src/App.jsx` — the full page component
- `/src/index.css` — the full design system + component CSS
- `/index.html` — the HTML entry point
- `/package.json` — Vite + React dependencies
- `/vite.config.js` — Vite config

**The content you receive is placed into the fixed structural template below.** Only the textual content changes per case study. The layout, CSS classes, component patterns, and interactions are always identical.

---

## 1. Design System

### 1.1 Color Tokens

The design system uses CSS custom properties on `:root` for light mode and `[data-theme="dark"]` for dark mode. The accent color is the only thing that changes between projects.

```css
:root {
  /* Backgrounds */
  --bg-main: #FFFFFF;
  --bg-main-rgb: 255, 255, 255;
  --bg-secondary: #F8F9FA;
  --bg-card: #FFFFFF;

  /* Text */
  --text-main: #1A1A1A;
  --text-secondary: #4A4A4A;
  --text-muted: #888888;

  /* Borders & Shadows */
  --border-light: #EAEAEA;
  --border-purple: rgba(139, 92, 246, 0.3);
  --shadow-sm: 0 4px 16px rgba(0,0,0,0.04);
  --shadow-md: 0 16px 40px rgba(0,0,0,0.08);
  --shadow-lg: 0 32px 80px rgba(0,0,0,0.1);
  --shadow-purple: 0 8px 32px rgba(139, 92, 246, 0.15);

  /* Brand Accent (Purple) */
  --primary-purple: #8B5CF6;
  --primary-hover: #7C3AED;
  --primary-tint: rgba(139, 92, 246, 0.05);
  --primary-gradient: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);

  /* Radii */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
}

[data-theme="dark"] {
  --bg-main: #121212;
  --bg-main-rgb: 18, 18, 18;
  --bg-secondary: #1E1E1E;
  --bg-card: #252525;
  --text-main: #F3F4F6;
  --text-secondary: #D1D5DB;
  --text-muted: #9CA3AF;
  --border-light: rgba(255,255,255,0.1);
  --border-purple: rgba(139, 92, 246, 0.5);
  --shadow-sm: 0 4px 16px rgba(0,0,0,0.3);
  --shadow-md: 0 16px 40px rgba(0,0,0,0.4);
  --shadow-lg: 0 32px 80px rgba(0,0,0,0.5);
  --shadow-purple: 0 8px 40px rgba(139, 92, 246, 0.25);
  --primary-purple: #A78BFA;
  --primary-hover: #C4B5FD;
  --primary-tint: rgba(139, 92, 246, 0.15);
  --primary-gradient: linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%);
}
```

**To change the brand color** (e.g. to teal `#14B8A6`), replace all `139, 92, 246` (the RGB of `#8B5CF6`) with your new color's RGB values, and replace `#8B5CF6` / `#6D28D9` / `#7C3AED` with the new primary / dark / hover shades.

### 1.2 Typography

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

body {
  font-family: 'Inter', -apple-system, sans-serif;
  line-height: 1.6;
  font-optical-sizing: auto;
  transition: background-color 0.3s, color 0.3s;
}
```

- **Headings:** `font-weight: 800`, `letter-spacing: -0.02em`, `line-height: 1.05`
- **Body text:** `font-size: 1rem`, `color: var(--text-secondary)`, `line-height: 1.8`
- **Labels / caps:** `font-size: 0.75–0.9rem`, `text-transform: uppercase`, `letter-spacing: 1px`
- **Quotes / italics:** `font-style: italic`, `color: var(--text-secondary)`

### 1.3 Layout

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section {
  padding: 6rem 0;
}
```

Sections alternate between `background: var(--bg-main)` and `background: var(--bg-secondary)` to create visual separation without hard lines.

---

## 2. Global Navigation

The navbar is always **sticky**, **glassmorphic**, and has an active underline on the current section driven by an IntersectionObserver / scroll listener.

```jsx
// React state
const [activeSection, setActiveSection] = useState('overview');
const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

// Scroll listener → setActiveSection
useEffect(() => {
  const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) current = section.id;
    });
    if (current) setActiveSection(current);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Theme toggle
useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}, [theme]);
```

```jsx
// JSX
<nav className="navbar">
  <ul className="nav-links">
    {[
      ['overview',   '[Product] Overview'],
      ['discovery',  'Discovery Phase'],
      ['problem',    'Which Problem to Solve'],
      ['journey',    'User Journey Mapping'],
      ['solution',   'Solution Space'],
      ['wireframes', 'Wireframes / Prototype'],
      ['prd',        'PRD'],
    ].map(([id, label]) => (
      <li key={id}>
        <a href={`#${id}`} className={activeSection === id ? 'active' : ''}>
          {label}
        </a>
      </li>
    ))}
  </ul>
  <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
    {theme === 'light' ? '🌙' : '☀️'}
  </button>
</nav>
```

```css
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(var(--bg-main-rgb), 0.65);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(var(--bg-main-rgb), 0.1);
  box-shadow: 0 1px 0 var(--border-light);
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.nav-links { display: flex; gap: 2rem; list-style: none; }

.nav-links a {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.active { color: var(--primary-purple); }

.nav-links a.active::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 100%; height: 2px;
  background: var(--primary-gradient);
  border-radius: 2px;
}

.theme-toggle {
  background: var(--primary-tint);
  border: 1px solid var(--border-purple);
  color: var(--primary-purple);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;
}
.theme-toggle:hover { background: var(--primary-purple); color: white; }
```

---

## 3. Section-by-Section Template

Each section below maps to a `<section id="...">` in the JSX. Replace `[PLACEHOLDER]` values with actual case study content.

### Section 0 — Hero

The hero is a **two-column grid**: left = text + meta cards, right = animated 3D mobile mockup (or image).

```jsx
<section className="hero" id="hero">
  <div className="container hero-grid">
    <div className="hero-content">
      <h4 style={{ color:'var(--text-muted)', textTransform:'uppercase', 
                   letterSpacing:'1px', marginBottom:'1rem', fontWeight:'700' }}>
        Case Study
      </h4>
      <h1 className="hero-title">
        <span>[Product Name]</span><br/>
        [One-line case study headline]
      </h1>
      <p className="hero-desc">
        [2–3 sentence summary: context, method, and the core problem addressed.]
      </p>

      <div className="meta-grid" style={{ gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'1.5rem' }}>
        <div className="meta-card">
          <div className="meta-label">Published Date</div>
          <div className="meta-value">[Date]</div>
        </div>
        <div className="meta-card">
          <div className="meta-label">Read Time</div>
          <div className="meta-value">[N Mins]</div>
        </div>
        <div className="meta-card">
          <div className="meta-label">Made by</div>
          <div className="meta-value">[Author Name] + LinkedIn SVG icon</div>
        </div>
        <div className="meta-card">
          <div className="meta-label">Contact me</div>
          <div className="meta-value">
            <a href="mailto:[email]" style={{ color:'var(--primary-purple)', fontWeight:'600' }}>
              [email]
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Right: 3D mobile mockup */}
    <div className="mockup-wrapper">
      <div className="mobile-mockup">
        <video className="mockup-content" src="/[demo-video].mp4"
          autoPlay loop muted playsInline
          style={{ objectFit:'cover', display:'block' }} />
      </div>
    </div>
  </div>
</section>
```

**Hero CSS (key rules):**

```css
.hero {
  min-height: 85vh;
  display: flex;
  align-items: center;
  padding: 6rem 0;
  background: var(--bg-main);
  position: relative;
  overflow: hidden;
}
/* Soft purple glow behind mockup */
.hero::after {
  content: '';
  position: absolute;
  top: -100px; right: -100px;
  width: 400px; height: 400px;
  background: var(--primary-purple);
  filter: blur(150px);
  opacity: 0.1;
  z-index: 0;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}
.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}
.hero-title span {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
/* 3D floating phone */
.mobile-mockup {
  width: 300px; height: 620px;
  background: #000;
  border: 14px solid #1c1c1e;
  border-radius: 48px;
  box-shadow: -30px 30px 50px rgba(0,0,0,0.5),
              inset 0 0 0 2px #3a3a3c,
              0 0 40px rgba(139,92,246,0.2);
  transform: rotateY(-15deg) rotateX(5deg) rotateZ(-1deg);
  animation: float3d 6s ease-in-out infinite;
}
/* iOS Dynamic Island */
.mobile-mockup::before {
  content: '';
  position: absolute;
  top: 10px; left: 50%;
  transform: translateX(-50%);
  width: 90px; height: 24px;
  background: #000;
  border-radius: 20px;
}
/* iOS Home Indicator */
.mobile-mockup::after {
  content: '';
  position: absolute;
  bottom: 8px; left: 50%;
  transform: translateX(-50%);
  width: 100px; height: 4px;
  background: rgba(255,255,255,0.8);
  border-radius: 10px;
}
@keyframes float3d {
  0%,100% { transform: rotateY(-15deg) rotateX(5deg) translateY(0px); }
  50%      { transform: rotateY(-15deg) rotateX(5deg) translateY(-15px); }
}
```

---

### Section 1 — Product Overview (`id="overview"`)

Contains: product intro paragraph, business model cards (B2C + B2B), monetization numbered list, strategic focus quote card, competitor comparison table, user segment persona cards.

**Components used:**

#### `section-title` with gradient underline
```css
.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
.section-title::after {
  content: '';
  width: 60px; height: 4px;
  background: var(--primary-gradient);
  border-radius: 2px;
}
```

#### `info-card` — standard white card with purple hover
```css
.info-card {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
}
.info-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-purple);
  border-color: var(--primary-purple);
}
```

#### `monetization-text-grid` — numbered feature cards
```css
.monetization-text-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  margin: 2rem 0 4rem;
}
.monetization-text-card {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
}
.mon-num {
  font-size: 2rem;
  font-weight: 900;
  color: var(--primary-purple);
  opacity: 0.2;
  margin-bottom: 0.5rem;
}
```

#### `table-wrapper` — comparison table
```css
.table-wrapper {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  overflow: hidden;
  margin: 3rem 0;
}
th { background: var(--primary-tint); font-weight: 700; }
tr:hover td { background: var(--primary-tint); }
```

#### `persona-card` — user segment cards
```css
.persona-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.persona-card {
  background: var(--bg-card);
  padding: 2.5rem 2rem;
  border-radius: var(--radius-md);
  text-align: center;
  border: 1px solid var(--border-light);
  transition: all 0.3s;
}
.persona-card:hover {
  border-color: var(--primary-purple);
  transform: translateY(-5px);
  box-shadow: var(--shadow-purple);
}
.persona-icon {
  width: 80px; height: 80px;
  border-radius: 50%;
  background: var(--primary-tint);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 1.2rem; color: var(--primary-purple);
  margin: 0 auto 1.5rem;
  border: 2px solid var(--border-purple);
}
```

**JSX pattern for persona initials (no images needed):**
```jsx
<div className="persona-icon persona-icon-text">{initials}</div>
```

---

### Section 2 — Discovery Phase (`id="discovery"`)

Contains: initial exploration cards (hypothesis cards), research methodology stats, participant cards ("Who I Spoke To"), JTBD cards, insight cards (two-column with quote), affinity flow + sticky note board, prioritized pain point bars, takeaway box.

#### `hypo-card` — exploration hypothesis
```css
.hypo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
.hypo-card {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
}
```

#### `stat-card` — research numbers
```css
.stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-bottom: 2rem; }
.stat-card {
  background: var(--primary-tint);
  padding: 2rem;
  border-radius: var(--radius-md);
  text-align: center;
  border: 1px solid var(--border-purple);
}
.stat-icon { font-size: 3rem; margin-bottom: 1rem; }
.stat-title { font-size: 1rem; color: var(--text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
.stat-value { font-size: 1.5rem; font-weight: 800; color: var(--primary-purple); }
```

#### `jtbd-card` — Jobs To Be Done (striped rows)
```jsx
<div className="jtbd-card">
  <div className="jtbd-row">
    <div className="jtbd-label">WHEN...</div>
    <div className="jtbd-text">[situation]</div>
  </div>
  <div className="jtbd-row">
    <div className="jtbd-label">I WANT TO...</div>
    <div className="jtbd-text">[motivation]</div>
  </div>
  <div className="jtbd-row">
    <div className="jtbd-label">SO I CAN...</div>
    <div className="jtbd-text">[outcome]</div>
  </div>
</div>
```

```css
.jtbd-card { background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-light); overflow: hidden; box-shadow: var(--shadow-sm); margin-bottom: 1.5rem; }
.jtbd-row { display: flex; align-items: center; padding: 1.5rem 2rem; border-bottom: 1px solid var(--border-light); }
.jtbd-label { font-weight: 800; color: var(--primary-purple); width: 120px; flex-shrink: 0; font-size: 0.9rem; letter-spacing: 1px; }
.jtbd-text { font-size: 1.1rem; color: var(--text-main); font-weight: 500; }
```

#### `insight-card` — two-column card (finding + quote)
```jsx
<div className="insight-card">
  <div className="insight-left">
    <div className="insight-freq">[N of N participants]</div>
    <h4 className="insight-title">[Insight headline]</h4>
    <p>[Detailed explanation of the insight with context]</p>
  </div>
  <div className="insight-quote">"[Verbatim user quote.]"</div>
</div>
```

```css
.insight-card {
  display: flex;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  border-left: 6px solid var(--primary-purple);
  overflow: hidden;
}
.insight-left { padding: 2rem; flex: 1; }
.insight-quote {
  background: var(--bg-secondary);
  padding: 2rem; flex: 1;
  display: flex; align-items: center;
  font-size: 1.1rem; font-style: italic;
  color: var(--text-secondary);
  border-left: 1px solid var(--border-light);
}
```

#### Affinity Diagram — flow + sticky notes
```jsx
{/* Flow pills */}
<div className="affinity-flow">
  <div className="aff-step">Interview Notes</div>
  <span>➔</span>
  <div className="aff-step">Grouped Observations</div>
  <span>➔</span>
  <div className="aff-step">Themes</div>
  <span>➔</span>
  <div className="aff-step" style={{ background:'var(--primary-gradient)', color:'white', border:'none' }}>Problem Statements</div>
</div>

{/* Theme buckets */}
<div className="affinity-themes">
  <div className="theme-bucket">
    <div className="theme-header" style={{ color:'#EF4444' }}>[Theme 1]</div>
    <div className="sticky-note sticky-red">[observation]</div>
    <div className="sticky-note sticky-red">[observation]</div>
  </div>
  <div className="theme-bucket">
    <div className="theme-header" style={{ color:'#8B5CF6' }}>[Theme 2]</div>
    <div className="sticky-note sticky-purple">[observation]</div>
  </div>
  {/* ...add more buckets */}
</div>
```

```css
.affinity-flow { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 3rem; }
.aff-step { padding: 1rem 1.5rem; background: var(--primary-tint); border: 1px solid var(--border-purple); border-radius: 30px; font-weight: 600; color: var(--primary-purple); }
.affinity-themes { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
.theme-bucket { background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-light); padding: 1.5rem; min-height: 250px; }
.theme-header { font-weight: 700; margin-bottom: 1.5rem; }
/* Sticky notes */
.sticky-note { padding: 0.75rem 1rem; border-radius: 4px; font-size: 0.85rem; margin-bottom: 0.5rem; font-weight: 500; }
.sticky-red    { background: #FEF2F2; color: #991B1B; }
.sticky-purple { background: #F5F3FF; color: #5B21B6; }
.sticky-blue   { background: #EFF6FF; color: #1E40AF; }
.sticky-green  { background: #F0FDF4; color: #166534; }
```

#### `priority-card` — pain point severity bars
```jsx
<div className="priority-card">
  <div className="priority-info">
    <div className="priority-title">[Pain Point Name]</div>
    <div style={{ color:'var(--text-secondary)', fontSize:'0.9rem' }}>[Brief description]</div>
  </div>
  <div className="priority-bars">
    <div className="p-bar-group">
      <span className="p-label">Severity</span>
      <div className="p-track"><div className="p-fill" style={{ width:'90%', background:'#EF4444' }} /></div>
    </div>
    <div className="p-bar-group">
      <span className="p-label">Frequency</span>
      <div className="p-track"><div className="p-fill" style={{ width:'85%', background:'#EF4444' }} /></div>
    </div>
  </div>
  <div className="badge critical">Critical</div>
</div>
```

```css
.priority-grid { display: flex; flex-direction: column; gap: 1.5rem; }
.priority-card { display: flex; align-items: center; gap: 2rem; background: var(--bg-card); padding: 1.5rem 2rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); box-shadow: var(--shadow-sm); }
.priority-info { flex: 2; }
.priority-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.25rem; }
.priority-bars { flex: 3; display: flex; flex-direction: column; gap: 0.75rem; }
.p-bar-group { display: flex; align-items: center; gap: 1rem; }
.p-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; width: 70px; flex-shrink: 0; }
.p-track { flex: 1; height: 8px; background: var(--border-light); border-radius: 4px; overflow: hidden; }
.p-fill { height: 100%; border-radius: 4px; }
/* Badge variants */
.badge { display: inline-block; padding: 0.3rem 0.75rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700; }
.badge.critical { background: #FEF2F2; color: #991B1B; }
.badge.high     { background: #FFF7ED; color: #9A3412; }
.badge.medium   { background: #FEFCE8; color: #854D0E; }
.badge.low      { background: #F9FAFB; color: #6B7280; }
```

#### `takeaway-box` — discovery key learnings callout
```css
.takeaway-box {
  background: var(--primary-tint);
  border: 1px solid var(--border-purple);
  border-radius: var(--radius-lg);
  padding: 3rem;
  margin: 4rem 0;
}
.takeaway-box h3 { font-size: 1.5rem; margin-bottom: 1rem; color: var(--primary-purple); }
.takeaway-box ul { padding-left: 1.5rem; margin-top: 1rem; }
.takeaway-box li { margin-bottom: 0.75rem; color: var(--text-secondary); }
```

---

### Section 3 — Which Problem to Solve (`id="problem"`)

Contains: PIF framework explanation cards, PIF prioritization table (with dot-chip scores), PIF takeaway callout, selected problem tabs (interactive), and problem deep-dive panels with early/final design view tabs.

#### `pif-cards` — PIF framework
```jsx
<div className="pif-cards">
  <div className="pif-card">
    <div className="pif-card-icon pif-icon-text">P</div>
    <h4>Pain</h4>
    <p>[description]</p>
  </div>
  <div className="pif-card">
    <div className="pif-card-icon pif-icon-text">I</div>
    <h4>Impact</h4>
    <p>[description]</p>
  </div>
  <div className="pif-card">
    <div className="pif-card-icon pif-icon-text">F</div>
    <h4>Frequency</h4>
    <p>[description]</p>
  </div>
</div>
<div className="pif-formula">
  <div className="pif-formula-badge">PIF Score = Pain × Impact × Frequency</div>
</div>
```

```css
.pif-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 1rem; }
.pif-card { background: var(--bg-card); padding: 2.5rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-light); box-shadow: var(--shadow-sm); }
.pif-card-icon { width: 60px; height: 60px; border-radius: 50%; background: var(--primary-gradient); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 900; color: white; margin: 0 auto 1rem; }
.pif-formula { text-align: center; margin: 1.5rem 0 4rem; }
.pif-formula-badge { display: inline-block; background: var(--primary-gradient); color: white; padding: 0.75rem 2rem; border-radius: 30px; font-weight: 700; font-size: 1rem; }
```

#### PIF Table with dot-score chips
```jsx
<table>
  <thead>
    <tr><th>Problem</th><th>Pain</th><th>Impact</th><th>Frequency</th><th>PIF Score</th><th>Priority</th></tr>
  </thead>
  <tbody>
    {problems.map(({ problem, pain, impact, freq, score, priority }) => (
      <tr key={problem} className={priority === 'high' ? 'highlight-row' : ''}>
        <td style={{ fontWeight:600 }}>{problem}</td>
        <td><div className="score-chips">{[1,2,3,4,5].map(n => <div key={n} className={n <= pain ? 'score-chip filled' : 'score-chip'} />)}</div></td>
        <td><div className="score-chips">{[1,2,3,4,5].map(n => <div key={n} className={n <= impact ? 'score-chip filled' : 'score-chip'} />)}</div></td>
        <td><div className="score-chips">{[1,2,3,4,5].map(n => <div key={n} className={n <= freq ? 'score-chip filled' : 'score-chip'} />)}</div></td>
        <td><div className="pif-score-badge">{score}</div></td>
        <td><div className={`badge ${priority}`}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</div></td>
      </tr>
    ))}
  </tbody>
</table>
```

```css
.score-chips { display: flex; gap: 4px; }
.score-chip { width: 12px; height: 12px; border-radius: 50%; background: var(--border-light); }
.score-chip.filled { background: var(--primary-purple); }
.pif-score-badge { display: inline-block; background: var(--primary-tint); color: var(--primary-purple); padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem; }
.highlight-row td { background: var(--primary-tint); }
```

#### Problem Selection Tabs (interactive)
```jsx
{/* Tab buttons */}
<div className="problem-tabs">
  <button className="problem-tab-btn active" data-problem="p1">Problem 1 — [Name]</button>
  <button className="problem-tab-btn"         data-problem="p2">Problem 2 — [Name]</button>
</div>

{/* Problem panels */}
<div className="problem-panel" data-problem="p1">
  {/* View sub-tabs: Early Design / Final Design */}
  <div className="view-tabs">
    <button className="view-tab-btn active" data-view="early">Early Design</button>
    <button className="view-tab-btn"         data-view="final">Final Design</button>
  </div>
  <div className="view-tab-content" data-view="early">[early design content]</div>
  <div className="view-tab-content" data-view="final" style={{ display:'none' }}>[final design content]</div>
</div>

<div className="problem-panel" data-problem="p2" style={{ display:'none' }}>
  {/* Similar structure */}
</div>
```

```css
.problem-tabs { display: flex; gap: 0; margin-bottom: 2rem; border: 1px solid var(--border-light); border-radius: var(--radius-sm); overflow: hidden; width: fit-content; }
.problem-tab-btn { padding: 0.75rem 2rem; background: var(--bg-card); border: none; font-weight: 600; font-size: 0.9rem; color: var(--text-secondary); cursor: pointer; transition: all 0.2s; }
.problem-tab-btn.active { background: var(--primary-gradient); color: white; }
.view-tabs { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
.view-tab-btn { padding: 0.5rem 1.25rem; background: transparent; border: 1px solid var(--border-light); border-radius: var(--radius-sm); font-weight: 600; cursor: pointer; color: var(--text-secondary); transition: all 0.2s; }
.view-tab-btn.active { background: var(--primary-tint); border-color: var(--primary-purple); color: var(--primary-purple); }
```

---

### Section 4 — User Journey Mapping (`id="journey"`)

Contains: a horizontal stages timeline with emotion ratings and annotations per stage, and a highlighted "moment of friction" callout.

```jsx
<div className="journey-wrapper">
  <div className="journey-stages">
    {stages.map((stage, i) => (
      <div key={i} className={`journey-stage ${stage.isCritical ? 'critical' : ''}`}>
        <div className="stage-num">0{i+1}</div>
        <div className="stage-name">{stage.name}</div>
        <div className="stage-desc">{stage.desc}</div>
        <div className="stage-emotion">
          {/* Emoji-based emotion bar */}
          <span className="emotion-icon">{stage.emoji}</span>
          <div className="emotion-bar">
            <div className="emotion-fill" style={{ width: `${stage.emotionPct}%`, background: stage.color }} />
          </div>
        </div>
        {stage.annotation && (
          <div className="stage-annotation">{stage.annotation}</div>
        )}
      </div>
    ))}
  </div>
</div>
```

```css
.journey-wrapper { overflow-x: auto; padding-bottom: 1rem; }
.journey-stages { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(160px, 1fr); gap: 0; min-width: 900px; }
.journey-stage { padding: 2rem 1.5rem; border-right: 1px solid var(--border-light); background: var(--bg-card); position: relative; }
.journey-stage:last-child { border-right: none; }
.journey-stage.critical { background: #FEF2F2; border-top: 4px solid #EF4444; }
.stage-num { font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; }
.stage-name { font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; }
.stage-desc { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.5; }
.stage-emotion { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
.emotion-bar { flex: 1; height: 6px; background: var(--border-light); border-radius: 4px; overflow: hidden; }
.emotion-fill { height: 100%; border-radius: 4px; }
.stage-annotation { font-size: 0.8rem; font-style: italic; color: #991B1B; background: #FEF2F2; padding: 0.5rem 0.75rem; border-radius: 6px; }
```

---

### Section 5 — Solution Space (`id="solution"`)

Contains: ICE framework explanation, ICE scoring table, selected solution highlight, feature deep-dive cards with solution mechanism, constraints, and metrics.

#### `ice-card` — ICE framework letters
```jsx
<div className="ice-cards">
  <div className="ice-card"><div className="ice-letter">I</div><h4>Impact</h4><p>[definition]</p></div>
  <div className="ice-card"><div className="ice-letter">C</div><h4>Confidence</h4><p>[definition]</p></div>
  <div className="ice-card"><div className="ice-letter">E</div><h4>Ease</h4><p>[definition]</p></div>
</div>
```

```css
.ice-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem; }
.ice-card { background: var(--bg-card); border: 1px solid var(--border-light); padding: 2rem; border-radius: var(--radius-md); text-align: center; box-shadow: var(--shadow-sm); }
.ice-letter { font-size: 3rem; font-weight: 900; background: var(--primary-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
```

#### Solution tabs (P1, P2, P3 tabs)
Use same tab pattern as Section 3 but bound to `activeSolutionTab` React state:
```jsx
const [activeSolutionTab, setActiveSolutionTab] = useState('p1');
// Render buttons with onClick={() => setActiveSolutionTab('p1')}
// Conditionally render content based on activeSolutionTab === 'p1'
```

#### Solution feature card
```jsx
<div className="solution-feature-card">
  <div className="sf-header">
    <div className="sf-icon">[emoji or icon]</div>
    <h3 className="sf-title">[Feature Name]</h3>
  </div>
  <p className="sf-desc">[What this feature does and why it solves the problem]</p>
  <div className="sf-details">
    <div className="sf-section"><strong>How it works</strong><p>[mechanism]</p></div>
    <div className="sf-section"><strong>User actions</strong><ul>[list]</ul></div>
  </div>
  <div className="sf-metrics">
    <div className="sfm-item"><div className="sfm-label">North Star</div><div className="sfm-value">[metric name]</div></div>
    <div className="sfm-item"><div className="sfm-label">Target</div><div className="sfm-value">[target]</div></div>
  </div>
</div>
```

---

### Section 6 — Wireframes / Prototype (`id="wireframes"`)

Contains: wireframe image gallery (lightbox on click), prototype CTA card with link.

```jsx
// Lightbox state
const [lightboxSrc, setLightboxSrc] = useState(null);

// Image grid
<div className="wireframe-gallery">
  {wireframes.map((src, i) => (
    <div key={i} className="wf-thumb" onClick={() => setLightboxSrc(src)}>
      <img src={src} alt={`Wireframe ${i+1}`} />
    </div>
  ))}
</div>

// Lightbox overlay
{lightboxSrc && (
  <div className="lightbox" onClick={() => setLightboxSrc(null)}>
    <img src={lightboxSrc} alt="Full size wireframe" />
  </div>
)}
```

```css
.wireframe-gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }
.wf-thumb { border-radius: var(--radius-md); overflow: hidden; cursor: zoom-in; border: 1px solid var(--border-light); box-shadow: var(--shadow-sm); transition: transform 0.2s, box-shadow 0.2s; }
.wf-thumb:hover { transform: scale(1.02); box-shadow: var(--shadow-purple); }
.wf-thumb img { width: 100%; display: block; }
.lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; z-index: 1000; cursor: zoom-out; }
.lightbox img { max-width: 90vw; max-height: 90vh; border-radius: var(--radius-md); }
```

#### Prototype CTA card
```jsx
<div className="prototype-cta">
  <h3>Want to explore the prototype?</h3>
  <p>[Brief description of what the prototype demonstrates]</p>
  <a href="[figma/lovable URL]" target="_blank" className="btn-cta">
    Launch Interactive Prototype ↗
  </a>
</div>
```

```css
.prototype-cta {
  background: var(--primary-gradient);
  color: white;
  border-radius: var(--radius-lg);
  padding: 4rem;
  text-align: center;
  margin-top: 3rem;
}
.btn-cta {
  display: inline-block;
  background: white;
  color: var(--primary-purple);
  padding: 1rem 2.5rem;
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-weight: 700;
  margin-top: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-cta:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
```

---

### Section 7 — PRD (`id="prd"`)

Contains: an expandable inline PRD panel (accordion) with structured subsections, or a modal/drawer triggered by a button.

#### Accordion PRD pattern
```jsx
const [isPrdOpen, setIsPrdOpen] = useState(false);

<div className="prd-container">
  <button className="prd-toggle" onClick={() => setIsPrdOpen(prev => !prev)}>
    {isPrdOpen ? '▼' : '▶'} View Full PRD
  </button>
  {isPrdOpen && (
    <div className="prd-body">
      <h3>1. Overview</h3>
      <p>[problem statement + one-liner]</p>
      <h3>2. Goals & Success Metrics</h3>
      [table or list]
      <h3>3. User Stories</h3>
      [list]
      <h3>4. Feature Requirements</h3>
      [list]
      <h3>5. Out of Scope</h3>
      [list]
      <h3>6. Risks & Mitigations</h3>
      [accordion using openRisks state]
    </div>
  )}
</div>
```

#### Risk accordion within PRD
```jsx
const [openRisks, setOpenRisks] = useState({});
const toggleRisk = (num) => setOpenRisks(prev => ({ ...prev, [num]: !prev[num] }));

<div className="risk-item" onClick={() => toggleRisk(1)}>
  <div className="risk-header">
    <span className="risk-badge high">High</span>
    <span className="risk-title">[Risk name]</span>
    <span className="risk-chevron">{openRisks[1] ? '▲' : '▼'}</span>
  </div>
  {openRisks[1] && (
    <div className="risk-body">
      <p><strong>Impact:</strong> [description]</p>
      <p><strong>Mitigation:</strong> [description]</p>
    </div>
  )}
</div>
```

---

## 4. Navigation "Next Section" Button

Each section except the last ends with a centered next-section CTA:

```jsx
<div style={{ textAlign:'center', marginTop:'4rem' }}>
  <a href="#[next-section-id]" className="next-section-btn">
    Next ➔ [Next Section Name]
  </a>
</div>
```

```css
.next-section-btn {
  display: inline-block;
  background: var(--primary-tint);
  color: var(--primary-purple);
  border: 1px solid var(--border-purple);
  padding: 1rem 2.5rem;
  border-radius: 30px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
}
.next-section-btn:hover {
  background: var(--primary-gradient);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: var(--shadow-purple);
}
```

---

## 5. Responsive Breakpoints

```css
@media (max-width: 1024px) {
  .hero-grid { grid-template-columns: 1fr; }
  .mobile-mockup { display: none; } /* hide phone on small screens */
  .persona-grid { grid-template-columns: repeat(2, 1fr); }
  .affinity-themes { grid-template-columns: repeat(2, 1fr); }
  .pif-cards, .ice-cards { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .container { padding: 0 1.25rem; }
  .section { padding: 4rem 0; }
  .persona-grid { grid-template-columns: 1fr; }
  .insight-card { flex-direction: column; }
  .insight-quote { border-left: none; border-top: 1px solid var(--border-light); }
  .navbar { overflow-x: auto; justify-content: flex-start; padding: 1rem 1.25rem; }
  .nav-links { flex-wrap: nowrap; }
}
```

---

## 6. Package Files

### `package.json`
```json
{
  "name": "pm-casestudy",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^5.4.14"
  }
}
```

### `vite.config.js`
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

### `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[Product Name] — [Case Study Headline] | [Author Name]</title>
  <meta name="description" content="[2-sentence SEO description of the case study]" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

### `src/main.jsx`
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 7. Full Content Prompt Template

When generating a case study for a new product, ask the user for (or extract from their provided content):

```
PRODUCT NAME: [e.g. "Swiggy", "Notion", "Zepto"]
CASE STUDY TITLE: [one-line descriptive headline]
AUTHOR NAME: [full name]
AUTHOR EMAIL: [email]
AUTHOR LINKEDIN: [URL]
PUBLISHED DATE: [date]
READ TIME: [N mins]
DEMO VIDEO/IMAGE: [filename or "none"]

--- SECTION 1: PRODUCT OVERVIEW ---
What is this product? [2–3 sentences]
Business model (B2C revenue streams): [list]
Business model (B2B revenue streams): [list]
How the product makes money (4 numbered points): [list]
Strategic focus / ambition (paragraph): [text]
Competitors to compare (3 columns): [names + comparison dimensions]
User segments / personas (3 types with names, ages, traits): [list]

--- SECTION 2: DISCOVERY PHASE ---
Initial hypotheses (3 cards before research): [list of 01/02/03 observations]
Research method (how many interviews, surveys): [numbers]
Who was interviewed (5 participants, names, roles): [list]
JTBD statements (per participant): [When/I want to/So I can for each]
Key insights from interviews (5 insights with quote): [list]
Affinity themes (4 categories, sticky notes per category): [list]
Prioritized pain points (5 items, severity %, frequency %): [list]
Key takeaways (2 bullets): [text]

--- SECTION 3: WHICH PROBLEM TO SOLVE ---
PIF matrix rows (5 problems, pain/impact/freq/score): [table data]
PIF takeaway: [text]
Selected problems (2–3 problems chosen): [list]
For each selected problem: early design description, final design description

--- SECTION 4: USER JOURNEY MAPPING ---
Journey stages (6–8 stages): [name, description, emotion%, emoji, is_critical, annotation]
Moment of friction highlight: [stage name + reason]

--- SECTION 5: SOLUTION SPACE ---
ICE framework definitions (Impact / Confidence / Ease): [text]
ICE scoring table (5–8 solutions, scores): [table]
Selected solution: [name + why chosen]
Solution features (2–3 features with mechanism, user actions, metrics): [list]

--- SECTION 6: WIREFRAMES ---
Wireframe image paths (if any): [list or "none"]
Prototype URL: [URL or "none"]
Prototype description: [1–2 sentences]

--- SECTION 7: PRD ---
Problem statement: [one-liner]
Goals (3 items): [list]
Success metrics (North Star + guardrails): [list]
User stories (5–8 stories): [As a ... I want ... So that ...]
Feature requirements (list): [list]
Out of scope (list): [list]
Risks (3–5 risks with impact + mitigation): [list]
```

---

## 8. Theme Customization Reference

| Setting | Variable to change | Default |
|---|---|---|
| Accent color | `--primary-purple` | `#8B5CF6` |
| Accent dark | `--primary-hover` | `#7C3AED` |
| Gradient start | first stop in `--primary-gradient` | `#8B5CF6` |
| Gradient end | second stop in `--primary-gradient` | `#6D28D9` |
| Border tint | `--border-purple` | `rgba(139,92,246,0.3)` |
| Shadow tint | `--shadow-purple` | `rgba(139,92,246,0.15)` |
| Tint bg | `--primary-tint` | `rgba(139,92,246,0.05)` |

**Example: Switch to Teal theme**
```css
--primary-purple: #14B8A6;
--primary-hover: #0D9488;
--primary-tint: rgba(20,184,166,0.05);
--primary-gradient: linear-gradient(135deg, #14B8A6 0%, #0D9488 100%);
--border-purple: rgba(20,184,166,0.3);
--shadow-purple: 0 8px 32px rgba(20,184,166,0.15);
```

---

## 9. Quick Execution Checklist

When executing this skill to build a page:

- [ ] Run `npm create vite@latest ./ -- --template react` in an empty project dir
- [ ] Replace `src/index.css` with the full design system CSS (all tokens + all component classes from this skill)
- [ ] Replace `src/App.jsx` with the full page (all sections, fill in provided content)
- [ ] Add video/image assets to `public/` if provided
- [ ] Update `index.html` with correct `<title>` and `<meta name="description">`
- [ ] Run `npm install && npm run dev` to verify
- [ ] Test light/dark toggle
- [ ] Test sticky nav active states on scroll
- [ ] Test problem tabs and risk accordions
- [ ] Verify mobile responsiveness at 768px

---

## 10. Key Principles (Do's and Don'ts)

**DO:**
- Always include the light/dark theme toggle — it's a key feature.
- Always use `var(--primary-purple)` instead of hardcoded color values — keeps theming consistent.
- Always animate micro-interactions: `transform: translateY(-5px)` on card hover, `transform: scale(0.97)` on card active.
- Always use glassmorphic navbar: `backdrop-filter: blur(24px) saturate(180%)`.
- Always use `clamp()` for fluid typography on headings.
- Always include a "Next ➔ [Section]" button at the bottom of each section.
- Always use initials (e.g. "SJ") inside `persona-icon` instead of placeholder images.
- Always persist theme to `localStorage`.

**DON'T:**
- Don't use Tailwind — all styling is vanilla CSS with custom properties.
- Don't use a fixed nav height — use `padding` on `.navbar` only.
- Don't use flat color backgrounds for sections — alternate `--bg-main` and `--bg-secondary`.
- Don't use `<img>` placeholders with broken paths — use CSS-generated initials or colored divs.
- Don't skip the hero phone mockup — if no video, use a CSS-only mockup with `mockup-header` and `mockup-body` divs inside.
- Don't forget `scroll-behavior: smooth` on `html`.
