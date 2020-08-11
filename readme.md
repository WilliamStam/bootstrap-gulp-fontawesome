# requirements

have node installed and running. we use node for our build process

verify with `npm --version`

# setup

from a cmd/terminal run `npm install` from the root folder (where `package.json` lives)

to run the build tool `gulp build`.

this takes everything in assets directory and places it into the public dir building as it goes. 

# folders

the build tool basicaly replaces "assets" in the path with "public". so if your file is `assets/css/home.scss` it will build to `public/css/home.css` 


## scss 

any folder named with a scss extention, gulp will look inside for a file called `index.scss` and run that and output the file as the foldername.css (ie: styles.scss/index.scss becomes styles.css)

assets/css/index.scss
```
@import "./variables";
@import "./font-awesome/font-awesome.scss";
@import "./bootstrap/bootstrap.scss";
@import "./_typography";
@import "./_navbar";
@import "./page";
```

## js

the same as per above for js files. only if it finds a folder like assets/js/libraries.js it will look for an `index.js` file inside it and concat the list of files into a single file called the folder name in public (`public/js/libraries.js`)

assets/js/libraries.js
```
[
    "../../../node_modules/jquery/dist/jquery.js",
    "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
    "./plugins/jquery.ba-dotimeout.min.js",
    "./_toolbar.js"
]
```

# fonts

since we include font-awesome (https://fontawesome.com/icons?d=gallery&s=brands,light,regular,solid&m=free) running `gulp build` will copy the font files from the node_modules folder into `public/fonts/` for you. 


# images

any images found in `assets/images` will be copied to `public/images`

# auto building

run `gulp watch` for it to monitor the assets dir, if any file is changed it will auto build for you. 

### vscode

if you run VS Code then enable automatic folder tasks (ctrl + shift + p -> Tasks: Manage automatic tasks in folder -> enable) and it will run gulp build for you whenever you open the folder