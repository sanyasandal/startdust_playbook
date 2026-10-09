/**
 * sign-in — One AZ login card over a full-bleed background image.
 *
 * Content model (one cell per row; rows are recognised by their content, so
 * authors may reorder, omit or repeat field rows):
 *   picture only                       → background image
 *   heading (h1)                       → card title
 *   <p><strong>Label</strong></p>      → form field; next <p> is the placeholder,
 *     <p>placeholder</p>                 an optional standalone link sits beside
 *     <p><a>Forgot…</a></p>              the label ("Forgot your password?")
 *   <p><strong><a>Login</a></strong></p> → primary submit CTA; any other <p> in
 *     <p>Remember me…</p>                the same row becomes the checkbox label
 *   <p>Or</p> + <p><em><a>…</a></em></p> → divider + secondary sign-in options
 *   <p>text <a>link</a></p>            → sign-up band under the card
 *
 * @ew-exempt <p> field placeholder (field row, 2nd paragraph) — metadata, rendered
 *   as the input's placeholder attribute
 */

let fieldCount = 0;
const ICON_BASE = `${window.hlx?.codeBasePath || ''}/icons`;

// ── Experience Workspace helpers (EW1–EW4) ──
function wrapNode(node, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(node);
  return w;
}

function icon(name) {
  const img = document.createElement('img');
  img.src = `${ICON_BASE}/${name}.svg`;
  img.alt = '';
  img.width = 20;
  img.height = 20;
  return img;
}

function paragraphs(cell) {
  return [...cell.children].filter((el) => el.tagName === 'P');
}

function isPrimaryCta(p) {
  return !!p.querySelector('a.button.primary, strong > a, a > strong');
}

function isSecondaryCta(p) {
  return !!p.querySelector('a.button.secondary, em > a, a > em');
}

function isFieldLabel(p) {
  const strong = p?.querySelector('strong');
  return !!strong && !p.querySelector('a')
    && strong.textContent.trim() === p.textContent.trim();
}

function fieldType(label) {
  if (/pass/i.test(label)) return 'password';
  if (/mail/i.test(label)) return 'email';
  return 'text';
}

function buildField(cell) {
  const [labelP, ...rest] = paragraphs(cell);
  fieldCount += 1;
  const id = `sign-in-field-${fieldCount}`;
  const labelText = labelP.textContent.trim();
  const type = fieldType(labelText);
  labelP.id = `${id}-label`;

  const linkP = rest.find((p) => p.querySelector('a[href]'));
  const placeholderP = rest.find((p) => p !== linkP);

  const top = document.createElement('div');
  top.className = 'field-top';
  const label = wrapNode(labelP, 'field-label');
  label.addEventListener('click', () => document.getElementById(id)?.focus());
  top.append(label);
  if (linkP) top.append(wrapNode(linkP, 'field-link'));

  const control = document.createElement('div');
  control.className = 'field-control';
  const input = document.createElement('input');
  input.id = id;
  input.type = type;
  input.name = type === 'text' ? labelText.toLowerCase().replace(/[^a-z0-9]+/g, '-') : type;
  input.required = true;
  input.setAttribute('aria-labelledby', labelP.id);
  if (placeholderP) {
    input.placeholder = placeholderP.textContent.trim();
    placeholderP.remove();
  }
  if (type === 'email') input.autocomplete = 'username';
  if (type === 'password') input.autocomplete = 'current-password';
  control.append(input);

  if (type === 'password') {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'reveal';
    toggle.setAttribute('aria-label', 'Show password');
    toggle.setAttribute('aria-pressed', 'false');
    toggle.setAttribute('aria-controls', id);
    toggle.append(icon('az-eye-open'));
    toggle.addEventListener('click', () => {
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      toggle.setAttribute('aria-pressed', String(show));
      toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      toggle.replaceChildren(icon(show ? 'az-eye-slash' : 'az-eye-open'));
    });
    control.append(toggle);
  }

  const error = document.createElement('p');
  error.className = 'field-error';
  error.id = `${id}-error`;
  error.hidden = true;
  input.setAttribute('aria-describedby', error.id);
  input.addEventListener('input', () => {
    if (!input.validity.valid) return;
    error.hidden = true;
    input.removeAttribute('aria-invalid');
  });

  const field = document.createElement('div');
  field.className = 'field';
  field.append(top, control, error);
  return field;
}

