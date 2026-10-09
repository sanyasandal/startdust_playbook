const ICON_BASE = `${window.hlx?.codeBasePath || ''}/icons`;
let fieldCount = 0;

function key(row) {
  return row.children[0]?.textContent.trim().toLowerCase().replace(/[^a-z]/g, '') || '';
}

function cellText(cell) {
  return cell?.textContent.trim() || '';
}

function safeHref(href) {
  if (!href) return null;
  try {
    const url = new URL(href, window.location.href);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function icon(name) {
  const img = document.createElement('img');
  img.src = `${ICON_BASE}/${name}.svg`;
  img.alt = '';
  img.width = 20;
  img.height = 20;
  return img;
}

function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function fieldType(label) {
  if (/pass/i.test(label)) return 'password';
  if (/mail/i.test(label)) return 'email';
  if (/phone|tel/i.test(label)) return 'tel';
  return 'text';
}

function autocomplete(label, type) {
  if (type === 'email') return 'email';
  if (type === 'tel') return 'tel';
  if (type === 'password') return 'new-password';
  if (/first/i.test(label)) return 'given-name';
  if (/last|surname/i.test(label)) return 'family-name';
  if (/zip|post/i.test(label)) return 'postal-code';
  if (/city|town/i.test(label)) return 'address-level2';
  if (/street/i.test(label)) return 'address-line1';
  if (/additional address/i.test(label)) return 'address-line2';
  if (/^title$/i.test(label)) return 'honorific-prefix';
  if (/hospital|practice/i.test(label)) return 'organization';
  return 'off';
}

function addErrorHandling(control, error) {
  control.setAttribute('aria-describedby', error.id);
  const clear = () => {
    if (!control.validity.valid) return;
    error.hidden = true;
    control.removeAttribute('aria-invalid');
  };
  control.addEventListener('input', clear);
  control.addEventListener('change', clear);
}

function buildLabel(id, text, required) {
  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = text;
  if (required) {
    const star = document.createElement('span');
    star.className = 'registration-required';
    star.setAttribute('aria-hidden', 'true');
    star.textContent = '*';
    label.append(star);
  }
  return label;
}

function buildField(kind, cells) {
  const [labelCell, placeholderCell, optionsCell] = cells;
  const labelText = cellText(labelCell);
  if (!labelText) return null;
  fieldCount += 1;
  const id = `registration-field-${fieldCount}`;
  const required = kind !== 'optionalfield';

  const wrapper = document.createElement('div');
  wrapper.className = 'registration-field';
  const control = document.createElement('div');
  control.className = 'registration-control';

  let input;
  if (kind === 'select') {
    input = document.createElement('select');
    const prompt = document.createElement('option');
    prompt.value = '';
    prompt.textContent = cellText(placeholderCell) || 'Select an option';
    input.append(prompt);
    const items = optionsCell?.querySelectorAll('li');
    const values = items?.length
      ? [...items].map((li) => li.textContent.trim())
      : cellText(optionsCell).split(',').map((value) => value.trim());
    values.filter(Boolean).forEach((value) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      input.append(option);
    });
    const chevron = icon('az-chevron-down');
    chevron.className = 'registration-chevron';
    control.append(input, chevron);
    wrapper.classList.add('registration-field-select');
  } else {
    input = document.createElement('input');
    input.type = fieldType(labelText);
    input.placeholder = cellText(placeholderCell);
    input.autocomplete = autocomplete(labelText, input.type);
    control.append(input);
    if (input.type === 'password') {
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'registration-reveal';
      toggle.setAttribute('aria-label', `Show ${labelText.toLowerCase()}`);
      toggle.setAttribute('aria-pressed', 'false');
      toggle.setAttribute('aria-controls', id);
      toggle.append(icon('az-eye-open'));
      toggle.addEventListener('click', () => {
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        toggle.setAttribute('aria-pressed', String(show));
        toggle.setAttribute('aria-label', `${show ? 'Hide' : 'Show'} ${labelText.toLowerCase()}`);
        toggle.replaceChildren(icon(show ? 'az-eye-slash' : 'az-eye-open'));
      });
      control.append(toggle);
    }
  }
  input.id = id;
  input.name = slug(labelText);
  input.required = required;

  const error = document.createElement('p');
  error.className = 'registration-error';
  error.id = `${id}-error`;
  error.hidden = true;
  addErrorHandling(input, error);

  wrapper.append(buildLabel(id, labelText, required), control, error);
  return wrapper;
}

function buildCheckbox(cell) {
  if (!cellText(cell)) return null;
  fieldCount += 1;
  const id = `registration-field-${fieldCount}`;
  const wrapper = document.createElement('div');
  wrapper.className = 'registration-check';
  const box = document.createElement('input');
  box.type = 'checkbox';
  box.id = id;
  box.name = slug(cellText(cell));
  box.required = true;
  const label = document.createElement('label');
  label.htmlFor = id;
  [...(cell.querySelector('p') || cell).childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      label.append(node.textContent);
    } else if (node.matches?.('a[href]')) {
      const a = document.createElement('a');
      const href = safeHref(node.getAttribute('href'));
      if (href) a.href = href;
      a.textContent = node.textContent.trim();
      label.append(a);
    } else {
      label.append(node.textContent);
    }
  });
  const error = document.createElement('p');
  error.className = 'registration-error';
  error.id = `${id}-error`;
  error.hidden = true;
  addErrorHandling(box, error);
  wrapper.append(box, label, error);
  return wrapper;
}

