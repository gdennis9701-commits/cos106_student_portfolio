# COS 106 — Student Portfolio and Academic Management Website

**Student:** Godwin Marvelous Dennis  
**Department:** Cyber Security  
**Institution:** Miva Open University  
**Course:** COS 106 — Introduction to Web Technologies

## Project contents

- `index.html` — homepage and student introduction
- `about.html` — biography, educational background, career aspirations, skills, hobbies, and vision
- `projects.html` — three sample project concepts with original SVG illustrations and an HTML5 video element
- `planner.html` — interactive academic task manager (add, complete, delete, filter, and save tasks in browser local storage), plus an illustrative academic table
- `contact.html` — contact form with required-field, email, and digits-only phone validation
- `styles.css` — shared responsive stylesheet using CSS Grid, Flexbox, transitions, and mobile navigation styling
- `script.js` — navigation, DOM updates, planner logic, local storage, and form validation
- `assets/` — locally stored SVG illustrations

## Run locally

1. Extract the project folder.
2. Open `index.html` in a modern browser, or use Visual Studio Code with the Live Server extension.
3. Navigate through the five pages using the top menu.

No build tools or package installation are required.

## Publish with GitHub Pages

1. Sign in to GitHub and create a new public repository, for example `cos106-student-portfolio`.
2. Upload the contents of this folder (the HTML files, `styles.css`, `script.js`, `README.md`, and `assets` folder) to the repository root.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then save.
6. Wait for GitHub Pages to publish. The website address will be shown in the Pages settings and will usually look like `https://YOUR-USERNAME.github.io/cos106-student-portfolio/`.

## Before final submission

- Replace `assets/profile.svg` with your own photograph (keep the filename `profile.svg` only if you replace it with an SVG; for a photo, update the image references in `index.html` and `about.html` to the new filename).
- Replace the sample project concepts with your own completed projects and real repository/demo links.
- Replace the sample video with a relevant project demonstration or learning video if required by your lecturer. The supplied sample video is hosted externally and needs internet access.
- Update the illustrative course table with your actual registered courses and credit units.
- The contact form currently validates in the browser only; it does not transmit messages. Connect a backend or form service if message delivery is required.
- Add your GitHub repository URL and published website URL to your submission after deployment.

## Technical features demonstrated

Semantic HTML5, navigation links, images, lists, a data table, form controls, HTML5 video, external CSS, responsive layout, Flexbox, CSS Grid, transitions, JavaScript event listeners, arrays, functions, DOM manipulation, form validation, dynamic task rendering, and local storage.
