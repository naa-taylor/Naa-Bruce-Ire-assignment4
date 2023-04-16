import { Request, Response, NextFunction } from 'express';
import passport from "passport";
import User from '../models/user';
import jwt from 'jsonwebtoken';
import  * as DBConfig from '../config/db'
import app from "../config/app";

export function DisplayLoginPage(req: Request, res: Response){
    if(!req.user){
        return res.render('index', { title: 'Login',page: "login",
            messages : req.flash('loginMessage'), displayName:"" });
    }
    return res.redirect('/contact-list');
}
export function DisplayRegisterPage(req: Request, res: Response){
    if(!req.user){
        return res.render('index', { title: 'Register',page: "register",
            message: req.flash('registerMessage'), displayName:"" });
    }
    res.redirect('/contact-list')
};
export function ProcessLoginPage(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', function (err: Error, user: any, info: string) {
        if (err) {
            console.error(err);
            res.end(err)
        }
        if (!user) {
            req.flash('login', "Authentication Error");
            return res.redirect('/login');
        }

        req.logIn(user, function (err) {
            if (err) {
                console.error(err);
                res.end(err);
            }
            //return res.redirect('/contact-list')
            const token = jwt.sign({ username: user.username }, DBConfig.SessionSecret);
            console.log(token);
            return res.redirect('/contact-list')
        })
    })(req, res, next);
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction) {
    let newUser = new User({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + " " + req.body.lastName
    });
    User.register(newUser, req.body.password, function (err) {
        if (err) {

            if (err.name == "UserExistsError") {
                console.error('Error: User Already Exists');
                req.flash('registerMessage', 'Registration Error');
            }
            console.error('Error: server Error');
            req.flash('registerMessage', 'Server Error');
            res.redirect('/register');
        }
        return passport.authenticate('local')(req, res, function () {
            return res.redirect('/contact-list');
        })
    });
}

export function ProcessLogoutPage(req: Request, res: Response) {
    req.logOut(function (err) {
        if (err) {
            console.error(err)
            res.end(err);
        }
        return res.redirect('/login');
    });
}
export default app;