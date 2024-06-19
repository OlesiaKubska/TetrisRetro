# TetrisRetro

This project was generated with Angular CLI version 17.0.1.

## 🛠️ Development server
Run `ng serve` for a dev server. Navigate to [http://localhost:4200/](http://localhost:4200/). The application will automatically reload if you change any of the source files.

## 📦 Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## 🏗️ Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## 🧪 Running unit tests
Run `ng test` to execute the unit tests via Karma.

## 🧩 Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## 📚 Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

### 🚀 Routing
- Converted showing/hiding to routing.
- Two pages: Intro page and Game page.

### 📦 Services
- Created service for storing and reading player data.

### 🌐 Http
- Reading and displaying highscores.
- Added token verification and score posting.

### ⚙️ Routing Params
- Added high contrast mode controlled by route param.
- Implemented guards for game route.

### 📝 Reactive Forms
- Converted Intro page to use reactive forms.

### 🎨 High Contrast Mode Toggle
- Added functionality to toggle high contrast mode using clickable text and SVG icon.
- Updated styles to support high contrast mode across the project.

This commit enhances accessibility by allowing users to easily switch to a high contrast mode for better visibility and ensures consistent styling across the project.

## 🔧 Technologies Used
- **Angular CLI**: Version 17.0.1 for project generation and development tools.
- **ngx-tetris**: Library for integrating Tetris game functionality.
- **@Input** and **@Output**: For component communication.
- **Pipes**: For transforming data in templates.
- **ngModel**: For two-way data binding.
- **\*ngIf** and **\*ngFor**: For conditional rendering and looping in templates.
- **Reactive Forms**: For building forms with validation.
- **HttpClient**: For making HTTP requests.
- **Routing**: For navigation between Intro and Game pages.
- **Services**: For managing and sharing state across components.
- **Guards**: For protecting routes and managing access.
