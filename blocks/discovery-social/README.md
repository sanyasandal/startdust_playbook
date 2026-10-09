# Discovery social

An image-only, horizontally scrollable social gallery based on **WF Atta /
Frame 2147228882**, node `2091:547`, from the supplied Discovery client file.
The frame is a single section, not the full Multigrain Atta page. Site header
and footer continue to use the project's existing documents.

## Authoring

Use a `Discovery Social` block with one cell per row:

| Row | Content |
| --- | --- |
| First | A heading, using the appropriate level for the page |
| Following | One image with descriptive alternative text; optional caption |

Rows and cells can be added or omitted. No social post destinations were
provided in the frame, so images are not fabricated links. The gallery supports
touch, trackpad and keyboard scrolling without auto-rotation.

The desktop frame specifies 80px vertical padding, Outfit Medium at 42px,
a 40px heading-to-gallery gap, 287 by 285px tiles, 24px gutters and 8px corners.
The fifth tile extends beyond the right edge at 1440px and remains reachable
by scrolling. On mobile, heading size and vertical padding reduce while tiles
retain their dimensions.

## Assets

The five WebP assets reproduce the visible image layers and their source crops:
`2091:575`, `2091:572`, `2091:563`, `2091:566`, `2091:569`.
Grayscale is applied by the block CSS, as specified in the Figma image fills.
Outfit is locally hosted under `assets/`; its SIL Open Font License is included.

The authored page is `content/discovery.html`. Its absolute image URLs must
point to the branch host where this block's assets have been deployed before
previewing the page in Document Authoring.
