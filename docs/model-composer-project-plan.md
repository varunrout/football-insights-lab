# Football Analytics Model Composer: Project Plan

## Working name

Football Analytics Model Composer

## One-line thesis

Build a football analytics copilot that combines data science reasoning, visualisation judgement, football domain logic, retrieval, Python tools, and generative UI to turn football data into trustworthy, coach-readable insight.

## Core idea

The project starts from a base LLM and layers specialist capability around it rather than pretending a single fine-tuned model is enough.

The practical product path is:

```text
Base reasoning model
+ football analytics retrieval
+ Python analysis tools
+ structured output schemas
+ generative UI components
+ evaluation suite
= football analytics copilot
```

The research path is:

```text
Open-weight base model
+ data science LoRA
+ visualisation LoRA
+ football analytics LoRA
= adapter composition experiment
```

The product should prove value before fine-tuning is introduced.

## Problem

Most football analytics dashboards show numbers, charts, or model outputs. They rarely answer the more important questions:

- Is the metric trustworthy?
- Is the comparison fair?
- Is there leakage in the target or features?
- Is the visual the right visual?
- Would a coach understand the insight?
- What is the next analytical step?

This project focuses on bridging the gap between raw analysis and decision-ready football insight.

## Target users

### 1. Football analysts

Need rigorous checks, feature logic, caveats, code, and validation.

### 2. Coaches and performance staff

Need clear football language, tactical meaning, and fast interpretation.

### 3. Recruitment and scouting users

Need player comparisons, role fit, uncertainty, and evidence-backed recommendations.

## MVP scope

The first version should not fine-tune a model. It should build the copilot workflow.

### MVP input

- Player metrics
- Team metrics
- Match/event data
- Model output tables
- User questions in natural language

### MVP output

- Direct answer
- Evidence table
- Caveats and trust checks
- Recommended visual
- Generated chart or UI card
- Coach-readable summary
- Analyst-mode reasoning where needed

### MVP tasks

- Compare two players for a role
- Explain a player/team metric
- Review whether a model target leaks future information
- Recommend the best chart for a football analytics question
- Generate a concise scouting-style insight card
- Explain a model result to a non-technical football audience

## Product modes

### 1. Insight mode

Turns metrics and context into a direct analytical takeaway.

Example:

> Compare Saka and Palmer for chance creation.

Output should include:

- Main conclusion
- Supporting evidence
- Possession/context caveat
- Recommended visual
- Coach translation

### 2. Model audit mode

Checks target definitions, feature sets, temporal splits, leakage risk, and evaluation design.

Example:

> Review this CxA+ target and tell me if leakage is happening.

Output should include:

- Leakage verdict
- Target timing check
- Feature availability check
- Train/test split critique
- Safer alternative design

### 3. Visualisation mode

Chooses and generates the clearest visual for a football analytics question.

Output should include:

- Chart choice
- Why that chart fits
- What not to use
- Generated chart spec
- Interpretation text

### 4. Coach mode

Converts analyst language into short, football-native language.

Example:

> Translate this analysis for a coach.

Output should avoid technical clutter and focus on actionable football meaning.

### 5. Adapter composer mode

Phase-two research mode where different adapters can be toggled and compared.

Example:

- Base only
- Base + data science adapter
- Base + visualisation adapter
- Base + football adapter
- Base + all adapters

The system compares output quality, correctness, and style.

## System architecture

### Frontend

- Next.js
- TypeScript
- Tailwind
- shadcn/ui
- Recharts or visx
- Generative UI card renderer

### Backend

- FastAPI or Next.js API routes
- Python analysis worker
- Model router
- Retrieval service
- Evaluation runner

### AI layer

- Hosted frontier model for product-quality reasoning
- Open-weight model for adapter experiments
- RAG over football analytics docs, metric definitions, and project notes
- Structured output schemas
- Prompt modules for data science, visualisation, football, and coach translation

### Research model

- Base: Llama 3.1 8B Instruct or comparable open-weight 7B to 8B instruct model
- Fine-tuning: LoRA or QLoRA
- Adapters:
  - data science reasoning
  - data visualisation judgement
  - football analytics domain logic

### Data layer

- StatsBomb open data to start
- Local feature store
- Metric definitions in markdown or JSON
- Example player/team comparison datasets
- Synthetic examples for model-audit tasks

## Generative UI components

### Insight card

Shows the direct answer in one or two lines.

### Evidence panel

Shows the metrics supporting the claim.

### Trust check panel

Shows:

- sample size
- minutes threshold
- possession adjustment
- opponent adjustment
- leakage risk
- uncertainty

### Visual recommendation card

Shows the chart type, reason, and chart output.

### Coach translation card

Translates the technical result into football language.

### Analyst mode drawer

Shows assumptions, formulas, caveats, and code.

## Evaluation plan

The project needs evals from day one.

### Evaluation dimensions

- Correctness
- Leakage awareness
- Football domain relevance
- Visualisation quality
- Evidence use
- Clarity for coaches
- Code quality
- Refusal to overclaim

### Example eval questions

- Does this feature use information available before the prediction point?
- Is this player comparison fair after adjusting for team possession?
- Did the system choose a sensible visual for the question?
- Did the coach summary preserve the analytical meaning?
- Did the system admit uncertainty when evidence was weak?

## Build phases

### Phase 0: Repo and design setup

- Write project plan
- Define MVP tasks
- Define UI components
- Define first eval set
- Decide data source and folder structure

### Phase 1: MVP copilot

- Build basic Next.js frontend
- Build question input flow
- Add structured AI responses
- Add football metric definitions via RAG
- Add first generative UI cards
- Add static/sample football datasets

### Phase 2: Python analysis layer

- Add Python worker
- Support uploaded CSV or sample data
- Generate evidence tables
- Generate charts
- Add model-audit checks

### Phase 3: Football analytics depth

- Add player comparison workflows
- Add possession/opponent adjustment notes
- Add CxA+ and target leakage audit examples
- Add coach-mode summaries

### Phase 4: Evaluation suite

- Build golden test set
- Score outputs across correctness, leakage, clarity, and visual choice
- Compare base prompt vs routed modules
- Track regressions

### Phase 5: Adapter composition experiment

- Fine-tune separate LoRA adapters from the same open-weight base
- Train data science, visualisation, and football analytics adapters separately
- Compare base vs individual adapters vs merged adapters
- Document whether adapter composition improves or damages output quality

## Non-goals for the MVP

- Do not train a model first
- Do not build a full dashboard before the reasoning loop works
- Do not support every data provider
- Do not overbuild authentication
- Do not claim the model is a football expert without eval evidence

## First concrete deliverables

1. Project README with product thesis
2. MVP workflow diagram
3. `docs/model-composer-project-plan.md`
4. `docs/evaluation-plan.md`
5. `docs/ui-components.md`
6. First hard-coded demo using sample player comparison data
7. First model-audit demo for target leakage

## Portfolio positioning

This project should be presented as:

> A football analytics copilot that combines LLM reasoning, retrieval, Python analysis, model-audit checks, and generative UI to make football data more trustworthy and coach-readable.

The strongest hiring signal is not fine-tuning alone. It is the full system:

- football analytics reasoning
- model validity checks
- data science rigour
- visualisation judgement
- product thinking
- full-stack implementation
- evaluation discipline
