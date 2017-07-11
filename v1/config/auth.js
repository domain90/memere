// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1087922281309246', // your App ID
        'clientSecret'  : 'mysecretproject', // your App Secret
        'callbackURL'   : 'http://localhost:8000/auth/facebook/callback'
    }

    // 'googleAuth' : {
    //     'clientID'      : 'your-secret-clientID-here',
    //     'clientSecret'  : 'your-client-secret-here',
    //     'callbackURL'   : 'http://localhost:8000/auth/google/callback'
    // }

};
