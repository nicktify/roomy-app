export const emailConfirmation = `<!DOCTYPE html>
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
</html>`

export const htmlSuccess = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Roomy app</title>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet">
  <style>
    .container {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100vh;
      align-items: center;
      background-color: #69C1AC;
    }
    .title {
      font-weight: bold;
      font-size: 60px;
      color: white;
      background-color: black;
      font-family: 'Roboto', sans-serif;
      line-height: 100px
    }
  </style>
</head>
<body>
  <div class='container'>
    <div>
      <h1 class='title'>Email confirmed. Now you can use Roomy app.</h1>
      <h1 class='title'>Thank you for your trust in our services.</h1>
    </div>
  </div>
</body>
</html>
`

export const htmlError = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Roomy app</title>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet">
  <style>
    .container {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100vh;
      align-items: center;
      background-color: #69C1AC;
    }
    .title {
      font-weight: bold;
      font-size: 60px;
      color: white;
      background-color: black;
      font-family: 'Roboto', sans-serif;
      line-height: 100px
    }
  </style>
</head>
<body>
  <div class='container'>
    <div>
      <h1 class='title'>Something went wrong. Cannot confirm the email.</h1>
      <h1 class='title'>Please try again.</h1>
    </div>
  </div>
</body>
</html>
`