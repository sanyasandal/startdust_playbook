# Registration

One AZ registration form (Figma `One AZ v3.2`, frame `13496:17255`): intro heading and text, a two-column field grid, consent checkboxes and Back/Register actions. Static form with client-side validation only.

| Key | Cells | Notes |
| --- | --- | --- |
| Title | heading | Optional `h1` |
| Text | paragraph | Optional intro |
| Field | label, placeholder | Required input. Type comes from the label: *pass* → password (with show/hide), *mail* → email, *phone/tel* → tel |
| Optional Field | label, placeholder | Same as Field, not required, no asterisk |
| Select | label, placeholder, options | Options as a list or comma-separated text |
| Break | anything | Next field starts a new grid row |
| Checkbox | label (may contain links) | Required consent checkbox |
| Back | link | Secondary button |
| Submit | label | Primary button (defaults to "Register") |
| Message | text | Status shown after a valid submit |

A second password field must match the first. One column below 768px.
