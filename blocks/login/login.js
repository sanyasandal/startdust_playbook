const ICON_BASE = `${window.hlx?.codeBasePath || ''}/icons`;
let fieldCount = 0;

function key(row) {
  return row.children[0]?.textContent.trim().toLowerCase().replace(/[^a-z]/g, '') || '';
}

function cellText(cell) {
  return cell?.textContent.trim() || '';
}

function readRows(block) {
  const rows = new Map();
  [...block.children].forEach((row) => {
    const name = key(row);
    if (!name || row.children.length < 2) return;
    if (!rows.has(name)) rows.set(name, []);
    rows.get(name).push([...row.children].slice(1));
  });
  return rows;
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

function plainLink(source, className) {
  const href = safeHref(source.getAttribute('href'));
  const a = document.createElement('a');
  a.className = className;
  a.textContent = source.textContent.trim();
  if (href) a.href = href;
  return a;
}

function icon(name) {
  const img = document.createElement('img');
  img.src = `${ICON_BASE}/${name}.svg`;
  img.alt = '';
  img.width = 20;
  img.height = 20;
  return img;
}

function fieldType(label) {
  if (/pass/i.test(label)) return 'password';
  if (/mail/i.test(label)) return 'email';
  return 'text';
}

function buildField([labelCell, placeholderCell, linkCell]) {
  const labelText = cellText(labelCell);
  if (!labelText) return null;
  fieldCount += 1;
  const id = `login-field-${fieldCount}`;
  const type = fieldType(labelText);

  const wrapper = document.createElement('div');
  wrapper.className = 'login-field';

  const top = document.createElement('div');
  top.className = 'login-field-top';
  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = labelText;
  const star = document.createElement('span');
  star.className = 'login-required';
  star.setAttribute('aria-hidden', 'true');
  star.textContent = '*';
  label.append(star);
  top.append(label);
  const authoredLink = linkCell?.querySelector('a[href]');
  if (authoredLink) top.append(plainLink(authoredLink, 'login-link'));

  const control = document.createElement('div');
  control.className = 'login-control';
  const input = document.createElement('input');
  input.id = id;
  input.name = type === 'text' ? labelText.toLowerCase().replace(/[^a-z0-9]+/g, '-') : type;
  input.type = type;
  input.required = true;
  input.placeholder = cellText(placeholderCell);
  if (type === 'email') input.autocomplete = 'username';
  if (type === 'password') input.autocomplete = 'current-password';
  control.append(input);

  if (type === 'password') {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'login-reveal';
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
  error.className = 'login-error';
  error.id = `${id}-error`;
  error.hidden = true;
  input.setAttribute('aria-describedby', error.id);
  input.addEventListener('input', () => {
    if (input.validity.valid) {
      error.hidden = true;
      input.removeAttribute('aria-invalid');
    }
  });

  wrapper.append(top, control, error);
  return wrapper;
}

function validate(form) {
  let firstInvalid = null;
  form.querySelectorAll('.login-field input').forEach((input) => {
    const error = form.querySelector(`#${input.id}-error`);
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

function buildSignup(cell) {
  const footer = document.createElement('p');
  footer.className = 'login-signup';
  const source = cell.querySelector('p') || cell;
  source.childNodes.forEach((node) => {
    const link = node.nodeType === Node.ELEMENT_NODE
      && (node.matches('a[href]') ? node : node.querySelector('a[href]'));
    if (link) {
      footer.append(plainLink(link, 'login-link'));
    } else if (node.textContent.trim()) {
      const span = document.createElement('span');
      span.textContent = node.textContent.trim();
      footer.append(span);
    }
  });
  return footer;
}

export default function decorate(block) {
  const rows = readRows(block);
  const first = (name) => rows.get(name)?.[0] || [];

  const card = document.createElement('div');
  card.className = 'login-card';
  const panel = document.createElement('div');
  panel.className = 'login-panel';

  const titleCell = first('title')[0];
  const titleText = cellText(titleCell);
  if (titleText) {
    const heading = document.createElement('h1');
    heading.className = 'login-title';
    heading.textContent = titleText;
    panel.append(heading);
  }

  const form = document.createElement('form');
  form.className = 'login-form';
  form.noValidate = true;
  const action = safeHref(cellText(first('action')[0]));
  if (action) {
    form.action = action;
    form.method = 'post';
  }
  (rows.get('field') || []).map(buildField).filter(Boolean).forEach((field) => form.append(field));

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'login-button login-button-primary';
  submit.textContent = cellText(first('submit')[0]) || 'Login';
  form.append(submit);

  const rememberText = cellText(first('remember')[0]);
  if (rememberText) {
    const remember = document.createElement('label');
    remember.className = 'login-remember';
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.name = 'remember';
    const span = document.createElement('span');
    span.textContent = rememberText;
    remember.append(box, span);
    form.append(remember);
  }

  const status = document.createElement('p');
  status.className = 'login-status';
  status.setAttribute('role', 'status');
  form.append(status);
  const message = cellText(first('message')[0]) || 'Sign-in is not connected on this page yet.';
  form.addEventListener('submit', (event) => {
    status.textContent = '';
    if (!validate(form)) {
      event.preventDefault();
      return;
    }
    if (!action) {
      event.preventDefault();
      status.textContent = message;
    }
  });
  panel.append(form);

  const dividerText = cellText(first('divider')[0]);
  const alternatives = (rows.get('alternatives') || [])
    .flatMap((cells) => cells.flatMap((cell) => [...cell.querySelectorAll('a[href]')]));
  if (alternatives.length) {
    if (dividerText) {
      const divider = document.createElement('p');
      divider.className = 'login-divider';
      const text = document.createElement('span');
      text.textContent = dividerText;
      divider.append(text);
      panel.append(divider);
    }
    const list = document.createElement('ul');
    list.className = 'login-alternatives';
    alternatives.forEach((a) => {
      const li = document.createElement('li');
      li.append(plainLink(a, 'login-button login-button-secondary'));
      list.append(li);
    });
    panel.append(list);
  }
  card.append(panel);

  const signupCell = first('signup')[0];
  if (cellText(signupCell)) card.append(buildSignup(signupCell));
  else card.classList.add('login-card-no-signup');

  const children = [card];
  const picture = first('background').map((cell) => cell.querySelector('picture')).find(Boolean)
    || block.querySelector('picture');
  if (picture) {
    const bg = document.createElement('div');
    bg.className = 'login-background';
    const img = picture.querySelector('img');
    if (img) {
      img.alt = '';
      img.loading = 'eager';
    }
    bg.append(picture);
    children.unshift(bg);
  }
  block.replaceChildren(...children);
}
