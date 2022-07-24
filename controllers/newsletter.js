const { google } = require('googleapis');
const { StatusCodes } = require('http-status-codes');

const authSheets = async () => {
  //Function for authentication object
  const auth = new google.auth.GoogleAuth({
    keyFile: 'intricate-tempo-355007-2b01ca5164af.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  //Create client instance for auth
  const authClient = await auth.getClient();

  //Instance of the Sheets API
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  return {
    auth,
    authClient,
    sheets,
  };
};
const id = '1dk9XKws9SY9-RgYDjb08aoePeo5GTccPDJ6dykOTG-U';
const getEmails = async (req, res) => {
  const { sheets } = await authSheets();

  // Read rows from spreadsheet
  const getRows = await sheets.spreadsheets.values.get({
    spreadsheetId: id,
    range: 'Sheet1',
  });

  res.send(getRows.data);
};
const addEmail = async (req, res) => {
  const { sheets } = await authSheets();
  const { email } = req.body;
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: id,
      range: 'Sheet1',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[email]],
      },
    });
    res.status(StatusCodes.OK).send('Success');
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

module.exports = { getEmails, addEmail };
