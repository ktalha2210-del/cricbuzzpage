# Cricbuzz AI Analyst: Turning Cricket Data into Direct Answers
*A Product Management Case Study*

---

## 01. Product Overview & Business Model

### Overview
Cricbuzz is a cricket-focused digital platform built for cricket fans. It allows users to follow live matches, check live scores and ball-by-ball commentary, read cricket news, watch videos, and explore player and team information.

### Data Breadth & Strategic Opportunity
Beyond live matches, Cricbuzz also provides player statistics, rankings, records, match schedules, results, tournaments, and historical cricket information. Its key strength is the large amount of cricket data available in one place, creating an opportunity to help users not only find information but also understand it.

### Competitive Landscape Analysis

| Platform | Data Depth | Live Match Experience | Natural Language Questions | Data Interpretation |
| :--- | :--- | :--- | :--- | :--- |
| **Cricbuzz (Current)** | Very High | Industry Leader | Limited / Keyword-based | Manual by User |
| **ESPNcricinfo** | Very High | Strong | Basic Filters | Manual by User |
| **Google Sports** | Medium | Quick Card Summaries | Keyword Search | Basic Summaries |
| **ChatGPT / Gemini** | Variable / Unverified | No Live Context | Industry Leader | Automated & Direct |

### Business Model - How Cricbuzz Makes Money
Cricbuzz follows a content and engagement-driven business model. Its large cricket audience creates value through advertising, while premium offerings provide an additional subscription revenue stream. Cricbuzz also offers advertising opportunities to brands looking to reach cricket fans.

#### Main Revenue Streams
1. **Advertising:** Display ads, video ads, sponsorships, and brand campaigns targeted at Cricbuzz's large cricket audience.
2. **Premium Subscriptions:** Paid plans provide access to premium experiences such as exclusive live cricket coverage, highlights, replays, premium content, and an ad-free experience in supported regions.
3. **Premium Content:** Exclusive editorials, videos, analysis, interviews, and other cricket-focused content can be offered as part of paid plans.

**Simple Business Model:**
Large cricket audience → High engagement → Advertising revenue + Premium subscriptions.

---

### User Segments & Personas

#### 1. Cricket Enthusiast (CE) - Age 27 • Frequent User
* **Behavior:** Loves debating cricket stats with friends. Looks at runs, averages, strike rates, recent form, and performance against specific opposition.
* **Quote:** *"Give me the information and help me understand it without making me dig through multiple pages."*

#### 2. Live Match Follower (LM) - Age 24 • High During Matches
* **Behavior:** Follows live games closely. Wants fast contextual lookups on recent form or head-to-head records during key match moments.
* **Quote:** *"Help me understand what is happening without making me leave the app to search for everything."*

#### 3. Casual Cricket Fan (CF) - Age 23 • Occasional User
* **Behavior:** Follows major tournaments. Finds dense statistical tables overwhelming and prefers simple, natural-language explanations.
* **Quote:** *"Don't just show me raw tables of numbers. Explain to me what they actually mean."*

---

## 02. Discovery & Research Phase

### Research Methodology & Execution
To validate these exploration findings, a research study was conducted using two core frameworks:
* **The Mom Test Framework:** Focused on past behaviors rather than hypothetical opinions. Asked non-leading questions such as: *"Tell me about the last time you searched for cricket statistics,"* *"What did you do when you couldn't find the answer?"* and *"What makes you trust a cricket statistic?"*
* **Jobs-To-Be-Done (JTBD):** Uncovered underlying motivations. For instance, searching *"Kohli vs Babar"* wasn't just a statistical search—the underlying job was *"I want to compare two players to settle a debate with my friends."*

**Research Footprint:**
* 3 In-Depth User Interviews
* 10 User Survey Responses
* 100% Product Audit Coverage

### Interview Synthesis & Findings

* **Interview 1 - Regular Cricket Follower (Age 24):**
  * *Finding:* Data is present, but analysis requires manual work. Regularly checks live scores, scorecards, and player stats during matches. When comparing players (runs, average, strike rate, form), he finds the data on Cricbuzz, but understanding what the numbers mean takes significant mental effort. For complex questions, he uses Google or AI.
  * *Quote:* *"Cricbuzz gives me all the raw data, but I still have to do all the analysis and mental math myself."*

* **Interview 2 - Cricket Enthusiast (Age 27):**
  * *Finding:* Users think in natural questions, not database fields. Uses statistics to back up opinions in discussions. Typical questions include *"Who performs better under pressure?"* or *"How does a player perform against a specific team?"* Existing product forces him to break one question into multiple sub-searches across player profiles.
  * *Quote:* *"I think in questions like 'Who is better between these two?', but the app makes me perform 5 separate searches to find out."*

