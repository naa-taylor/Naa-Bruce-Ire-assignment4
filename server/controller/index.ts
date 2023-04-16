import { Request, Response, NextFunction } from 'express';


export const DisplayHomePage = (req: Request, res: Response, next: NextFunction) => {
    res.render('index', { title: 'Home',page: "home",displayName:"" });
};

export const DisplayAboutUsPage = (req: Request, res: Response, next: NextFunction) => {
    res.render('index', { title: 'About Us',page: "about",displayName:"" });
};

export const DisplayServicesPage = (req: Request, res: Response, next: NextFunction) => {
    res.render('index', { title: 'Our Services',page: "services",displayName:"" });
};

export const DisplayProjectsPage = (req: Request, res: Response, next: NextFunction) => {
    res.render('index', { title: 'Our Projects',page: "projects",displayName:"" });
};

export const DisplayContactPage = (req: Request, res: Response, next: NextFunction) => {
    res.render('index', { title: 'Contact Us',page: "contact",displayName:"" });
};
