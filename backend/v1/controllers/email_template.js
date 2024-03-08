const HTML_TEMPLATE = (text) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Loumni System</title>
          <style>
            .container {
              width: 100%;
              height: 100%;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .email {
              width: 80%;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
            }
            .email-header {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
            .email-body {
              padding: 20px;
            }
            .email-footer {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email">
              <div class="email-header">
                <h1>Onboarding/Verification</h1>
              </div>
              <div class="email-body">
                <h2>${text}</h2>
              </div>
              <div class="email-footer">
                <h2>Thanks!<br>Godwin Ikpe Ugbe<br>- Lead Dev</h2>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
}

module.exports = HTML_TEMPLATE;