function checkPasswords(form) {
  const passwords = [...form.querySelectorAll('input[autocomplete="new-password"]')];
  if (passwords.length < 2) return;
  const [first, ...confirms] = passwords;
  confirms.forEach((input) => {
    input.setCustomValidity(input.value && input.value !== first.value ? 'Passwords do not match.' : '');
  });
}

function validate(form) {
  checkPasswords(form);
  let firstInvalid = null;
  form.querySelectorAll('input, select').forEach((control) => {
    const error = form.querySelector(`#${control.id}-error`);
    if (!error) return;
    if (control.validity.valid) {
      error.hidden = true;
      control.removeAttribute('aria-invalid');
      return;
    }
    error.textContent = control.validationMessage;
    error.hidden = false;
    control.setAttribute('aria-invalid', 'true');
    firstInvalid ??= control;
  });
  firstInvalid?.focus();
  return !firstInvalid;
}

export default function decorate(block) {
  const intro = document.createElement('div');
  intro.className = 'registration-intro';
  const form = document.createElement('form');
  form.className = 'registration-form';
  form.noValidate = true;
  const grid = document.createElement('div');
  grid.className = 'registration-grid';
  const checks = document.createElement('div');
  checks.className = 'registration-checks';
  const actions = document.createElement('div');
  actions.className = 'registration-actions';
  let message = '';
  let breakNext = false;

  [...block.children].forEach((row) => {
    const kind = key(row);
    const cells = [...row.children].slice(1);
    if (!kind || !cells.length) return;
    if (kind === 'title' && cellText(cells[0])) {
      const h1 = document.createElement('h1');
      h1.textContent = cellText(cells[0]);
      intro.append(h1);
    } else if (kind === 'text' && cellText(cells[0])) {
      const p = document.createElement('p');
      p.textContent = cellText(cells[0]);
      intro.append(p);
    } else if (['field', 'optionalfield', 'select'].includes(kind)) {
      const field = buildField(kind, cells);
      if (!field) return;
      if (breakNext) field.classList.add('registration-field-break');
      breakNext = false;
      grid.append(field);
    } else if (kind === 'break') {
      breakNext = true;
    } else if (kind === 'checkbox') {
      const check = buildCheckbox(cells[0]);
      if (check) checks.append(check);
    } else if (kind === 'back') {
      const source = cells[0].querySelector('a[href]');
      const a = document.createElement('a');
      a.className = 'registration-button registration-button-secondary';
      a.textContent = cellText(cells[0]) || 'Back';
      const href = safeHref(source?.getAttribute('href'));
      if (href) a.href = href;
      actions.append(a);
    } else if (kind === 'submit') {
      const button = document.createElement('button');
      button.type = 'submit';
      button.className = 'registration-button registration-button-primary';
      button.textContent = cellText(cells[0]) || 'Register';
      actions.append(button);
    } else if (kind === 'message') {
      message = cellText(cells[0]);
    }
  });

  if (!actions.querySelector('[type="submit"]')) {
    const button = document.createElement('button');
    button.type = 'submit';
    button.className = 'registration-button registration-button-primary';
    button.textContent = 'Register';
    actions.append(button);
  }

  const status = document.createElement('p');
  status.className = 'registration-status';
  status.setAttribute('role', 'status');

  form.append(...[grid, checks.children.length ? checks : null, actions, status].filter(Boolean));
  form.addEventListener('input', () => checkPasswords(form), true);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = '';
    if (!validate(form)) return;
    status.textContent = message || 'Registration is not connected on this page yet.';
  });

  block.replaceChildren(...[intro.children.length ? intro : null, form].filter(Boolean));
}
