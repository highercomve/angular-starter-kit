## Angular Starter Kit

Angular Starter Kit is a boilerplate project to build web applications with
Angular. This include:

- Browserify support
- Gulp for automatization
- Babel for all the application
- Angular
- UI-router

#### Instalation

```
git clone https://github.com/highercomve/angular-starter-kit newApp
cd newApp
npm install
```

#### Main Gulp task

```bash
gulp build
```

This task is for build the assets for development, that means no minify (JS,CSS or HTML)
but transforms all html/partials to and angular $templateCache with ngHTML2JS.

```bash
gulp serve
```

Open a server in port 8000 for development with livereload

```dist
gulp dist
```

Create a folder dist, with de minify version of the files. This files are ready
for production environments.

```bash
gulp serve:dist
```

A local server to serve the files on dist folder.