* **Interview Finding - Player & Team Discovery Scope:**
  * *Finding:* Discovery is restricted to current or active match weeks. Users raised a major frustration regarding player/team lookup: stats are primarily discoverable only for players or teams playing in current, previous, or upcoming match weeks. Looking up retired legends or inactive teams has no clear, direct discovery path.
  * *Quote:* *"Why can't I just search any player or any team? Right now I can only view stats for players active this week or next week. If I want to search a retired player, there is no way I can search and view their records."*

* **Interview 3 - Casual Cricket Fan (Age 23):**
  * *Finding:* Casual fans want clear explanations over static tables. Follows major tournaments and wants simple explanations like *"Why did this player perform poorly today?"* or *"Who was the key player in this match and why?"* She finds dense statistical tables intimidating and prefers concise insights.
  * *Quote:* *"I don't want more tables of numbers. I just want someone to explain what the numbers mean."*

---

### Identified Jobs-To-Be-Done (JTBD)

1. **Job 1: Find Information**
   * **Situation:** When I want information about a player or team,
   * **Motivation:** I want to find it quickly without searching through multiple nested pages,
   * **Outcome:** So I can access historical data immediately regardless of current live matches.
2. **Job 2: Understand Performance**
   * **Situation:** When I see a player's statistical profile,
   * **Motivation:** I want to understand what the numbers actually say about their form and capabilities,
   * **Outcome:** So I can evaluate their actual impact beyond raw averages.
3. **Job 3: Compare Players**
   * **Situation:** When I want to compare two players side-by-side,
   * **Motivation:** I want the key statistical differences highlighted automatically,
   * **Outcome:** So I can settle debates or make informed fantasy cricket selections.
4. **Job 4: Answer Specific Questions**
   * **Situation:** When I have a complex, specific cricket question,
   * **Motivation:** I want a direct, natural-language answer with supporting proof,
   * **Outcome:** So I don't have to leave Cricbuzz for general AI tools.
5. **Job 5: Understand Match Context**
   * **Situation:** When a major match event or result occurs,
   * **Motivation:** I want to quickly understand why it happened and what key records were broken,
   * **Outcome:** So I stay informed on crucial match narratives.

---

### Major Friction Points

1. **Player & Team Discovery Tied to Current Matches (Problem 1)**
   * *User Friction:* Discovery is restricted to current or upcoming match weeks. If a player (like Virat Kohli) isn't playing in a live match, or if a user wants to search for a retired legend or inactive team, there is no direct search route to view their records. Users shouldn't have to wait for an active match to look up statistics.
2. **Stats Provided, But Not Insights (Problem 2)**
   * *User Friction:* When users have a specific question (e.g. *"How much did Rohit Sharma score against Sri Lanka in an ODI in 2019?"*), the data exists, but users must manually navigate stats archives to calculate or find the answer.
3. **Offboarding to External AI Tools (Problem 3)**
   * *User Friction:* To compare two players, settle debates, or answer historical questions (e.g. *"Kohli runs vs Pakistan in 2023 WC"*), users abandon Cricbuzz to ask ChatGPT or Google, risking user retention.

**The Key Discovery Insight:**
*Users don't search for statistics. They search for answers.*
The real job is not *"Give me data."* It is **"Help me answer my cricket question."** This fundamental shift redefined the entire product direction.

---

## 03. Problem Definition & PIF Prioritization

### Core Problem Statement
*Cricbuzz has a large amount of cricket data, but users still have to do too much work to turn that data into an answer.*
* **From Old Journey:** Search → Navigate → Find statistics → Compare → Interpret
* **To New Vision:** Ask a question → Get relevant cricket data → Understand the answer instantly.

### PIF Prioritization Scorecard
PIF Score = Pain (1-5) × Impact (1-5) × Frequency (1-5)

| Identified Problem Area | Pain | Impact | Frequency | PIF Score | Priority |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Data vs Insight Gap (Turning stats into answers)** | 5 | 5 | 4 | **100** | Critical |
| **External AI Offboarding Risk** | 4 | 5 | 4 | **80** | High |
| **Player & Team Discovery Tied to Matches** | 4 | 3 | 4 | **48** | Medium |

---

## 04. User Journey Mapping

Key maps detailing friction points and drop-offs:
1. **Data vs Insight Gap and External AI Offboarding Risk**
   * Illustrates flow and drop-off when looking up complex analysis, prompting offboarding to tools like ChatGPT/Gemini.
2. **Player search deadlock**
   * Visualizes the user experience lock when searching for retired players or inactive franchises outside current match cycles.

---

## 05. Solution Space & Prioritization

