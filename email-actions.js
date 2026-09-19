(function () {
  var styles = document.createElement('style');
  styles.textContent = [
    '.email-dialog{width:min(520px,calc(100% - 32px));max-height:calc(100vh - 32px);box-sizing:border-box;border:0;border-radius:24px;padding:0;box-shadow:0 28px 80px rgba(17,17,17,.28);color:#111;background:#fff}',
    '.email-dialog::backdrop{background:rgba(17,17,17,.62);backdrop-filter:blur(4px)}',
    '.email-card{padding:30px;display:flex;flex-direction:column;gap:20px;font-family:Figtree,system-ui,sans-serif}',
    '.email-card-header{display:flex;align-items:flex-start;justify-content:space-between;gap:20px}',
    '.email-card-kicker{display:block;color:#C21D1F;font-size:12px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;margin-bottom:5px}',
    '.email-card h2{font-family:"Baloo 2",Figtree,system-ui,sans-serif;font-size:34px;line-height:1.05;margin:0}',
    '.email-card-close{width:38px;height:38px;flex:0 0 38px;border:0;border-radius:50%;background:#F1F3F5;color:#111;font-size:25px;line-height:1;cursor:pointer}',
    '.email-card-copy{margin:0;color:#4B5158;font-size:16px;line-height:1.5}',
    '.email-card-form{display:flex;flex-direction:column;gap:14px}',
    '.email-card-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
    '.email-card-field{display:flex;flex-direction:column;gap:6px;font-size:14px;font-weight:700}',
    '.email-card-field input,.email-card-field textarea{width:100%;box-sizing:border-box;border:1px solid #C9CDD4;border-radius:12px;padding:12px 13px;font:inherit;font-weight:400;color:#111;background:#fff}',
    '.email-card-field textarea{min-height:92px;resize:vertical}',
    '.email-card-field input:focus,.email-card-field textarea:focus{outline:3px solid rgba(239,43,45,.14);border-color:#EF2B2D}',
    '.email-card-optin{display:flex;align-items:flex-start;gap:10px;color:#4B5158;font-size:13px;line-height:1.4;font-weight:500}',
    '.email-card-optin input{margin-top:2px;accent-color:#EF2B2D}',
    '.email-card-submit{border:0;border-radius:999px;padding:15px 20px;background:#EF2B2D;color:#fff;font-family:"Baloo 2",Figtree,system-ui,sans-serif;font-size:18px;font-weight:700;cursor:pointer}',
    '.email-card-note{margin:0;text-align:center;color:#6B7280;font-size:12px;line-height:1.4}',
    '.email-card-order-only[hidden],.email-card-contact-only[hidden]{display:none}',
    '@media(max-width:600px){.email-dialog{width:calc(100% - 24px);max-height:calc(100vh - 24px);border-radius:20px}.email-card{padding:22px;gap:16px}.email-card h2{font-size:29px}.email-card-row{grid-template-columns:1fr}.email-card-field textarea{min-height:78px}}'
  ].join('');
  document.head.appendChild(styles);

  var dialog = document.createElement('dialog');
  dialog.className = 'email-dialog';
  dialog.setAttribute('aria-labelledby', 'email-card-title');
  dialog.innerHTML = [
    '<div class="email-card">',
      '<div class="email-card-header">',
        '<div><span class="email-card-kicker">Kihap! Cards</span><h2 id="email-card-title">Order your set</h2></div>',
        '<button class="email-card-close" type="button" aria-label="Close">&times;</button>',
      '</div>',
      '<p class="email-card-copy">Tell us where to reach you. We will open a ready-to-send Gmail draft with your details.</p>',
      '<form class="email-card-form">',
        '<div class="email-card-row">',
          '<label class="email-card-field">Name<input name="name" autocomplete="name" required></label>',
          '<label class="email-card-field">Email<input name="email" type="email" autocomplete="email" required></label>',
        '</div>',
        '<div class="email-card-row email-card-order-only">',
          '<label class="email-card-field">Quantity<input name="quantity" type="number" min="1" value="1" inputmode="numeric"></label>',
          '<label class="email-card-field">Phone <span style="font-weight:400;color:#6B7280">(optional)</span><input name="phone" type="tel" autocomplete="tel"></label>',
        '</div>',
        '<label class="email-card-field email-card-order-only">Shipping address<textarea name="address" autocomplete="street-address" required></textarea></label>',
        '<label class="email-card-field email-card-contact-only" hidden>Message<textarea name="message" required></textarea></label>',
        '<label class="email-card-optin"><input name="optin" type="checkbox"><span>Email me occasional Kihap! Cards news and product updates. Optional—you can unsubscribe anytime.</span></label>',
        '<button class="email-card-submit" type="submit">Open ready-to-send email</button>',
        '<p class="email-card-note">Gmail will open next. Review the message, then press Send.</p>',
      '</form>',
    '</div>'
  ].join('');
  document.body.appendChild(dialog);

  var form = dialog.querySelector('form');
  var title = dialog.querySelector('#email-card-title');
  var copy = dialog.querySelector('.email-card-copy');
  var submit = dialog.querySelector('.email-card-submit');
  var mode = 'order';

  function setMode(nextMode) {
    mode = nextMode;
    var orderFields = dialog.querySelectorAll('.email-card-order-only');
    var contactFields = dialog.querySelectorAll('.email-card-contact-only');
    orderFields.forEach(function (field) { field.hidden = mode !== 'order'; });
    contactFields.forEach(function (field) { field.hidden = mode !== 'contact'; });
    form.elements.address.required = mode === 'order';
    form.elements.message.required = mode === 'contact';
    title.textContent = mode === 'order' ? 'Order your set' : 'Send us a message';
    copy.textContent = mode === 'order'
      ? 'Enter your details for the $99 Kihap! Cards set. We will open a ready-to-send Gmail draft.'
      : 'What would you like to know? We will open a ready-to-send Gmail draft to Kihap! Cards.';
    submit.textContent = 'Open ready-to-send email';
  }

  function openDialog(nextMode) {
    form.reset();
    setMode(nextMode);
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    window.setTimeout(function () { form.elements.name.focus(); }, 0);
  }

  document.querySelectorAll('.email-order').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      openDialog('order');
    });
  });

  document.querySelectorAll('.email-contact').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      openDialog('contact');
    });
  });

  dialog.querySelector('.email-card-close').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) dialog.close();
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var data = new FormData(form);
    var name = String(data.get('name') || '').trim();
    var email = String(data.get('email') || '').trim();
    var optedIn = data.get('optin') ? 'Yes' : 'No';
    var subject;
    var lines;

    if (mode === 'order') {
      subject = 'Kihap Cards order from ' + name;
      lines = [
        'Hi Kihap Cards,', '',
        "I'd like to order the Kihap! Cards set for $99.", '',
        'Name: ' + name,
        'Email: ' + email,
        'Quantity: ' + String(data.get('quantity') || '1'),
        'Phone: ' + String(data.get('phone') || '').trim(),
        'Shipping address: ' + String(data.get('address') || '').trim(),
        'Email updates opt-in: ' + optedIn, '',
        'Thank you!'
      ];
    } else {
      subject = 'Kihap Cards question from ' + name;
      lines = [
        'Hi Kihap Cards,', '',
        String(data.get('message') || '').trim(), '',
        'Name: ' + name,
        'Email: ' + email,
        'Email updates opt-in: ' + optedIn
      ];
    }

    var gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=kihapcards%40gmail.com&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
    window.location.href = gmailUrl;
    dialog.close();
  });
}());
