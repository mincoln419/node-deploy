const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;
const logger = require('../logger');

const User = require('../models/user');

module.exports = () => {
    passport.use(new kakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback'
    }, async (accessToken, refreshToken, profile, done) => {

        //카카오에서 전달받은 profile 정보
        logger.info('kakaoprofile', profile);
        try{
            const exUser = await User.findOne({
                where: {snsId: profile.id, provider: 'kakao'}
            });

            if(exUser){
                done(null, exUser);
            }else{
                const newUser = await User.create({
                    email: profile._json && profile._json.kakao_account_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao'
                });
                done(null, newUser);
            }

        }catch(error){
            logger.error(error);
            done(error);
        }
    }));
};