### Solution Space Exploration

#### Problem 1: Player & Team Discovery Tied to Active Matches
* **Solution 1 — Global Search:** Allow users to directly search for any player, team, match, or historical entity. Removes dependency on current/live matches.
* **Solution 2 — Explore / Browse Directory:** Dedicated browse section with filters (Active/Retired, Era, Format, Country).

#### Problem 2: From Data to Answers (Data vs Insight Gap)
* **Solution 1 — AI Cricket Analyst:** Let users ask cricket questions in natural language and receive direct, data-backed answers instantly.
* **Solution 2 — Pre-Built Insights:** Automatically generated form trends, matchups, and weakness summaries on profile pages.
* **Solution 3 — Smart Filters & Query Statistics:** Multi-parameter selectors (opponent, year, venue, format) to slice and dice data tables.

---

### Strategic Selection & Direction

**Key Prioritization Insight:**
*Discovery and data interpretation are connected problems.*
A Global Search helps users find a player or team, but doesn't help them answer complex questions. An AI Analyst can answer complex questions, but users still need to discover entities. Therefore, they should be unified.

**Selected Direction: Global Search with Integrated AI**
1. **Global Search:** Direct search for players, teams, matches, or historical entities. Solves lookup discovery.
2. **Contextual Ask AI on Detail Pages:** Detail pages provide statistics plus a prompt to ask AI deeper contextual questions (e.g. *"How has he performed vs Australia?"*).
3. **Ask AI as a Dedicated Experience:** A dedicated Ask AI tab in the bottom navigation for cross-entity queries (e.g. *"Compare Kohli vs Rohit in World Cups"*).

**Why This Solution Was Selected:**
* *Global Search Solves:* "How do I find the player, team, or match I am looking for?"
* *Contextual AI Solves:* "I have found the information. Now help me understand it."
* *Ask AI Solves:* "I have a cricket question. Give me the answer directly."

**The Product Shift:**
Moves Cricbuzz from: ~~*"Help me find cricket data."*~~
to: **"Help me find and understand cricket information."**

---

## 06. Product Design & UI Experience

* **Interactive Prototype:** The Cricbuzz AI Analyst high-fidelity prototype is built and embedded on [lovable.app](https://cricbuzz-insight-genius.lovable.app/).
* **User Flow Demonstration:** A step-by-step walkthrough demo video illustrates entity search, detail-page profile lookups, contextual inquiries, and side-by-side player comparisons.

---

## 07. PRD & Success Metrics

### 1. Executive Summary & Objective
Integrate a natural-language query engine grounded in Cricbuzz's proprietary cricket database. The goal is to allow users to ask complex questions, compare players side-by-side, and receive accurate, data-backed insights instantly.

### 2. Success Metrics & Guardrails

* **Primary Metric:**
  * *AI Analyst Usage Rate:* % of MAU interacting with the AI Analyst feature.
* **Secondary Metrics:**
  * AI Query Completion Rate (%)
  * Repeat Weekly AI Usage Rate
  * Average Queries per User Session
  * Answer Satisfaction (Helpful vs Not Helpful)
* **Guardrail Metrics:**
  * Answer Accuracy Rate (&gt;99% verified data match)
  * Hallucination Rate (&lt;1%)
  * AI Response Latency (&lt;1.5s p95)
  * Query Fallback Rate (&lt;3%)

### 3. Key User Stories
* **Cricket Enthusiast:** I want to ask natural-language questions about player form against specific teams, so that I can settle cricket debates without conducting multiple manual searches.
* **Live Match Follower:** I want to look up a player's recent record in pressure chases directly from global search, so that I can understand match context instantly.
* **Casual Cricket Fan:** I want to receive written summaries explaining statistical tables, so that I can grasp player capabilities without getting confused by dense numbers.

### 4. Risks & Technical Mitigations
1. **Incorrect AI Answers (Hallucinations):** Strict RAG pipeline using Cricbuzz database as sole ground truth. If confidence is low, fallback gracefully: *"I don't have enough data to answer this confidently."*
2. **Lack of User Trust:** Display verifiable supporting raw data chips alongside every written AI summary.
3. **Response Latency:** Pre-compute common queries and stream responses immediately with skeleton loaders.
4. **Becoming a Generic Chatbot:** Constrain AI scope strictly to the cricket domain using Cricbuzz terminology and visual stat card outputs.

### 5. Expected Product Impact
* Makes player and team discovery effortless and unconstrained.
* Drastically reduces steps needed to turn raw statistics into actionable insights.
* Increases user retention by eliminating offboarding to external AI tools.
* Positions Cricbuzz not just as a data provider, but as the premier destination for cricket intelligence.
