"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailConfirmation = void 0;
const fs = require('fs');
const emailConfirmation = () => {
    return fs.readFile('/emailConfirmation.html', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
    });
};
exports.emailConfirmation = emailConfirmation;
//# sourceMappingURL=emails.js.map