function validate(form) {
  let firstInvalid = null;
  form.querySelectorAll('.field input').forEach((input) => {
    const error = document.getElementById(`${input.id}-error`);
    if (input.validity.valid) {
      error.hidden = true;
      input.removeAttribute('aria-invalid');
      return;
    }
    error.textContent = input.validationMessage;
    error.hidden = false;
    input.setAttribute('aria-invalid', 'true');
    firstInvalid ??= input;
  });
  firstInvalid?.focus();
  return !firstInvalid;
}

function buildActions(cell, form) {
  const ps = paragraphs(cell);
  const ctaP = ps.find(isPrimaryCta);
  const nodes = [];
  if (ctaP) {
    ctaP.querySelector('a')?.addEventListener('click', (event) => {
      event.preventDefault();
      form.requestSubmit();
    });
    nodes.push(wrapNode(ctaP, 'submit'));
  }
  ps.filter((p) => p !== ctaP && p.textContent.trim()).forEach((p, i) => {
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.name = i ? `option-${i}` : 'remember';
    p.id = `sign-in-remember-${fieldCount}-${i}`;
    box.setAttribute('aria-labelledby', p.id);
    const remember = document.createElement('div');
    remember.className = 'remember';
    remember.append(box, p);
    p.addEventListener('click', () => box.click());
    nodes.push(remember);
  });
  return nodes;
}

function buildAlternatives(cell) {
  const nodes = [];
  const list = document.createElement('div');
  list.className = 'alternatives';
  paragraphs(cell).forEach((p) => {
    if (isSecondaryCta(p)) list.append(p);
    else if (p.textContent.trim()) nodes.push(wrapNode(p, 'divider'));
  });
  if (list.children.length) nodes.push(list);
  return nodes;
}

export default function decorate(block) {
  const card = document.createElement('div');
  card.className = 'card';
  const panel = document.createElement('div');
  panel.className = 'panel';
  const form = document.createElement('form');
  form.className = 'form';
  form.noValidate = true;
  const tail = [];
  let background = null;
  let signup = null;

  [...block.children].forEach((row) => {
    const cell = row.querySelector(':scope > div') || row;
    const heading = cell.querySelector('h1, h2, h3, h4, h5, h6');
    const picture = cell.querySelector('picture') || cell.querySelector('img');
    const ps = paragraphs(cell);

    if (picture && !cell.textContent.trim()) {
      background ??= wrapNode(picture, 'background');
    } else if (heading) {
      panel.prepend(wrapNode(heading, 'headline'));
    } else if (isFieldLabel(ps[0])) {
      form.append(buildField(cell));
    } else if (ps.some(isPrimaryCta)) {
      form.append(...buildActions(cell, form));
    } else if (ps.some(isSecondaryCta)) {
      tail.push(...buildAlternatives(cell));
    } else if (ps.length) {
      signup ??= document.createElement('div');
      signup.className = 'signup';
      signup.append(...ps);
    }
  });

  const status = document.createElement('p');
  status.className = 'status';
  status.setAttribute('role', 'status');
  form.append(status);
  form.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.matches('input:not([type="checkbox"])')) {
      event.preventDefault();
      form.requestSubmit();
    }
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = '';
    if (validate(form)) status.textContent = 'Sign-in is not connected on this page yet.';
  });

  if (form.querySelector('.field, .submit')) panel.append(form);
  panel.append(...tail);
  card.append(panel);
  if (signup) card.append(signup);

  block.replaceChildren(...[background, card].filter(Boolean));
}
