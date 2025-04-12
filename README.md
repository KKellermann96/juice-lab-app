# JuiceLab

This project is an interactive portfolio web application developed with Vue 3, TypeScript, and Three.js. The app features a 3D environment created in Blender and imported into Three.js. It also includes several sections such as a "My Projects," "About Me," page and a game I programmed during my studies.

## Demo

Visit my [portfolio website](https://kellermannk.com/) to see the app in action.

## Features

- 3D environment powered by Three.js.
- Interactive sections like **My Projects** and **About Me**.
- A fun, playable game programmed during my studies.

## Technologies Used

- **Frontend**:
  - Vue 3
  - TypeScript
  - TailwindCSS
  - Three.js
- **Backend**:
  - Node.js
  - Express
  - SQLite

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/KKellermann96/juice-lab-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd juice-lab
   ```

3. Create a `.env` file in the frontend and backend section (use the `.example.env` file as a template).

4. Build and run the app with Docker:

   ```bash
   FRONTEND_PORT=5173 BACKEND_PORT=7003 docker-compose up -d --build
   ```

5. Open the app in your browser at `http://localhost:5173`.

## Usage

- You can click, drag, and zoom through the 3D Juice Shop world.
- The navigation buttons allow you to explore different sections of the portfolio.
- More detailed instructions are available within the app.

## License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

**Note:** While the code is open-source and free to use, **personal content**, such as information in the "About Me" section and specific projects, is copyrighted and cannot be reused without explicit permission.

## Acknowledgements

This project is inspired by the works of **Jesse Zhou**. Special thanks to him and his creative interactive [ramen shop](https://jesse-zhou.medium.com/jesses-ramen-case-study-77bae77ab5f0)!

## TODO

- On mobile
  - disable double tab
  - videos dont work
