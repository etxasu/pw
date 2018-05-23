# Carbon Footprint Pledge Tracking App
Copyright 2017 Adam Gaetano, Andrew Negri, Jacob Crouse, Raed Alarfaj, Timothy Dirusso

## Install and run
1. `git clone` this repo
2. `cd` to the root dir of the repo
3. `npm i` to install dependencies
4. `npm start` to run the server
5. navigate to `http://localhost:3000/` to see the page

## Compile-on-save
Once your local server is running (see above steps), you can open a new terminal and type `npm run watch`
to have client JavaScript files re-compiled when you save them. Then you just have to refresh the page
in your browser to see the effects.

## To set up MongoDB on your system
1.  Install MongoDB with node package manager `npm install mongodb --save` in the root directory
2.  Setup a location to store your database files (/srv/mongodb is the default path, for a new path use `mongod --dbpath /path/to/new/dbfile`)
3.  You can access the Mongo console via `mongo`
4.  For more help with varying operating systems see [Mongo Setup Help](https://docs.mongodb.com/manual/tutorial/getting-started/ "Setup Help")
5.  For MongoDB commands like creating a new database see [Mongo Command Hep](https://www.tutorialspoint.com/mongodb/index.htm "Command Help")

## `import`ing CSS/SCSS files
Now CSS/SCSS files can be `import`ed into client JavaScript files. Thanks to webpack!

## SCSS files
Now SCSS may be used instead of CSS. Just use `.scss` extension and `import` into JS file. See here for info about SCSS: https://sass-lang.com/

## Links
[Scrum Board](https://trello.com/b/lact40ms/carbon-footprint-pledge-tracking-application "Trello")

[Slack](https://carbonfootprintapp.slack.com/ "Slack")

[Repository](https://github.com/jcrouse2-asu/carbon_footprint "GitHub")
