// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1087922281309246', // your App ID
        'clientSecret'  : 'f15b80955ebe88c6e3cc2e76a23c1812', // your App Secret
        'callbackURL'   : 'http://localhost:8000/auth/facebook/callback',
        'profileFields' : ['id', 'displayName', 'photos', 'email'],
        'passReqToCallback' : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    }

    // 'googleAuth' : {
    //     'clientID'      : 'your-secret-clientID-here',
    //     'clientSecret'  : 'your-client-secret-here',
    //     'callbackURL'   : 'http://localhost:8000/auth/google/callback'
    // }

};
