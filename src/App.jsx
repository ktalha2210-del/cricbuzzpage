import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  
  // Interactive state for tabs and PRD
  const [activeJourneyTab, setActiveJourneyTab] = useState('tab1');
  const [activeSolutionTab, setActiveSolutionTab] = useState('analyst');
  const [previewImage, setPreviewImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isPrdOpen, setIsPrdOpen] = useState(false);
  const [isPrdModalOpen, setIsPrdModalOpen] = useState(false);
  const [openRisks, setOpenRisks] = useState({});

  const openPreview = (src, alt) => {
    setPreviewImage({ src, alt });
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };
  const closePreview = () => {
    setPreviewImage(null);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setPanStart({ x: panOffset.x, y: panOffset.y });
  };
  const handleDragMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setPanOffset({ x: panStart.x + dx, y: panStart.y + dy });
  };
  const handleDragEnd = () => setIsDragging(false);

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Scroll listener for active nav link
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = 'hero';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleRisk = (id) => {
    setOpenRisks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="app-root">
      {/* Global Glassmorphic Navbar */}
      <nav className="navbar">
        <a href="#hero" className="nav-brand">
          <span>Cricbuzz</span>
          <span className="nav-brand-tag">PM CASE STUDY</span>
        </a>
        <ul className="nav-links">
          {[
            ['overview', 'Overview'],
            ['discovery', 'Research & Discovery'],
            ['problem', 'Problem Space'],
            ['journey', 'User Journey'],
            ['solution', 'Solutions'],
            ['wireframes', 'Prototype'],
            ['prd', 'PRD'],
          ].map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeSection === id ? 'active' : ''}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-tag">Product Management Case Study</span>
            <h1 className="hero-title">
              <span>Cricbuzz AI Analyst:</span><br />
              Turning Cricket Data into Direct Answers
            </h1>
            <p className="hero-desc">
              Cricbuzz possesses vast amounts of cricket data, while modern AI tools excel at answering natural-language questions. This case study explores how Cricbuzz can transition from a raw data repository into an AI-powered intelligence companion.
            </p>
            <div className="meta-grid">
              <div className="meta-card">
                <div className="meta-label">Published Date</div>
                <div className="meta-value">22 August 2026</div>
              </div>
              <div className="meta-card">
                <div className="meta-label">Read Time</div>
                <div className="meta-value">~6 Mins</div>
              </div>
              <div className="meta-card">
                <div className="meta-label">Made By</div>
                <div className="meta-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Talha Khan
                  <a
                    href="https://linkedin.com/in/talha-khan-54b716269"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '4px' }}>
                      <rect width="24" height="24" rx="4" fill="#0A66C2"/>
                      <path d="M7.5 9.5H5V18.5H7.5V9.5Z" fill="white"/>
                      <circle cx="6.25" cy="6.75" r="1.5" fill="white"/>
                      <path d="M18.5 13C18.5 11.067 17.067 9.5 15.25 9.5C14.284 9.5 13.416 9.916 12.8 10.586V9.5H10.5V18.5H12.8V13.75C12.8 12.783 13.533 12 14.5 12C15.467 12 16 12.783 16 13.75V18.5H18.5V13Z" fill="white"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="meta-card">
                <div className="meta-label">Contact Me</div>
                <div className="meta-value">
                  <a
                    href="mailto:ktalha2210@gmail.com"
                    style={{ color: '#8B5CF6', textDecoration: 'none', fontWeight: '800', fontSize: '1.05rem', wordBreak: 'break-all' }}
                  >
                    ktalha2210@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tilted CSS 3D Mobile Phone Mockup with Looping Video */}
          <div className="mockup-wrapper">
            <div className="mobile-mockup">
              <video
                src="/prototype_demo.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  position: 'absolute',
                  inset: 0,
                  zIndex: 1
                }}
              ></video>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 - Product Overview */}
      <section className="section bg-alt" id="overview">
        <div className="container">
          <h2 className="section-title">01. Product Overview</h2>
          <p className="section-subtitle">
            Cricbuzz is a cricket-focused digital platform built for cricket fans. It allows users to follow live matches, check live scores and ball-by-ball commentary, read cricket news, watch videos, and explore player and team information.
          </p>

          <div className="info-card" style={{ borderLeft: '6px solid var(--primary-purple)', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--primary-purple)' }}>
              Data Breadth & Strategic Opportunity
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Beyond live matches, Cricbuzz also provides player statistics, rankings, records, match schedules, results, tournaments, and historical cricket information. Its key strength is the large amount of cricket data available in one place, creating an opportunity to help users not only find information but also understand it.
            </p>
          </div>

          {/* Competitor Matrix Table */}
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '2.5rem 0 1rem' }}>
            Competitive Landscape Analysis
          </h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>Data Depth</th>
                  <th>Live Match Experience</th>
                  <th>Natural Language Questions</th>
                  <th>Data Interpretation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="highlight-row">
                  <td><strong>Cricbuzz (Current)</strong></td>
                  <td>Very High</td>
                  <td>Industry Leader</td>
                  <td>Limited / Keyword-based</td>
                  <td>Manual by User</td>
                </tr>
                <tr>
                  <td>ESPNcricinfo</td>
                  <td>Very High</td>
                  <td>Strong</td>
                  <td>Basic Filters</td>
                  <td>Manual by User</td>
                </tr>
                <tr>
                  <td>Google Sports</td>
                  <td>Medium</td>
                  <td>Quick Card Summaries</td>
                  <td>Keyword Search</td>
                  <td>Basic Summaries</td>
                </tr>
                <tr>
                  <td>ChatGPT / Gemini</td>
                  <td>Variable / Unverified</td>
                  <td>No Live Context</td>
                  <td>Industry Leader</td>
                  <td>Automated & Direct</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Business Model - How Cricbuzz Makes Money */}
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '3rem 0 1rem' }}>
            Business Model - How Cricbuzz Makes Money
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
            Cricbuzz follows a content and engagement-driven business model. Its large cricket audience creates value through advertising, while premium offerings provide an additional subscription revenue stream. Cricbuzz also offers advertising opportunities to brands looking to reach cricket fans.
          </p>

          <h4 style={{ fontSize: '1.15rem', fontWeight: '800', margin: '1.5rem 0 1rem', color: 'var(--primary-purple)' }}>
            Main Revenue Streams
          </h4>
          <div className="info-card-grid" style={{ marginBottom: '1.5rem' }}>
            <div className="info-card">
              <h4 style={{ fontWeight: '800', marginBottom: '0.5rem' }}>Advertising</h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Display ads, video ads, sponsorships, and brand campaigns targeted at Cricbuzz's large cricket audience.
              </p>
            </div>
            <div className="info-card">
              <h4 style={{ fontWeight: '800', marginBottom: '0.5rem' }}>Premium Subscriptions</h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Paid plans provide access to premium experiences such as exclusive live cricket coverage, highlights, replays, premium content, and an ad-free experience in supported regions.
              </p>
            </div>
            <div className="info-card">
              <h4 style={{ fontWeight: '800', marginBottom: '0.5rem' }}>Premium Content</h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Exclusive editorials, videos, analysis, interviews, and other cricket-focused content can be offered as part of paid plans.
              </p>
            </div>
          </div>

          <div className="takeaway-box" style={{ padding: '1.5rem 2rem', margin: '1.5rem 0 3rem', background: 'var(--bg-main)' }}>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--primary-purple)', fontWeight: '800', marginBottom: '0.35rem' }}>
              Simple Business Model
            </h4>
            <p style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)' }}>
              Large cricket audience &rarr; High engagement &rarr; Advertising revenue + Premium subscriptions.
            </p>
          </div>

          {/* User Personas */}
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '3rem 0 1.5rem' }}>
            User Segments & Personas
          </h3>
          <div className="persona-grid">
            <div className="persona-card">
              <div className="persona-icon">CE</div>
              <h4 className="persona-name">Cricket Enthusiast</h4>
              <div className="persona-tag">Age 27 • Frequent User</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Loves debating cricket stats with friends. Looks at runs, averages, strike rates, recent form, and performance against specific opposition.
              </p>
              <div className="persona-quote">
                "Give me the information and help me understand it without making me dig through multiple pages."
              </div>
            </div>

            <div className="persona-card">
              <div className="persona-icon">LM</div>
              <h4 className="persona-name">Live Match Follower</h4>
              <div className="persona-tag">Age 24 • High During Matches</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Follows live games closely. Wants fast contextual lookups on recent form or head-to-head records during key match moments.
              </p>
              <div className="persona-quote">
                "Help me understand what is happening without making me leave the app to search for everything."
              </div>
            </div>

            <div className="persona-card">
              <div className="persona-icon">CF</div>
              <h4 className="persona-name">Casual Cricket Fan</h4>
              <div className="persona-tag">Age 23 • Occasional User</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Follows major tournaments. Finds dense statistical tables overwhelming and prefers simple, natural-language explanations.
              </p>
              <div className="persona-quote">
                "Don't just show me raw tables of numbers. Explain to me what they actually mean."
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <a href="#discovery" className="next-section-btn">
              Next: 02 Research & Discovery
            </a>
          </div>
        </div>
      </section>

      {/* Section 2 - Discovery Phase */}
      <section className="section" id="discovery">
        <div className="container">
          <h2 className="section-title">02. Discovery & Research Phase</h2>

          {/* Research Methodology */}
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '1rem 0 1rem' }}>
            Research Methodology & Execution
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            To validate these exploration findings, a research study was conducted using two core frameworks:
          </p>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">3</div>
              <div className="stat-title">In-Depth User Interviews</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">10</div>
              <div className="stat-title">User Survey Responses</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">100%</div>
              <div className="stat-title">Product Audit Coverage</div>
            </div>
          </div>

          <div className="info-card-grid" style={{ marginBottom: '2.5rem' }}>
            <div className="info-card">
              <h4 style={{ color: 'var(--primary-purple)', fontWeight: '800', marginBottom: '0.5rem' }}>
                1. The Mom Test Framework
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Focused on past behaviors rather than hypothetical opinions. Asked non-leading questions such as: <em>"Tell me about the last time you searched for cricket statistics," "What did you do when you couldn't find the answer?"</em> and <em>"What makes you trust a cricket statistic?"</em>
              </p>
            </div>
            <div className="info-card">
              <h4 style={{ color: 'var(--primary-purple)', fontWeight: '800', marginBottom: '0.5rem' }}>
                2. Jobs-To-Be-Done (JTBD)
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Uncovered underlying motivations. For instance, searching <em>"Kohli vs Babar"</em> wasn't just a statistical search—the underlying job was <em>"I want to compare two players to settle a debate with my friends."</em>
              </p>
            </div>
          </div>

          {/* User Interview Synthesis */}
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '3rem 0 1.5rem' }}>
            Interview Synthesis & Findings
          </h3>

          <div className="insight-card">
            <div className="insight-left">
              <div className="insight-freq">Interview 1 • Regular Cricket Follower (Age 24)</div>
              <h4 className="insight-title">Data is present, but analysis requires manual work</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Regularly checks live scores, scorecards, and player stats during matches. When comparing players (runs, average, strike rate, form), he finds the data on Cricbuzz, but understanding what the numbers mean takes significant mental effort. For complex questions, he uses Google or AI.
              </p>
            </div>
            <div className="insight-quote">
              "Cricbuzz gives me all the raw data, but I still have to do all the analysis and mental math myself."
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-left">
              <div className="insight-freq">Interview 2 • Cricket Enthusiast (Age 27)</div>
              <h4 className="insight-title">Users think in natural questions, not database fields</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Uses statistics to back up opinions in discussions. Typical questions include <em>"Who performs better under pressure?"</em> or <em>"How does a player perform against a specific team?"</em> Existing product forces him to break one question into multiple sub-searches across player profiles.
              </p>
            </div>
            <div className="insight-quote">
              "I think in questions like 'Who is better between these two?', but the app makes me perform 5 separate searches to find out."
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-left">
              <div className="insight-freq">Interview Finding • Player & Team Discovery Scope</div>
              <h4 className="insight-title">Discovery is restricted to current or active match weeks</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Users raised a major frustration regarding player/team lookup: stats are primarily discoverable only for players or teams playing in current, previous, or upcoming match weeks. Looking up retired legends or inactive teams has no clear, direct discovery path.
              </p>
            </div>
            <div className="insight-quote">
              "Why can't I just search any player or any team? Right now I can only view stats for players active this week or next week. If I want to search a retired player, there is no way I can search and view their records."
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-left">
              <div className="insight-freq">Interview 3 • Casual Cricket Fan (Age 23)</div>
              <h4 className="insight-title">Casual fans want clear explanations over static tables</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Follows major tournaments and wants simple explanations like <em>"Why did this player perform poorly today?"</em> or <em>"Who was the key player in this match and why?"</em> She finds dense statistical tables intimidating and prefers concise insights.
              </p>
            </div>
            <div className="insight-quote">
              "I don't want more tables of numbers. I just want someone to explain what the numbers mean."
            </div>
          </div>

          {/* 5 Core User Jobs */}
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '3rem 0 1.5rem' }}>
            Identified Jobs-To-Be-Done (JTBD)
          </h3>

          {[
            {
              job: 'Job 1: Find Information',
              when: 'I want information about a player or team',
              want: 'find it quickly without searching through multiple nested pages',
              so: 'I can access historical data immediately regardless of current live matches.',
            },
            {
              job: 'Job 2: Understand Performance',
              when: 'I see a player\'s statistical profile',
              want: 'understand what the numbers actually say about their form and capabilities',
              so: 'I can evaluate their actual impact beyond raw averages.',
            },
            {
              job: 'Job 3: Compare Players',
              when: 'I want to compare two players side-by-side',
              want: 'the key statistical differences highlighted automatically',
              so: 'I can settle debates or make informed fantasy cricket selections.',
            },
            {
              job: 'Job 4: Answer Specific Questions',
              when: 'I have a complex, specific cricket question',
              want: 'a direct, natural-language answer with supporting proof',
              so: 'I don\'t have to leave Cricbuzz for general AI tools.',
            },
            {
              job: 'Job 5: Understand Match Context',
              when: 'A major match event or result occurs',
              want: 'quickly understand why it happened and what key records were broken',
              so: 'I stay informed on crucial match narratives.',
            },
          ].map(({ job, when, want, so }, idx) => (
            <div className="jtbd-card" key={idx}>
              <div className="jtbd-row" style={{ background: 'var(--primary-tint)' }}>
                <div className="jtbd-label">{job}</div>
                <div className="jtbd-text" style={{ fontWeight: '700', color: 'var(--primary-purple)' }}>
                  Core User Job Summary
                </div>
              </div>
              <div className="jtbd-row">
                <div className="jtbd-label">SITUATION</div>
                <div className="jtbd-text">When {when}...</div>
              </div>
              <div className="jtbd-row">
                <div className="jtbd-label">MOTIVATION</div>
                <div className="jtbd-text">I want to {want}...</div>
              </div>
              <div className="jtbd-row">
                <div className="jtbd-label">OUTCOME</div>
                <div className="jtbd-text">So I can {so}</div>
              </div>
            </div>
          ))}

          {/* Initial Product Exploration - Major Friction Points */}
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '3rem 0 1.5rem' }}>
            Initial Product Exploration & Major Friction Points
          </h3>
          <div className="info-card-grid" style={{ marginBottom: '2.5rem' }}>
            <div className="info-card" style={{ borderLeft: '4px solid #EF4444' }}>
              <span className="badge critical" style={{ marginBottom: '0.85rem', color: '#DC2626', background: '#FEF2F2', border: '1px solid #FCA5A5' }}>
                PROBLEM 1
              </span>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.65rem' }}>
                Player & Team Discovery Tied to Current Matches
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                <strong>Current Journey:</strong> Open App → Find Match → Match Details → Squad → Player → Insights.<br />
                Discovery is restricted to current or upcoming match weeks. If a player (like Virat Kohli) isn't playing in a live match, or if a user wants to search for a retired legend or inactive team (<em>"Why can't I just search any player or team?"</em>), there is no direct search route to view their records. Users shouldn't have to wait for an active match to look up statistics.
              </p>
            </div>

            <div className="info-card" style={{ borderLeft: '4px solid #F59E0B' }}>
              <span className="badge medium" style={{ marginBottom: '0.85rem', color: '#D97706', background: '#FFFBEB', border: '1px solid #FCD34D' }}>
                PROBLEM 2
              </span>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.65rem' }}>
                Stats Provided, But Not Insights
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                When users have a specific question (e.g. <em>"How much did Rohit Sharma score against Sri Lanka in an ODI in 2019?"</em>), the data exists, but users must manually navigate stats archives to calculate or find the answer.
              </p>
            </div>

            <div className="info-card" style={{ borderLeft: '4px solid #EF4444' }}>
              <span className="badge critical" style={{ marginBottom: '0.85rem', color: '#DC2626', background: '#FEF2F2', border: '1px solid #FCA5A5' }}>
                PROBLEM 3
              </span>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.65rem' }}>
                Offboarding to External AI Tools
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                To compare two players, settle debates, or answer historical questions (e.g. <em>"Kohli runs vs Pakistan in 2023 WC"</em>), users abandon Cricbuzz to ask ChatGPT or Google, risking user retention.
              </p>
            </div>
          </div>

          {/* Key Discovery Insight Callout Box */}
          <div className="takeaway-box">
            <h3>The Key Discovery Insight</h3>
            <p style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Users don't search for statistics. They search for answers.
            </p>
            <ul>
              <li>Users want cricket data to compare players, understand performance, settle debates, build fantasy teams, and comprehend match outcomes.</li>
              <li>The real job is not <em>"Give me data."</em> It is <strong>"Help me answer my cricket question."</strong></li>
              <li>This fundamental shift redefined the entire product direction.</li>
            </ul>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <a href="#problem" className="next-section-btn">
              Next: 03 Problem Space & PIF
            </a>
          </div>
        </div>
      </section>

      {/* Section 3 - Which Problem to Solve */}
      <section className="section bg-alt" id="problem">
        <div className="container">
          <h2 className="section-title">03. Problem Definition & PIF Prioritization</h2>
          <p className="section-subtitle">
            Synthesizing research into a definitive problem statement, followed by evaluating candidate problems using the PIF (Pain, Impact, Frequency) Framework.
          </p>

          <div className="info-card" style={{ borderLeft: '6px solid var(--primary-purple)', marginBottom: '3rem' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800', color: 'var(--primary-purple)', fontSize: '0.85rem' }}>
              Core Problem Statement
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0.5rem 0' }}>
              Cricbuzz has a large amount of cricket data, but users still have to do too much work to turn that data into an answer.
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.75rem' }}>
              <strong>From Old Journey:</strong> Search → Navigate → Find statistics → Compare → Interpret<br />
              <strong>To New Vision:</strong> Ask a question → Get relevant cricket data → Understand the answer instantly.
            </p>
          </div>

          {/* PIF Framework Explanation */}
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '2.5rem 0 1rem' }}>
            PIF Prioritization Framework
          </h3>
          <div className="pif-cards">
            <div className="pif-card">
              <div className="pif-card-icon">P</div>
              <h4>Pain</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                How frustrating is the current friction point for the user?
              </p>
            </div>
            <div className="pif-card">
              <div className="pif-card-icon">I</div>
              <h4>Impact</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                How significant is solving this for core engagement & retention?
              </p>
            </div>
            <div className="pif-card">
              <div className="pif-card-icon">F</div>
              <h4>Frequency</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                How often do users encounter this problem in a typical session?
              </p>
            </div>
          </div>

          <div className="pif-formula">
            <div className="pif-formula-badge">
              PIF Score = Pain (1-5) × Impact (1-5) × Frequency (1-5)
            </div>
          </div>

          {/* PIF Table */}
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Identified Problem Area</th>
                  <th>Pain</th>
                  <th>Impact</th>
                  <th>Frequency</th>
                  <th>PIF Score</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <tr className="highlight-row">
                  <td><strong>Data vs Insight Gap (Turning stats into answers)</strong></td>
                  <td>
                    <div className="score-chips">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div key={n} className={`score-chip ${n <= 5 ? 'filled' : ''}`} />
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="score-chips">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div key={n} className={`score-chip ${n <= 5 ? 'filled' : ''}`} />
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="score-chips">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div key={n} className={`score-chip ${n <= 4 ? 'filled' : ''}`} />
                      ))}
                    </div>
                  </td>
                  <td><span className="pif-score-badge">100</span></td>
                  <td><span className="badge critical">Critical</span></td>
                </tr>

                <tr>
                  <td><strong>External AI Offboarding Risk</strong></td>
                  <td>
                    <div className="score-chips">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div key={n} className={`score-chip ${n <= 4 ? 'filled' : ''}`} />
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="score-chips">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div key={n} className={`score-chip ${n <= 5 ? 'filled' : ''}`} />
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="score-chips">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div key={n} className={`score-chip ${n <= 4 ? 'filled' : ''}`} />
                      ))}
                    </div>
                  </td>
                  <td><span className="pif-score-badge">80</span></td>
                  <td><span className="badge high">High</span></td>
                </tr>

                <tr>
                  <td><strong>Player & Team Discovery Tied to Matches</strong></td>
                  <td>
                    <div className="score-chips">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div key={n} className={`score-chip ${n <= 4 ? 'filled' : ''}`} />
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="score-chips">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div key={n} className={`score-chip ${n <= 3 ? 'filled' : ''}`} />
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="score-chips">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div key={n} className={`score-chip ${n <= 4 ? 'filled' : ''}`} />
                      ))}
                    </div>
                  </td>
                  <td><span className="pif-score-badge">48</span></td>
                  <td><span className="badge medium">Medium</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <a href="#journey" className="next-section-btn">
              Next: 04 User Journey Mapping
            </a>
          </div>
        </div>
      </section>

      {/* Section 4 - User Journey Mapping */}
      <section className="section" id="journey">
        <div className="container">
          <h2 className="section-title">04. User Journey Mapping</h2>
          <p className="section-subtitle">
            User journey maps illustrating the friction points, emotional drop-offs, and user flows.
          </p>

          <div className="tab-container">
            <div className="tab-nav" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
              <button
                className={`tab-btn ${activeJourneyTab === 'tab1' ? 'active' : ''}`}
                onClick={() => setActiveJourneyTab('tab1')}
              >
                Data vs Insight Gap and External AI Offboarding Risk
              </button>
              <button
                className={`tab-btn ${activeJourneyTab === 'tab2' ? 'active' : ''}`}
                onClick={() => setActiveJourneyTab('tab2')}
              >
                Player search deadlock
              </button>
            </div>

            <div className="tab-panel" style={{ padding: '1.5rem', background: 'var(--bg-main)' }}>
              {activeJourneyTab === 'tab1' && (
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.25rem', color: 'var(--primary-purple)' }}>
                    Data vs Insight Gap and External AI Offboarding Risk
                  </h4>
                  <div
                    className="journey-img-container"
                    onClick={() => openPreview('/cricbuzzflow.png', 'Data vs Insight Gap and External AI Offboarding Risk')}
                  >
                    <img
                      src="/cricbuzzflow.png"
                      alt="Data vs Insight Gap and External AI Offboarding Risk"
                      className="journey-img"
                    />
                    <div className="journey-img-overlay">
                      <span className="preview-hint">Click to expand</span>
                    </div>
                  </div>
                </div>
              )}

              {activeJourneyTab === 'tab2' && (
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.25rem', color: 'var(--primary-purple)' }}>
                    Player search deadlock
                  </h4>
                  <div
                    className="journey-img-container"
                    onClick={() => openPreview('/player_search_deadlock.png', 'Player search deadlock')}
                  >
                    <img
                      src="/player_search_deadlock.png"
                      alt="Player search deadlock"
                      className="journey-img"
                    />
                    <div className="journey-img-overlay">
                      <span className="preview-hint">Click to expand</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <a href="#solution" className="next-section-btn">
              Next: 05 Solution Space & Prioritization
            </a>
          </div>
        </div>
      </section>

      {/* Section 5 - Solution Space & Prioritization */}
      <section className="section bg-alt" id="solution">
        <div className="container">
          <h2 className="section-title">05. Solution Space & Prioritization</h2>
          <p className="section-subtitle">
            After identifying the key problem areas, I explored multiple solutions before deciding on the final product direction.
          </p>

          {/* Solution Space Exploration Cards */}
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '2.5rem 0 1.25rem' }}>
            Solution Space Exploration
          </h3>

            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-purple)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge critical" style={{ background: 'var(--primary-tint)', color: 'var(--primary-purple)', border: '1px solid var(--border-purple)' }}>PROBLEM 1</span>
                Player & Team Discovery Tied to Active Matches
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: '0 0 1rem 0' }}>
                <strong>User Friction:</strong> Discovery is currently restricted to current or upcoming match weeks. Users cannot directly search for retired legends (e.g. MS Dhoni, Sachin Tendulkar) or inactive teams without active match links.
              </p>
            </div>
            <div className="info-card-grid" style={{ marginBottom: '2.5rem' }}>
              <div className="info-card" style={{ borderLeft: '4px solid var(--primary-purple)' }}>
                <span className="badge" style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', marginBottom: '0.5rem' }}>SOLUTION 1</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0.4rem 0' }}>Global Search</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  Allow users to directly search for any player, team, match, or historical entity.
                </p>
                <div style={{ fontSize: '0.85rem', background: 'var(--bg-main)', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-light)', color: 'var(--text-main)', fontWeight: '600' }}>
                  Key Benefit: Removes dependency on current or upcoming live matches for discovery.
                </div>
              </div>

              <div className="info-card" style={{ borderLeft: '4px solid #F59E0B' }}>
                <span className="badge" style={{ background: '#FFFBEB', color: '#D97706', border: '1px solid #FCD34D', marginBottom: '0.5rem' }}>SOLUTION 2</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0.4rem 0' }}>Explore / Browse Directory</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  Create a dedicated section where users can browse players and teams using structured filters.
                </p>
                <div style={{ fontSize: '0.85rem', background: 'var(--bg-main)', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>
                  Filters: Active / Retired, Country, Format, Era.
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-purple)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge critical" style={{ background: 'var(--primary-tint)', color: 'var(--primary-purple)', border: '1px solid var(--border-purple)' }}>PROBLEM 2</span>
                From Data to Answers (Data vs Insight Gap)
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: '0 0 1rem 0' }}>
                <strong>User Friction:</strong> Cricbuzz provides vast amounts of raw data tables, but users must manually calculate and analyze numbers themselves to turn data into actionable answers.
              </p>
            </div>
            <div className="info-card-grid" style={{ marginBottom: '2.5rem' }}>
              <div className="info-card" style={{ borderLeft: '4px solid var(--primary-purple)' }}>
                <span className="badge" style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', marginBottom: '0.5rem' }}>SOLUTION 1</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0.4rem 0' }}>AI Cricket Analyst</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                  Allow users to ask cricket questions in natural language and receive direct, data-backed answers instantly.
                </p>
              </div>

              <div className="info-card" style={{ borderLeft: '4px solid #3B82F6' }}>
                <span className="badge" style={{ background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', marginBottom: '0.5rem' }}>SOLUTION 2</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0.4rem 0' }}>Pre-Built Insights</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Show automatically generated insights on player, team, and match pages.
                </p>
                <ul style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.1rem' }}>
                  <li>Recent form & trends</li>
                  <li>Performance against specific teams</li>
                  <li>Strengths and weaknesses</li>
                </ul>
              </div>

              <div className="info-card" style={{ borderLeft: '4px solid #8B5CF6' }}>
                <span className="badge" style={{ background: '#F5F3FF', color: '#7C3AED', border: '1px solid #DDD6FE', marginBottom: '0.5rem' }}>SOLUTION 3</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0.4rem 0' }}>Smart Filters & Query Statistics</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Allow users to filter cricket statistics using multi-parameter selectors.
                </p>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Parameters: Opponent, Year, Format, Venue, Innings, Form.
                </div>
              </div>
            </div>

          {/* Prioritization & Key Insight Callout */}
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '3rem 0 1.25rem' }}>
            Prioritization & Strategic Synthesis
          </h3>
          
          <div className="info-card" style={{ borderLeft: '6px solid var(--primary-purple)', marginBottom: '2rem', padding: '1.75rem' }}>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800', color: 'var(--primary-purple)', marginBottom: '0.75rem' }}>
              Evaluation Framework
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <strong>1. Effectiveness</strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  How effectively does the solution solve the user problem?
                </p>
              </div>
              <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <strong>2. Experience & Scalability</strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  Does the solution create a simple and scalable experience?
                </p>
              </div>
            </div>

            <div style={{ background: 'var(--primary-tint)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-purple)' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-purple)', marginBottom: '0.5rem' }}>
                Key Prioritization Insight
              </h4>
              <p style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                Discovery and data interpretation are connected problems.
              </p>
              <ul style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', paddingLeft: '1.25rem', lineHeight: '1.6' }}>
                <li>A <strong>Global Search</strong> helps users find a player or team, but it does not help users answer complex questions.</li>
                <li>An <strong>AI Analyst</strong> can answer complex questions, but users still need an easy way to discover players, teams, and historical matches.</li>
                <li><strong>Strategic Decision:</strong> Instead of treating these as completely separate experiences, I decided to combine them.</li>
              </ul>
            </div>
          </div>

          {/* Final Solution: Global Search with Integrated AI */}
          <div className="takeaway-box" style={{ margin: '3rem 0', padding: '2rem' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800', color: 'var(--primary-purple)' }}>
              SELECTED DIRECTION
            </span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', margin: '0.5rem 0 1rem', color: 'var(--text-main)' }}>
              Final Solution: Global Search with Integrated AI
            </h3>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              The final product direction is a <strong>Global Search experience with integrated AI</strong>, supported by a dedicated <strong>Ask AI</strong> experience. This creates three connected ways for users to interact with cricket information.
            </p>

            <div className="info-card-grid" style={{ gap: '1.25rem' }}>
              <div className="info-card" style={{ background: 'var(--bg-main)', borderTop: '4px solid var(--primary-purple)' }}>
                <span className="badge low" style={{ marginBottom: '0.5rem' }}>WAY 1</span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.5rem' }}>1. Global Search</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  Direct search for players, teams, matches, or historical entities (e.g., <em>Virat Kohli, Sachin Tendulkar, RCB, India vs Pakistan 2022</em>).
                </p>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary-purple)', fontWeight: '700', background: 'var(--primary-tint)', padding: '0.5rem', borderRadius: '6px' }}>
                  Solves Discovery: Opens detail pages with existing Cricbuzz stats unlinked from live matches.
                </div>
              </div>

              <div className="info-card" style={{ background: 'var(--bg-main)', borderTop: '4px solid var(--primary-purple)' }}>
                <span className="badge low" style={{ marginBottom: '0.5rem' }}>WAY 2</span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.5rem' }}>2. Contextual Ask AI on Detail Pages</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  Detail pages provide stats plus an Ask AI option for deeper questions (e.g., <em>"How has he performed vs Australia?", "Strengths & weaknesses?", "2023 WC stats?"</em>).
                </p>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary-purple)', fontWeight: '700', background: 'var(--primary-tint)', padding: '0.5rem', borderRadius: '6px' }}>
                  Moves from viewing stats to understanding them using interactive AI interpretation.
                </div>
              </div>

              <div className="info-card" style={{ background: 'var(--bg-main)', borderTop: '4px solid var(--primary-purple)' }}>
                <span className="badge low" style={{ marginBottom: '0.5rem' }}>WAY 3</span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.5rem' }}>3. Ask AI as a Dedicated Experience</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  Global Search includes AI, plus a dedicated <strong>Ask AI tab in bottom navigation</strong> for broader questions (e.g., <em>"Highest ODI average chasing vs Australia?", "Compare Kohli & Rohit in WCs"</em>).
                </p>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary-purple)', fontWeight: '700', background: 'var(--primary-tint)', padding: '0.5rem', borderRadius: '6px' }}>
                  Direct question interface without needing to search for an entity first.
                </div>
              </div>
            </div>
          </div>

          {/* Why This Solution Was Selected */}
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '3rem 0 1.25rem' }}>
            Why This Solution Was Selected
          </h3>
          <div className="info-card-grid" style={{ marginBottom: '2rem' }}>
            <div className="info-card" style={{ borderLeft: '4px solid #10B981' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#059669', marginBottom: '0.35rem' }}>Global Search Solves:</h4>
              <p style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)' }}>
                "How do I find the player, team, or match I am looking for?"
              </p>
            </div>
            <div className="info-card" style={{ borderLeft: '4px solid #3B82F6' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#2563EB', marginBottom: '0.35rem' }}>Contextual AI Solves:</h4>
              <p style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)' }}>
                "I have found the information. Now help me understand it."
              </p>
            </div>
            <div className="info-card" style={{ borderLeft: '4px solid #8B5CF6' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#7C3AED', marginBottom: '0.35rem' }}>Ask AI Solves:</h4>
              <p style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)' }}>
                "I have a cricket question. Give me the answer directly."
              </p>
            </div>
          </div>

          <div className="info-card" style={{ background: 'var(--bg-main)', border: '1px solid var(--border-light)', marginBottom: '2.5rem', padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-purple)', marginBottom: '0.75rem' }}>
              Complete User Journeys Enabled
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'var(--primary-tint)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-purple)' }}>
                <strong style={{ color: 'var(--primary-purple)', fontSize: '0.85rem', textTransform: 'uppercase' }}>JOURNEY A: ENTITY SEARCH FIRST</strong>
                <p style={{ fontWeight: '700', fontSize: '0.95rem', marginTop: '0.35rem', color: 'var(--text-main)' }}>
                  Search for an entity &rarr; Explore existing stats &rarr; Ask a specific question &rarr; Get a data-backed answer
                </p>
              </div>
              <div style={{ background: 'var(--primary-tint)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-purple)' }}>
                <strong style={{ color: 'var(--primary-purple)', fontSize: '0.85rem', textTransform: 'uppercase' }}>JOURNEY B: DIRECT QUESTION FIRST</strong>
                <p style={{ fontWeight: '700', fontSize: '0.95rem', marginTop: '0.35rem', color: 'var(--text-main)' }}>
                  Ask AI &rarr; Get a data-backed answer &rarr; Explore the relevant cricket data
                </p>
              </div>
            </div>
          </div>

          {/* Final Product Experience */}
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '3rem 0 1.25rem' }}>
            Final Product Experience
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '1.25rem' }}>
            These are not three separate products. They are <strong>three entry points into one connected cricket discovery and insight experience.</strong>
          </p>
          <div className="info-card-grid" style={{ marginBottom: '2.5rem' }}>
            <div className="info-card" style={{ borderLeft: '4px solid var(--primary-purple)' }}>
              <span className="badge low" style={{ marginBottom: '0.5rem' }}>ENTRY POINT 1</span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.4rem' }}>Global Search</h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Search for any player, team, or match.
              </p>
            </div>
            <div className="info-card" style={{ borderLeft: '4px solid var(--primary-purple)' }}>
              <span className="badge low" style={{ marginBottom: '0.5rem' }}>ENTRY POINT 2</span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.4rem' }}>Detail Page AI</h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Ask questions about the player, team, or match currently being viewed.
              </p>
            </div>
            <div className="info-card" style={{ borderLeft: '4px solid var(--primary-purple)' }}>
              <span className="badge low" style={{ marginBottom: '0.5rem' }}>ENTRY POINT 3</span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.4rem' }}>Ask AI</h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Ask any broader cricket question directly from the app.
              </p>
            </div>
          </div>

          {/* The Product Shift Callout */}
          <div className="info-card" style={{ borderLeft: '6px solid var(--primary-purple)', background: 'var(--bg-main)', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary-purple)' }}>
              The Product Shift
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#FEF2F2', padding: '1.25rem', borderRadius: '8px', border: '1px solid #FCA5A5' }}>
                <span className="badge critical" style={{ marginBottom: '0.5rem', background: '#DC2626', color: '#FFF' }}>CURRENT EXPERIENCE</span>
                <p style={{ fontWeight: '700', fontSize: '0.95rem', color: '#991B1B', marginTop: '0.5rem', lineHeight: '1.6' }}>
                  Find a match &rarr; Find a player &rarr; Browse statistics &rarr; Compare data &rarr; Interpret the answer
                </p>
              </div>
              <div style={{ background: '#ECFDF5', padding: '1.25rem', borderRadius: '8px', border: '1px solid #6EE7B7' }}>
                <span className="badge" style={{ marginBottom: '0.5rem', background: '#059669', color: '#FFF' }}>PROPOSED EXPERIENCE</span>
                <p style={{ fontWeight: '700', fontSize: '0.95rem', color: '#065F46', marginTop: '0.5rem', lineHeight: '1.6' }}>
                  Search or Ask &rarr; Find the relevant information &rarr; Get a data-backed answer &rarr; Explore further
                </p>
              </div>
            </div>

            <div className="takeaway-box" style={{ margin: 0, padding: '1.5rem', background: 'var(--primary-tint)' }}>
              <p style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)', textAlign: 'center' }}>
                The final solution moves Cricbuzz from:<br />
                <span style={{ color: 'var(--text-muted)', fontWeight: '600', textDecoration: 'line-through' }}>"Help me find cricket data."</span><br />
                to:<br />
                <span style={{ color: 'var(--primary-purple)', fontSize: '1.3rem' }}>"Help me find and understand cricket information."</span>
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.75rem', textAlign: 'center', lineHeight: '1.6' }}>
                This direction was selected because it solves both the discovery problem and the data-to-insight problem while building on Cricbuzz's existing core strength: <strong>its large amount of cricket data.</strong>
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <a href="#wireframes" className="next-section-btn">
              Next: 06 Product Design & UI Experience
            </a>
          </div>
        </div>
      </section>

      {/* Section 6 - Product Design & UI Experience */}
      <section className="section" id="wireframes">
        <div className="container">
          <h2 className="section-title">06. Product Design & UI Experience</h2>
          <p className="section-subtitle">
            Interact with the high-fidelity prototype below to experience the Cricbuzz AI Analyst concept directly.
          </p>

          {/* Video Demo + Prototype Embed */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>

            {/* Label above phone */}
            <div style={{ textAlign: 'center' }}>
              <span className="badge low" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>INTERACTIVE PROTOTYPE</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Cricbuzz AI Analyst - Demo Walkthrough
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Scroll, tap, and interact with the prototype inside the phone.
              </p>
            </div>

            {/* Phone Mockup Frame with iframe */}
            <div className="proto-phone-frame">
              <div className="proto-phone-notch"></div>
              <div className="proto-phone-screen">
                <iframe
                  src="https://cricbuzz-insight-genius.lovable.app/"
                  title="Cricbuzz AI Analyst Prototype"
                  className="proto-iframe"
                  allow="fullscreen"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                ></iframe>
              </div>
              <div className="proto-phone-bar"></div>
            </div>

            {/* Open in full screen */}
            <a
              href="https://cricbuzz-insight-genius.lovable.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="next-section-btn"
              style={{ marginTop: '0.5rem' }}
            >
              Open Prototype in Full Screen
            </a>

          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <a href="#prd" className="next-section-btn">
              Next: 07 PRD & Success Metrics
            </a>
          </div>
        </div>
      </section>

      {/* Section 7 — PRD & Metrics */}
      <section className="section bg-alt" id="prd">
        <div className="container">
          <h2 className="section-title">07. PRD & Success Metrics</h2>
          <p className="section-subtitle">
            Comprehensive Product Requirements Document detailing goals, metrics, guardrails, risks, and expected outcomes.
          </p>

          {/* PRD Preview Card */}
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '16px',
            border: '1px solid var(--border-light)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-sm)',
            maxWidth: '860px',
            margin: '0 auto'
          }}>
            {/* Header info row */}
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '10px',
                background: 'var(--primary-tint)',
                border: '1px solid var(--border-purple)',
                color: 'var(--primary-purple)',
                fontWeight: '800',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                PRD
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.35rem 0', fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-main)' }}>
                  Cricbuzz AI Analyst - Product Requirements Document
                </h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5' }}>
                  Detailed PRD covering product vision, problem statement, user stories, functional requirements, success metrics, user flows, edge cases, and technical considerations.
                </p>
              </div>
            </div>

            {/* Document Preview Frame */}
            <div
              className="prd-preview-frame"
              onClick={() => setIsPrdModalOpen(true)}
              style={{
                border: '1px solid var(--border-light)',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#111',
                height: '420px',
                position: 'relative',
                cursor: 'pointer',
                boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.15)',
                margin: '2rem 0'
              }}
            >
              {/* Live PDF Preview (non-interactive) */}
              <iframe
                src="https://drive.google.com/file/d/1iM2S-8lu4KLpAqcv8_WouIs3hsWy21p7/preview"
                width="100%"
                height="100%"
                style={{ border: 'none', pointerEvents: 'none' }}
                title="PRD Preview"
              ></iframe>
              {/* Hover overlay with CTA button */}
              <div className="prd-hover-overlay">
                <span className="prd-hover-btn">Click to view full document</span>
              </div>
            </div>

            {/* Expand Action Button */}
            <button
              onClick={() => setIsPrdModalOpen(true)}
              style={{
                background: 'var(--primary-gradient)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '30px',
                width: '100%',
                padding: '1rem',
                fontWeight: '800',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-purple)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(5, 150, 105, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-purple)';
              }}
            >
              View Full PRD
            </button>
          </div>

          {/* Fullscreen PRD Lightbox Modal */}
          {isPrdModalOpen && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 999999,
                background: 'rgba(0, 0, 0, 0.88)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
              }}
              onClick={() => setIsPrdModalOpen(false)}
            >
              <div
                style={{
                  width: '100%',
                  maxWidth: '1080px',
                  height: '90vh',
                  background: 'var(--bg-main)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.65)',
                  border: '1px solid var(--border-light)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header bar */}
                <div style={{
                  padding: '1.25rem 2rem',
                  borderBottom: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'var(--bg-card)'
                }}>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>
                    Cricbuzz App - AI Analyst PRD
                  </h3>
                  <button
                    onClick={() => setIsPrdModalOpen(false)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'var(--primary-tint)',
                      border: '1px solid var(--border-purple)',
                      color: 'var(--primary-purple)',
                      fontSize: '1.1rem',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      lineHeight: 1
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'var(--primary-purple)';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.transform = 'rotate(90deg)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'var(--primary-tint)';
                      e.currentTarget.style.color = 'var(--primary-purple)';
                      e.currentTarget.style.transform = 'rotate(0)';
                    }}
                  >
                    &#x2715;
                  </button>
                </div>

                {/* PDF Google Drive Embed Iframe */}
                <div style={{ flex: 1, width: '100%', background: '#0D0D0D' }}>
                  <iframe
                    src="https://drive.google.com/file/d/1iM2S-8lu4KLpAqcv8_WouIs3hsWy21p7/preview"
                    width="100%"
                    height="100%"
                    style={{ border: 'none', display: 'block' }}
                    title="Cricbuzz AI Analyst PRD - Full Document"
                    allow="autoplay"
                  ></iframe>
                </div>
              </div>
            </div>
          )}

          {/* Final Case Study Narrative Summary */}
          <div className="takeaway-box" style={{ marginTop: '4rem' }}>
            <h3>Case Study Summary & Backbone</h3>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              <strong>Cricbuzz already had the data.</strong> Research proved that users think in questions, not database fields. When finding answers on Cricbuzz proved cumbersome, users turned to external AI tools. Through structured PIF and ICE prioritization, the <strong>Cricbuzz AI Analyst</strong> was created - unifying Global Search, Contextual Profile AI, and Ask AI into a seamless experience that transforms Cricbuzz from <em>"Help me find data"</em> to <strong>"Help me answer my cricket question."</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--bg-secondary)', padding: '3rem 0', borderTop: '1px solid var(--border-light)', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        <div className="container">
          <p style={{ fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Cricbuzz PM Case Study • Product Portfolio
          </p>
          <p>Built with React, Vite, & Vanilla CSS Custom Properties</p>
        </div>
      </footer>

      {/* Fullscreen Image Preview Lightbox Modal */}
      {previewImage && (
        <div
          className="image-modal-overlay"
          onClick={closePreview}
        >
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button className="image-modal-close" onClick={closePreview} aria-label="Close">
              &#x2715;
            </button>

            {/* Zoom controls */}
            <div className="image-modal-zoom-controls">
              <button
                className="zoom-btn"
                onClick={() => setZoomLevel(z => Math.max(0.5, parseFloat((z - 0.25).toFixed(2))))}
                aria-label="Zoom out"
                title="Zoom out"
              >
                &#x2212;
              </button>
              <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
              <button
                className="zoom-btn"
                onClick={() => setZoomLevel(z => Math.min(4, parseFloat((z + 0.25).toFixed(2))))}
                aria-label="Zoom in"
                title="Zoom in"
              >
                &#x2B;
              </button>
              <button
                className="zoom-btn"
                onClick={() => { setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); }}
                title="Reset zoom"
                style={{ fontSize: '0.7rem', padding: '0 0.6rem' }}
              >
                Reset
              </button>
            </div>

            {/* Draggable + Zoomable image wrapper */}
            <div
              className="image-modal-img-wrapper"
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
            >
              <img
                src={previewImage.src}
                alt={previewImage.alt}
                draggable={false}
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                  transition: isDragging ? 'none' : 'transform 0.2s ease',
                  userSelect: 'none',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
