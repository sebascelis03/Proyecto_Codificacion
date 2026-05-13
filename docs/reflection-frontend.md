# Workshop Reflection: Spec-Driven Development (Frontend)

## How SDD Compares to Traditional Development

Using Spec-Driven Development (SDD) with Kiro provided a noticeably different experience compared to traditional development. 

In a traditional approach, I would usually jump straight into scaffolding the React components, styling the UI, and then wiring up the logic. This often leads to "refactoring on the fly"—discovering missed requirements halfway through building a component, which results in messy code and wasted time.

With SDD, the entire mental burden shifts to the planning phase. Writing the `requirements.md`, `design.md`, and `tasks.md` files forced me to think deeply about the edge cases before a single line of code was written. For example, explicitly defining that the cart should have a fuzzy search but NOT display products by default allowed Kiro to generate exactly what was needed without me having to manually rewrite the component later.

**Key Differences:**
1. **Predictability:** Because the tasks were clearly defined, the development felt like an assembly line rather than an exploration. I always knew what the next step was.
2. **AI Synergy:** SDD is the perfect paradigm for AI-assisted coding. Instead of asking Kiro open-ended questions like "build a POS cart", giving it structured specs meant the AI had a rigid context boundary, preventing hallucinations and keeping the generated code aligned with the architecture.
3. **Traceability:** When a bug occurs or a feature is missing, it is much easier to trace it back to the spec. If the UI is wrong, the fix isn't just changing the code—it's updating the spec so the AI can correct the implementation.

Overall, SDD requires more upfront effort but drastically reduces debugging and architectural refactoring down the line.
