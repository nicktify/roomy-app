"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.html = void 0;
exports.html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .container {
      width: 600px;
    }
    .text {
      font-size: 20px;
      width: 100%;
      opacity: 0.8;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .button {
      padding: 10px;
      background-color: #69C1AC;
      width: 200px;
      margin: auto;
      border-style: none;
      border-radius: 20px;
    }
    .link {
      text-decoration: none;
      color: white;
      font-weight: bold;
      font-size: 20px;
    }
  </style>
</head>
<body>
  <div class='container'>
    <p class='text'>
      Hello, thanks for filling the form to register on roomy app. We are really happy to have you as a user.
      Please, in order to have the full user experience, you need to confirm your email by clicking the following button.
    </p>
    <button class='button'>
      <a class="link" href="https://roomy-app-api.herokuapp.com/users/email-confirmation/{{id}}/special-info/{{token}}">
        Confirm email
      </a>
    </button>
    <p class='text'>
      If you need help please send an email to supportemail@roomyapp.com.ar<br>
      We will be back to you as soon as posible.
    </p>
  </div>
</body>
</html>`;
//# sourceMappingURL=emailConfirmation.js.map