import { Request, Response, NextFunction } from 'express';
import Contact from "../models/contacts";
import {UserDisplayName} from "../../util";

export function DisplayContactListPage(req: Request, res: Response, next: NextFunction) {
    {

        Contact.find().then(function (data) {
            // console.log(data)
            res.render('index', {
                title: 'Contact List', page: "contact-list",
                contacts: data, displayName: UserDisplayName(req)
            });
        }).catch(function (err) {
            console.error("Encountered an Error reading from the Database: " + err);
            res.end();
        });
    }
}

export function DisplayAddPage(req: Request, res: Response, next: NextFunction): void {
    res.render('index', { title: 'Add Contact',page: "edit",
        contact: '', displayName: UserDisplayName(req)});
};

export function DisplayEditPage(req: Request, res: Response, next: NextFunction): void {
    //obtained from the passed in id:
    let id = req.params.id

    Contact.findById(id).then(function (contactToEdit){
        //pass the id to the dband read/obtain contact
        res.render('index',{title:'Edit', page:"edit",
            contact: contactToEdit, displayName:UserDisplayName(req)});

    }).catch(function (err) {
        console.error("failed to retrieve contact from Database" + err);
        res.end();
    });
};

export function ProcessAddPage(req: Request, res: Response, next: NextFunction): void {
    //instantiate a new contact
    let newContact = new Contact(
        {
            "FullName": req.body.fullName,
            "ContactNumber": req.body.contactNumber,
            "EmailAddress": req.body.emailAddress
        }
    );
    //insert contact in database
    Contact.create(newContact).then(function (contactToEdit){
        //new contact has been successfully added
        res.redirect("/contact-list");
    }).catch(function (err) {
        console.error("failed to add contact" + err);
        res.end();
    });
};

// ProcessEditPage Controller
export function ProcessEditPage(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id

    //instantiate a new object
    let updatedContact = new Contact(
        {
            "_id": id,
            "FullName": req.body.fullName,
            "ContactNumber": req.body.contactNumber,
            "EmailAddress": req.body.emailAddress
        }
    );
    //insert in database
    Contact.updateOne({_id: id},updatedContact).then(function (contactToEdit){

        //edit contact was successful
        res.redirect("/contact-list");
    }).catch(function (err) {
        console.error("failed to edit contact" + err);
        res.end();
    });
};

// ProcessDeletePage Controller
export function ProcessDeletePage(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    Contact.deleteOne({_id: id}), (err: Error) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    };
};

