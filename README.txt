TAMIL FOOD WEBSITE

FILES
- index.html: website page
- style.css: design and responsive layout
- script.js: menu, WhatsApp ordering and admin settings

HOW TO USE ADMIN SETTINGS
1. Open the website URL and add ?admin=1 at the end.
   Example: https://your-site.com/?admin=1
2. Enter your WhatsApp number with country code (Sri Lanka: 94...).
   Do not type +, spaces or dashes.
3. Add, edit or delete menu items. You can change name, category, price,
   description and image URL.
4. Press Save changes.

IMPORTANT
The admin editor saves settings in the browser/device where you use it
(localStorage). It does NOT automatically update the public website for
other customers. This is a static website. To publish changes for everyone,
update the website's script.js/config and upload the updated files to your
hosting service (for example GitHub Pages).

Use Export settings to download a backup JSON file. Use Import settings
to load that backup in another browser. This admin page is a convenience
editor, not a secure password-protected back office. Do not treat the
hidden ?admin=1 address as security.

WHATSAPP
Replace the sample number in Admin Settings with your real WhatsApp number.
Use country code format, e.g. 947XXXXXXXX.

MENU PHOTOS
You can paste a public image URL into each item's Image URL field.
