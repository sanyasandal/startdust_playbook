# sign-in

One AZ login card over a full-bleed background (Figma One AZ v3.2, frame `13496:10760`).
Built by the stardust deploy pipeline; David's Model + Experience Workspace editable.

| Row content | Becomes |
|---|---|
| image only | background |
| `h1` | card title |
| `**Label**` + placeholder `p` (+ optional link `p`) | form field (password → reveal toggle) |
| `**[Login](#)**` + `p` | primary submit + "remember me" checkbox |
| `Or` + `*[option](#)*` × n | divider + secondary options |
| `p` with link | sign-up band |

Placeholders are rendered as input attributes (`@ew-exempt`). Rows are matched by
content, so fields can be added, removed or reordered.
