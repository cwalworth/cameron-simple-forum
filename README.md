# Start
* Head over to the [Firestore](https://console.firebase.google.com) page
* Create a new project
## Set up Authentication
* Click on Authentication > Sign-in Method
  * Set Email/Password to `Enabled`. It's the only one that'll work with this repo currently. I may add more later.
## Set up Firestore database
* Click on Database > Cloud Firestore > Rules
 `service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}`
## Set up your workspace

### Install your node modules
`npm i`
### Verify everything runs on localhost:3000
`npm run start`
### Set up your Environment Variables
* Create a new directory in the root directory called **env**
```
REACT_APP_API_KEY=<this is your Firebase API key>  Gear icon > Project Settings > General > Web API Key
REACT_APP_AUTH_DOMAIN=<this is your firebase domain> Develop > Hosting > one of the two default domain names
REACT_APP_PROJECT_ID=<app name> Gear icon > Project Settings > General > Project ID (usually the same as the sub domain)
REACT_APP_MESSAGING_SENDER_ID=<can be found on Firebase> Gear icon > Project Settings > Cloud Messaging > Sender ID
REACT_APP_ADMIN=<the email address of the admin>
```
### Set up Firebase
* If you don't already have the Firebase CLI, run the command `npm i -g firebase-tools`
*[Reference](https://firebase.google.com/docs/cli)*
* `firebase login` should bring up an OAuth login in your client
### Initialize Firebase on your app
* `firebase init`
* Use space to select **Firestore** and **Hosting**, then press enter
* Yes, `firestore.rules` should be used for Firestore Rules
* No, don't overwrite it (or do, it shouldn't break anything)
* Yes, `firestore.indexes.json` should be used for FIrestore indexes
* No, don't overwrite it (or do, it shouldn't break anything)
* For public directory, type in `build` and hit enter
* Yes, configure as a single-page app
* If build/index.html already exists, overwriting it or not won't really make a difference because you'll be rebuilding before deploy anyway. 
Should be ready to rock and roll now

### Build the app
`npm run build`
**This creates the build directory that will be deployed to Firebase**

### Deploy!!1
`firebase deploy`

**If deployed successfully, you should receive a firebase link at the end. Make sure everything works**
