# Modifying brief — split "Your Domains" into two sections (Section 2 + Section 3)

This brief updates the earlier Section 2 ("Your Domains") design direction. The single section is now **two sections**. Build to this, not to the prior single-section handoff where they conflict. Read the `dimensional-voice` skill before writing any on-page copy; British English, no banned words (note: the word "journey" is banned), state-before-number, no negative-lead paragraphs.

A working HTML reference build accompanies this brief (`domains_shape.html`). It is a concept to judge structure and encounter, not final visual quality. Where this brief and the reference disagree, the brief wins.

---

## The split

**Section 2 · Your Domains** — the results. The reader meets each foundation and leaves with one important takeaway per foundation, even if they never go deeper. Holds the attention layer.

**Section 3 · Your Shape** — the synthesis-at-headline-level. The three domains read as one form. No results, no attention layer; those were Section 2's job.

Rationale for the split: Section 2 answers "what am I, across these three?" and must stand alone for the impatient reader. Section 3 answers "what does the overall form do to me?" Folding them into one section overloaded the encounter and buried the shape read under the results.

---

## Section 2 · Your Domains — layout

**Toggle is the hero.** Centred, on top, directly under the section title. Two states: `3 domains` / `6 dimensions`. The toggle governs both the symbol and the right-hand rows simultaneously.

**Below the toggle, a two-column split:**
- **Left — the symbol.** The triforce (Safety lower-left, Play lower-right, Challenge apex), each triangle filled to its **band**, not its raw digit. Band words ("Very Low", "Low", "High") shown on the shape. Heights carry the first read. This is the established brand mark, re-treated, not abandoned.
- **Right — the rows.** One row per domain (or per dimension). Each row: name · band · percentage · **one line of plain-language meaning**. The one-liner is the takeaway — it states a consequence of sitting in that band, in the reader's terms. Example, Safety Very Low: "You appear steadier than you feel, and holding that gap is quietly expensive." This is the bet being tested: a reader who stops here still leaves with three (or six) true, important statements about their foundation.

**Hover/selection links the two columns.** Hovering a triangle highlights its row and vice versa. Digits live in the rows; they are never the headline on the shape.

**Dimensions view — visual hierarchy is the hard problem.** Six rows of band+score+line is a lot. Do **not** give all six equal weight. The two dimensions that *break from their parent domain's band* (here: Self, Perception, Past) are drawn at full weight in the symbol and sit as solid rows; the conforming dimensions sit quieter (dashed row, lower-opacity fill). This is also the teaching move — the divergent dimensions are where the deeper reading turns. We are testing all six with one-liners in the reference build before deciding whether to cut to a subset; judge whether six holds or overwhelms.

**Attention layer — centred, beneath the split.** 1–4 flags. Each flag points to a *specific place inside a domain* — a Felt reading, an alignment finding, a single dimension — not to "the shape." Clicking routes the reader to that area in the relevant domain section (Safety / Play / Challenge), which is where the deep content lives. The flag is a consistent branded device (see design rule 4); it is the same device wherever flags recur in the report. The flags for the sample reader:
1. A gap inside Safety (→ Safety · Alignment)
2. Challenge is a clear resource (→ Challenge)
3. Future runs ahead (→ Challenge · Future)
4. Others is the lowest dimension (→ Safety · Others)

The attention layer must hold **1–2 flags beautifully**, not look thin — most readers will have one or two, not four. A balanced reader still gets at least one honest flag. Do not manufacture flags to fill space.

---

## Section 3 · Your Shape — layout

**Two-column split, no toggle, no attention layer.**
- **Left — the graphic shape.** The same triforce object, but now with a **shape-driven embellishment** that makes the form legible at a glance. The embellishment is a *function of the shape*, not hardcoded:
  - **Sharp Peak** → a mountain silhouette rising behind whichever corner is the apex (Challenge apex → top; Safety apex → lower-left; Play apex → lower-right). The reference build moves the mountain correctly by apex.
  - **Balanced** → a ring/halo showing roundness; no mountain, no drama. A balanced reader must get a true, dignified read, not a forced tension.
  - **Dual engine** (two domains tied high) → a distinct device for two co-load-bearing corners.
  - Build the classifier so any reader's shape resolves to the right embellishment. The reference build includes a "cycle shape type" control to inspect all four states.
- **Right — what this shape does.** Short prose, headline-level only. What the shape is, the core tension, what it tends to produce. It ends on the **open question the shape cannot answer on its own** ("why has the foundation beneath the peak had to stay so thin?"), which is the forward pull into the domain sections. This is a quiet close, not a "go look →" nudge.

**Hold the line on depth:** the full "how your foundations interact" story is Section 6, earned later. Section 3 is the headline; Section 6 is the article. If Section 3's right column starts wanting paragraphs of interaction mechanics, it is overreaching into Section 6 — stop it.

---

## Future-proofing (unchanged, still binding)

The shape in both sections must be the **same object** that can later animate / change state in Section 7, where it "rounds out" as Safety builds. Do not build a static hero you will have to rebuild. The dashed outer triangle in the reference is the full-potential outline the fill grows toward.

---

## Design rules still in force (from the original handoff)

State before number (band before digit; height before band). Reader's words before system labels. Equal visual weight across the three domains — content carries emphasis, not size. Flags are a physical branded device, never "Flagged · Attention N" mono caps. Recognition moments change the page's grammar rather than animating in chirpily. One hero move, committed to. Colour is the ground. No dark/black backgrounds, no literary-quarterly default, no Web3/AI glow, no wellness blobs. Domain palette: Safety #52C3A8, Play #FFBB30, Challenge #E8551D (clay-richer orange). Drastically distinct from the six prior concepts: vibrant-but-professional, infographic-quality, shareable, not editorial-sleepy.

---

## Open tests to resolve in the high-fidelity build

1. Does the six-dimension view hold with one-liners, or does it need cutting to the divergent subset plus a collapsed rest? (Testing six first.)
2. Section 3 prose length — is the four-paragraph right column already too long for "headline-level"? Pressure-test against Section 6's job.
3. The mountain embellishment at richer fidelity — silhouette vs contour lines vs a single weighted ridge. The reference uses a simple gradient silhouette; it likely wants more craft without tipping into decoration.
