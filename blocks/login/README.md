# Login

A static login card over a full-bleed image, from **One AZ v3.2 /
Type=Login Landing, Breakpoint=Desktop**, instance `13496:9636`.

## Authoring

Use a `Login` block with key-value rows. Rows may be omitted, reordered or
repeated where noted.

| Key | Value |
| --- | --- |
| Title | Card heading (rendered as the page `h1`) |
| Field | Label, placeholder, optional link (e.g. *Forgot your password?*). Repeatable. Labels containing "pass" become password inputs; "mail" become email inputs |
| Submit | Primary button label |
| Remember | Checkbox label |
| Divider | Text between the form and alternatives, e.g. *Or* |
| Alternatives | One or more links, rendered as secondary buttons |
| Signup | Text with a link, shown in the card footer |
| Background | Decorative image |
| Action | Optional `http(s)` form endpoint; without it the form is UI-only |
| Message | Optional status text shown after a valid UI-only submission |

All fields are required. Validation is client-side: invalid inputs get
`aria-invalid`, an inline message linked by `aria-describedby`, and focus
moves to the first error. The password reveal toggle is a button with
`aria-pressed`.

## Design

Desktop: 941px section, card 550px wide at 80px left and 73px top, white
panel with 40px padding, footer bar `#ebefee`. Below 768px the card spans the
viewport with reduced padding.

Inter is self-hosted under `/fonts/`. Lexia (the design's serif) is not
licensed for this project; Roboto Slab is the open-licensed substitute.
