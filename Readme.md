This app is designed for the VDC to use in managing vehicles that come to them for testing, allowing them to register and edit vehicles in a database, 
record test results, view archives, and several other smaller functions.

In terms of project structure, the app uses a mix of Django and React, however all the content delivery is actually primarily handled by the Django backend, and routes any 
would-be frontend content delivery through the assigned URL to the React system, which in turn delivers it to the Django backend and forward to the user. This simplifies the
hosting process as only a single server is needed, instead of separate servers for the frontend and backend.


# Build Process
Deploying a new build for either the backend or frontned is a fairly straightforward process. I've written two scripts in the root directory of the project that handle most 
of the needs.
 - reboot.sh redeploys the backend by automatically shutting the Gunicorn server down and restarting it, refreshing any backend content. If you're updating the backend while
 you have a browser window open, you don't need to refresh the page, and any subsequent server calls after the script is run will be running on the new code. Nice and easy!
 - build.sh redeploys the frontend. The server is left running, and only the various files in the /frontend folder are updated. Unfortunately, the build process doesn't
 add the necessary {static} tags to index.html, and so this needs to be updated manually. Rather than repaste the tags every time, I've configured it to build the updated
 index.html folder in /djsrc/djsrc/templates/react (/djsrc is where the main build scripts are). Open this file up via a program like Filezilla, and look at the {% static %} tags.
 There should be four of them: two towards the front of the file, and two towards the back. These are links for the various chunk files that make up the compiled frontend content.
 When doing a new build, usually only the last link (the main file) has the chunk file name updated, but sometimes larger amounts of changes will also change the link before it.
 The first two links at the start of the file almost never change, unless some kind of major overhaul has been done. Copy the new chunk file names into the existing index.html in
 the actual project's /templates/react folder, save, and refresh the page. You should be all set after that.

 # Changelog formatting
 The changelog file is formatted a specific way to be read by the changelog page in the app. When making a new entry, just following the existing format of previous entries, putting any new entries at the top of the log.
 - Place a | before the new version number to tell the page to make it a header row.
 - The date goes directly underneath. I've been using US military date formatting (day of the month followed by a three-letter abbreviation of the month in allcaps and then four digit year) for minimum ambiguity between US/European users.
 - Bug Fixes goes before Changes, and both categories will be formatted as headers.
 - Individual items should have a - in front of them, with one tab for spacing. Sub-items get a * and two tabs.
 - Don't forget to copy the notes to a release tag on Git when pushing new version changes.