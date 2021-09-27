const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');
const logger = require('../logger');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const {email, nick, password} = req.body;
    try{
        const exUser = await User.findOne({where:{email}});
        if(exUser){
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash
        });
        return res.redirect('/');
    }catch(err){
        logger.error(err);
        return next(error);
    }
});


router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError){
            logger.error(authError);
            return next(authError);
        }

        if(!user){
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.logIn(user, (loginError) => {
            if(loginError){
                logger.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req,res) => {
    req.logOut();
    req.session.destroy();
    res.redirect('/');
});


router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/'
}), (req, res) => {
    res.redirect('/');
});

module.exports = router;