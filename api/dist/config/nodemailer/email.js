const fs = require('fs');
const emailConfirmation = async () => {
    const file = await fs.readFile('./templates/emailConfirmation.ts', 'utf8', (error, data) => {
        console.log(data);
    });
    return file;
};
//# sourceMappingURL=email.js.map