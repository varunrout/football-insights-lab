# Football Insights Lab

Football Insights Lab is an AI football analytics copilot for turning raw metrics, model outputs, and analyst questions into trustworthy, coach-readable insight.

The project explores a simple thesis:

> Most football analytics tools show numbers. This system explains whether the numbers are trustworthy, useful, and actionable.

The first goal is not to fine-tune a model. The first goal is to build the product loop: ask a football analytics question, retrieve the right context, run or reference analysis, return structured reasoning, and render the answer as text plus generative UI.

## Product idea

The app acts as a specialist assistant for football analysts, recruitment teams, and technical staff.

It should help answer questions such as:

- Which player profiles are genuinely comparable?
- Is this metric being inflated by role, possession share, opponent strength, or set pieces?
- Is this model target leaking future information?
- Which visual best explains the finding?
- How do we translate the analytical result into language a coach can use?

The intended output is not just a paragraph. It should produce a structured insight pack:

- direct answer
- supporting evidence
- caveats and trust checks
- recommended visual
- analyst notes
- coach-readable translation

## Core use cases

### 1. Player comparison

Compare players using role-aware and context-aware metrics, then explain what is genuinely similar or different.

Example:

```text
Compare two wide forwards for chance creation, progression, and final-third involvement.
```

Expected output:

- concise football insight
- evidence table
- role-context caveats
- suggested visualisation
- coach translation

### 2. Model audit

Review target definitions, features, splits, and evaluation design for leakage or weak modelling assumptions.

Example:

```text
Check whether this CxA+ target leaks future possession-chain information.
```

Expected output:

- leakage verdict
- risky features
- safe alternatives
- validation recommendations
- analyst-facing explanation

### 3. Visualisation assistant

Choose the right chart or generative UI block for the analytical question.

Example:

```text
Show whether a player creates more through carries, passes, or set pieces.
```

Expected output:

- chart recommendation
- encoding rationale
- visual caveats
- generated UI-ready schema

### 4. Coach translation

Convert technical analysis into plain football language without losing the underlying evidence.

Example:

```text
Explain this player profile to a first-team coach in 90 seconds.
```

Expected output:

- direct summary
- strengths
- limitations
- tactical fit
- confidence level

## System architecture

Initial architecture:

```text
Frontend
  Next.js
  generative UI cards
  chart components
  football-specific insight panels

Backend
  API routes or FastAPI service
  structured response schemas
  Python analysis layer
  retrieval layer

AI layer
  hosted frontier model for product-quality reasoning
  RAG over metric definitions, project notes, and football analytics docs
  prompt modules for data science, visualisation, and football analysis

Research layer
  open-weight base model
  LoRA adapters
  adapter composition experiments
  evaluation set
```

## Model strategy

The product should start with a strong hosted reasoning model because the first milestone is user experience and analytical quality.

The research track should use an open-weight model for the actual model-composition experiment:

```text
Base model
+ data science adapter
+ visualisation adapter
+ football analytics adapter
```

The point is to compare:

- base model output
- prompt-routed output
- retrieval-grounded output
- single-adapter output
- merged-adapter output

This keeps the project honest. Fine-tuning should be justified by evaluation, not used as theatre.

## MVP scope

The MVP should prove one thing:

> Can the system produce better football analytics reasoning than a generic chatbot?

Initial deliverables:

- question input flow
- structured answer schema
- insight card
- evidence panel
- trust check panel
- coach translation card
- sample player comparison dataset
- first player comparison demo
- first model audit demo
- initial evaluation set

## Generative UI blocks

Planned UI components:

### Insight card

One clear analytical answer.

### Evidence panel

The metrics that support the claim.

### Trust check

Flags issues such as:

- leakage risk
- weak sample size
- role mismatch
- possession effects
- opponent strength
- set-piece inflation
- minutes threshold

### Visual recommendation

Explains whether the right output is a bar chart, scatter plot, radar, trend line, pitch map, or table.

### Coach translation

Turns the analysis into plain football language.

### Analyst mode

Shows assumptions, modelling caveats, target definitions, and feature logic.

## Roadmap

### Phase 1: Product loop

- Replace starter app with a football analytics copilot interface.
- Add structured response schema.
- Build reusable UI cards.
- Add sample player/team data.
- Produce one strong player comparison demo.

### Phase 2: Analysis and audit layer

- Add Python-backed analysis.
- Add feature and target audit mode.
- Add basic chart generation.
- Add metric definitions and retrieval.
- Add evaluation examples.

### Phase 3: Model-composition research

- Select open-weight base model.
- Build data science, visualisation, and football analytics instruction datasets.
- Train separate LoRA adapters from the same base.
- Evaluate adapters independently.
- Test adapter merging and task-vector composition.
- Compare against the product baseline.

### Phase 4: Portfolio polish

- Add demo video.
- Add screenshots.
- Add case-study write-up.
- Add architecture diagram.
- Add evaluation results.

## Evaluation principles

The system should be judged on whether it:

- gives a direct football insight
- supports claims with evidence
- avoids generic commentary
- flags weak comparisons
- identifies leakage risks
- chooses visuals intentionally
- explains assumptions clearly
- translates analysis for non-technical football users

## Why this project matters

This project is designed to show more than dashboard building.

It demonstrates:

- football analytics domain judgement
- data science rigour
- model-audit thinking
- full-stack product design
- LLM orchestration
- generative UI implementation
- evaluation discipline
- practical understanding of how analysts and coaches consume information

The end goal is a football analytics assistant that does not just answer questions, but makes the analysis more trustworthy, explainable, and usable.

## Current status

Planning started.

See:

```text
docs/model-composer-project-plan.md
```

GitHub tracker:

```text
Issue #1: Project plan: Football Analytics Model Composer
```