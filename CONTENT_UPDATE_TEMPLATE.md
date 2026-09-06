# Monthly Content Update — LEGEND

Fill this in and send it to the developer with the assets attached. One completed form is everything needed to put a new edition on the site.

From [`19-content-maintenance.md`](legend-landing-page-planning/19-content-maintenance.md).

---

## 1. The edition

| Field | Value |
|---|---|
| Issue number | |
| Month / year | |
| Cover image attached | ☐ |
| Edition PDF attached | ☐ |
| Accent colour (hex, or "use previous") | |
| One-line description (about 20 words) | |

---

## 2. Featured people — 3 to 5

Only include people cleared for use in website promotion.

| # | Full name (exact spelling) | Designation | Organisation | Editorial category | Photo attached | Web usage rights confirmed |
|---|---|---|---|---|---|---|
| 1 | | | | | ☐ | ☐ |
| 2 | | | | | ☐ | ☐ |
| 3 | | | | | ☐ | ☐ |
| 4 | | | | | ☐ | ☐ |
| 5 | | | | | ☐ | ☐ |

**Categories:** Leadership · Business & Finance · Developers' Diary · Enterprise & Legacy · Mumbai & Infrastructure · Culture & Public Life · Design & Architecture · Social Impact · Lifestyle & Hospitality · Sport & Community

> Which of these should be the **large lead portrait**? \_\_\_\_\_\_\_

---

## 3. Featured stories — 2 to 4

| # | Headline (as approved for the website) | Subject / person | Category | Image attached | Rights confirmed |
|---|---|---|---|---|---|
| 1 | | | | ☐ | ☐ |
| 2 | | | | ☐ | ☐ |
| 3 | | | | ☐ | ☐ |
| 4 | | | | ☐ | ☐ |

For each story, a two-sentence summary for the card:

1. 
2. 
3. 
4. 

> Which story should be the **lead** in the grid? \_\_\_\_\_\_\_

---

## 4. Developers' Diary

| Field | Value |
|---|---|
| Person featured this edition | |
| Should the section image change? | ☐ keep current ☐ new image attached |

---

## 5. Anything else

| Field | Value |
|---|---|
| Changes to contact details or social links | |
| Changes to the Google Forms | |
| Copy that should be reworded | |
| Notes | |

---

## Before sending — please confirm

- [ ] Every person listed has agreed to appear on the website
- [ ] Every photograph may be used online, and cropped
- [ ] Photographer credits noted where required
- [ ] Names, designations and organisations are spelled as they should appear
- [ ] The edition PDF may be published publicly
- [ ] Headlines are final

---

### For the developer

1. `public/images/issues/` ← cover · `public/issues/` ← PDF · `public/images/{people,stories}/` ← photography
2. Append to `src/data/issues.ts`; add people and stories; move the `featured` flags
3. Set the status flags on each new item as the checklist above was answered
4. `npm run verify` — resolve every blocking error, review the pending list
5. Open a `content/issue-NN` branch, review, merge to `main`

Full steps in [`README.md`](README.md#editing-content).
