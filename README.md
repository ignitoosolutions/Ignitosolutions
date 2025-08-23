# IgnitoSolutions Website

This repository contains the source code for **IgnitoSolutions**, a modern re‑imagining of the original NexusCore Solutions website.  The project includes a full‑stack web application written in Python using the Flask framework together with a responsive, multi‑page front‑end.  Administrators can securely log in to manage services and view customer inquiries, while visitors experience a polished, elegant interface styled in black and gold.

## Features

- **Rebranding** – All occurrences of the old company name have been replaced with **IgnitoSolutions**, and the new slogan *“Igniting Ideas, Connecting the World”* is prominently displayed below the main tagline.
- **Responsive Design** – The site is built with mobile first principles.  Navigation collapses into a hamburger menu on small screens and the layout adapts gracefully across devices.
- **Premium Aesthetic** – A deep black background paired with rich gold accents provides a high‑end feel.  Each service card features a bespoke thumbnail rendered in golden tones.
- **Services & Pricing** – Services are stored in a relational database and rendered dynamically.  Prices reflect the updated tiers: starting prices, fixed price, bundle call‑to‑action or tailored pricing.  The Financial Support service has been removed and two new offerings (Offshore Teams and Lead Generation) have been added.
- **Shopping Cart** – Customers can add services to a cart without page reloads.  The cart slides in from the right and uses a golden icon badge for the item count.  Removing items and viewing totals are both supported on the client side.
- **Contact & Orders** – Visitors may send messages through the contact form.  Submissions and orders are saved in the database and visible from the admin dashboard.
- **Admin Portal** – A secure `/admin` area allows the site owner to log in (credentials are seeded during database creation) to add, edit or delete services and review orders and messages.  Passwords are hashed and salted using Werkzeug’s security helpers.
- **Legal Pages** – Compliant, professional **Privacy Policy** and **Terms & Conditions** pages are included and linked from the footer.

## Getting Started

The application requires Python 3.9 or newer.  To run the site locally:

1. **Install dependencies**

   ```bash
   cd ignitosolutions
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Initialize the database and seed data**

   The database will be created automatically the first time the server runs.  A default administrator account (`admin` / `admin123`) and seven service records are inserted at startup if no data exists.

3. **Run the application**

   ```bash
   python app.py
   ```

   By default the server listens on `http://127.0.0.1:5000/`.  Open this URL in your browser to explore the public site.  The admin portal is available at `http://127.0.0.1:5000/admin/login`.

## Customising the Admin Account

The initial administrator username and password are defined in `app.py` during the `seed_data()` function.  To change them, update the `DEFAULT_ADMIN_USERNAME` and `DEFAULT_ADMIN_PASSWORD` constants in that file and delete the existing `database.db` file before restarting the application.  The next run will create a new administrator with your chosen credentials.

## File Structure

```
ignitosolutions/
├── app.py                # Flask application and route definitions
├── requirements.txt      # Python package requirements
├── README.md             # This documentation
├── database.db           # SQLite database created at runtime
├── templates/            # Jinja2 HTML templates
│   ├── base.html         # Common layout and navigation
│   ├── index.html        # Home page
│   ├── login.html        # Admin login form
│   ├── dashboard.html    # Admin dashboard to manage services, orders and contacts
│   ├── service_form.html # Form for adding/editing a service
│   ├── privacy-policy.html   # Privacy Policy content
│   └── terms-and-conditions.html # Terms & Conditions content
└── static/
    ├── css/style.css     # Custom stylesheets
    ├── js/script.js      # Front‑end interactivity and animations
    └── images/           # Logos and service thumbnails
```

## Notes

* The **Privacy Policy** and **Terms & Conditions** pages include standard clauses regarding data collection, cookies and limitations of liability, as recommended by industry resources【10021289160884†L413-L423】【215114038918918†L114-L124】.  If your jurisdiction requires additional notices you should amend those pages accordingly.
* Cart functionality is intentionally simple and does not process payments.  To integrate payment processing you should connect to a payment gateway and perform server‑side order validation.
* If you wish to deploy the application in production, ensure that the secret key is set via an environment variable and consider using a more robust database such as PostgreSQL.
