# AZ header

One AZ site header from **One AZ v3.2 / Header**, instance `13496:9591`.

The block is authored in the page body and moves itself into `body > header`
on decoration. Its CSS hides the project's default `.header` block only on
pages containing `az-header` (`body > header:has(.az-header)`).

## Authoring

| Key | Value |
| --- | --- |
| Utility | Links in the top bar |
| Languages | Language links; make the current one **bold** |
| Logo | A link to the home page; its text becomes the logo alt text |
| Navigation | A list. An item with a nested list becomes a disclosure menu |
| Actions | Links. A link whose text contains "Search" renders as an icon button |

Below 900px the navigation collapses behind a menu button. Menus close on
Escape or an outside click.
