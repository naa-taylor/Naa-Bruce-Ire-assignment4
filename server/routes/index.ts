import express from 'express';
const router = express.Router();

/******** TOP LEVEL ROUTES ********/

/* GET home page. */
import {
    DisplayHomePage,
    DisplayAboutUsPage,
    DisplayServicesPage,
    DisplayContactPage,
    DisplayProjectsPage
} from '../controller/index';

router.get('/', DisplayHomePage);
router.get('/about', DisplayAboutUsPage);
router.get('/services', DisplayServicesPage);
router.get('/products', DisplayProjectsPage);
router.get('/contact', DisplayContactPage);

/******** AUTHENTICATION ROUTES ********/

import {
    DisplayLoginPage,
    DisplayRegisterPage,
    ProcessLoginPage,
    ProcessRegisterPage,
    ProcessLogoutPage
} from '../controller/auth';

router.get('/login', DisplayLoginPage);
router.post('/login', ProcessLoginPage);
router.get('/register', DisplayRegisterPage);
router.post('/register', ProcessRegisterPage);
router.get('/logout', ProcessLogoutPage);

/******** CONTACT LIST ROUTES ********/

import { DisplayContactListPage, DisplayAddPage, DisplayEditPage, ProcessAddPage,
    ProcessEditPage, ProcessDeletePage } from '../controller/contact-list';

router.get('/contact-list', DisplayContactListPage);

router.get('/add', DisplayAddPage);
// Display edit page
router.get('/edit/:id', DisplayEditPage);

router.post('/add',ProcessAddPage);

// Process edit page
router.post('/edit/:id', ProcessEditPage);

// Process delete page
router.get('/delete/:id',ProcessDeletePage);

export default router;
