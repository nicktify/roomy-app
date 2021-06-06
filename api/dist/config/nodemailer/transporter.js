"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
let nodemailer = require('nodemailer');
exports.transporter = nodemailer.createTransport({
    service: "gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});
//# sourceMappingURL=transporter.js.map