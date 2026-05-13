# Workshop Reflection: Spec-Driven Development (Sales API)

## 1. What did you have to clarify or fix in the generated specs?
Initially, the generated specs were somewhat vague regarding the state transitions. For example, it was not perfectly clear whether a FROZEN sale could be directly checked out or if it needed to be returned to the ACTIVE state first. I had to explicitly update the specs to enforce the `FROZEN -> ACTIVE -> COMPLETED` lifecycle. Additionally, I added more robust acceptance criteria around the `409 Conflict` out-of-stock scenario and how BigDecimal must be used for monetary calculations to avoid floating point precision errors.

## 2. How did the quality of your prompt affect the generated code?
The quality of the prompt is the single biggest factor in the final outcome. When I provided a high-level, generic prompt, Kiro generated generic controllers without the specific validation logic for CREDIT sales (e.g. checking if the customer status was APPROVED). By rewriting the prompt to be heavily detailed—explicitly stating conditions like "CREDIT requires an APPROVED customer"—Kiro correctly implemented the exact business rules inside the Service layer.

## 3. What would you do differently next time?
Next time, I would focus even more on defining the error handling and external API mock scenarios up-front. Writing the prompt to specify not just the "happy path" but all the edge cases (e.g. what happens if the external API returns a 500 error vs a 404 error) would make the generated test suite much stronger from the very first iteration. I would also try to break down the tasks into even smaller increments.
