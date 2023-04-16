"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const contacts_1 = __importDefault(require("../models/contacts"));
const util_1 = require("../../util");
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home', page: "home", displayName: "" });
});
router.get('/home', function (req, res, next) {
    res.render('index', { title: 'Home', page: "home", displayName: "" });
});
router.get('/about', function (req, res, next) {
    res.render('index', { title: 'About Us', page: "about", displayName: "" });
});
router.get('/projects', function (req, res, next) {
    res.render('index', { title: 'Our Projects', page: "projects", displayName: "" });
});
router.get('/services', function (req, res, next) {
    res.render('index', { title: 'Our Services', page: "services", displayName: "" });
});
router.get('/contact', function (req, res, next) {
    res.render('index', { title: 'Contact Us', page: "contact", displayName: "" });
});
const auth_1 = require("../controller/auth");
router.get('/login', auth_1.DisplayLoginPage);
router.post('/login', auth_1.ProcessLoginPage);
router.get('/register', auth_1.DisplayRegisterPage);
router.post('/register', auth_1.ProcessRegisterPage);
router.get('/logout', auth_1.ProcessLogoutPage);
router.get('/contact-list', util_1.AuthGaurd, function (req, res, next) {
    contacts_1.default.find().then(function (data) {
        res.render('index', {
            title: 'Contact List', page: "contactlist",
            contacts: data, displayName: (0, util_1.UserDisplayName)(req)
        });
    }).catch(function (err) {
        console.error("Encountered an Error reading from the Database: " + err);
        res.end();
    });
});
router.get('/add', util_1.AuthGaurd, function (req, res, next) {
    res.render('index', { title: 'Add Contact', page: "edit",
        contact: '', displayName: (0, util_1.UserDisplayName)(req) });
});
router.post('/add', util_1.AuthGaurd, function (req, res, next) {
    let newContact = new contacts_1.default({
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });
    contacts_1.default.create(newContact).then(function (contactToEdit) {
        res.redirect("/contact-list");
    }).catch(function (err) {
        console.error("failed to add contact" + err);
        res.end();
    });
});
router.get('/delete/:id', util_1.AuthGaurd, function (req, res, next) {
    let id = req.params.id;
    contacts_1.default.deleteOne({ _id: id }).then(function (contactToEdit) {
        res.redirect("/contact-list");
    }).catch(function (err) {
        console.error("failed to delete contact from database" + err);
        res.end();
    });
});
router.get('/edit/:id', util_1.AuthGaurd, function (req, res, next) {
    let id = req.params.id;
    contacts_1.default.findById(id).then(function (contactToEdit) {
        res.render('index', { title: 'Edit', page: "edit",
            contact: contactToEdit, displayName: (0, util_1.UserDisplayName)(req) });
    }).catch(function (err) {
        console.error("failed to retrieve contact from Database" + err);
        res.end();
    });
});
router.post('/edit/:id', util_1.AuthGaurd, function (req, res, next) {
    let id = req.params.id;
    let updatedContact = new contacts_1.default({
        "_id": id,
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });
    contacts_1.default.updateOne({ _id: id }, updatedContact).then(function (contactToEdit) {
        res.redirect("/contact-list");
    }).catch(function (err) {
        console.error("failed to edit contact" + err);
        res.end();
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map