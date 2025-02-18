## Weather Project

This project has been created by a student at Parsity, an online software engineering course. The work in this repository is wholly of the student based on a sample starter project that can be accessed by looking at the repository that this project forks.

If you have any questions about this project or the program in general, visit [parsity.io](https://parsity.io/) or email hello@parsity.io.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (ES6+)
- **Module Bundler**: Webpack
- **API**: OpenWeatherMap API (or specify the API you're using)
- **Version Control**: Git

## Project Structure

```
weather-project/
├── dist/                   # Compiled and minified files
├── src/                    # Source files
│   ├── index.html          # Main HTML file
│   ├── scripts/            # JavaScript files
│   │   ├── index.js        # Entry point for JS
│   │   └── modules/        # ES6 modules
│   │       ├── api.js      # API calls
│   │       ├── dom.js      # DOM manipulation
│   │       └── utils.js    # Utility functions
├── .gitignore              # Git ignore file
├── package.json            # NPM package configuration
├── package-lock.json       # NPM package lock file
└── webpack.config.js       # Webpack configuration
```

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/tomwinskell/weather-project.git
   cd weather-project
   ```

2. **Install Dependencies**:
   Ensure you have Node.js and npm installed. Then, run:
   ```bash
   npm install
   ```

3. **API Key Configuration**:
   Obtain an API key from [OpenWeatherMap](https://openweathermap.org/api) and configure it in your project:
   - Create a `.env` file in the root directory:
     ```
     API_KEY=your_openweathermap_api_key
     ```
   - Ensure your application code accesses this key appropriately.

4. **Build the Project**:
   To bundle the JavaScript modules and prepare the project for deployment:
   ```bash
   npm run build
   ```
   This will generate the `dist/` directory with the compiled files.

5. **Start the Development Server**:
   For development purposes, you can start a local server with hot reloading:
   ```bash
   npm start
   ```
   This utilizes `webpack-dev-server` for serving the project locally.

## Deployment

To deploy the application:

1. **Build for Production**:
   Ensure the code is optimized for production:
   ```bash
   npm run build
   ```
   This updates the `dist/` directory with the latest production-ready code.

2. **Serve the `dist/` Directory**:
   Deploy the contents of the `dist/` directory to your preferred hosting service (e.g., GitHub Pages, Netlify, Vercel).

## Webpack Configuration

The project uses Webpack to bundle JavaScript modules. Below is an overview of the `webpack.config.js`:

```javascript
const path = require('path');

module.exports = {
  entry: './src/scripts/index.js', // Entry point for the application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Output bundle
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Transpile ES6+ to ES5
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Handle CSS imports
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000, // Development server port
    open: true, // Open browser after server starts
  },
  mode: 'development', // Set mode to development
};
```

### Key Points:

- **Entry Point**: `./src/scripts/index.js` is the main JavaScript file that imports other modules.
- **Output**: Bundled files are output to the `dist/` directory with the filename `bundle.js`.
- **Loaders**:
  - `babel-loader`: Transpiles modern JavaScript to ensure compatibility.
  - `style-loader` and `css-loader`: Processes and injects CSS into the bundle.
- **DevServer**: Configured to serve content from the `dist/` directory, with compression enabled, running on port 9000, and automatically opens the browser upon starting.

## JavaScript Module Structure

The project follows the ES6 module pattern:

- **`index.js`**: Serves as the entry point and orchestrates the application by importing necessary modules.
- **`api.js`**: Handles all API interactions, such as fetching weather data.
- **`dom.js`**: Manages DOM manipulations, updating the UI based on data.
- **`utils.js`**: Contains utility functions that assist in data processing and other repetitive tasks.

Each module is imported into `index.js` as needed:

```javascript
import { fetchWeather } from './modules/api.js';
import { updateWeatherUI } from './modules/dom.js';

// Example usage
fetchWeather('New York')
  .then(data => updateWeatherUI(data))
  .catch(error => console.error('Error fetching weather data:', error));
```

This modular approach promotes code reusability and maintainability.

---

Feel free to customize this `README.md` further based on your project's specifics and any additional features or instructions you'd like to include.
``` 