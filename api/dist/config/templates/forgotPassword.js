"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordHtml = void 0;
exports.forgotPasswordHtml = `<div>
<h1>Hello {{name}}</h1>
<h1>Go to the following link to reset your password</h1>
<a
  href="https://roomy-app.netlify.app/reset-password/{{id}}/validation/{{token}}"
>Reset password</a>
</div>`;
//# sourceMappingURL=forgotPassword.js.map