const xlsx = require("xlsx");
const client = require("../redisConfig");

const validateFile = (req, res) => {
  let errors = [];
  const { filename } = req.params;
  const INTEGER = "Value must be an integer value";
  const _isInteger = { mask: /^[0-9]*$/ };

  const TEXT = "Value must be a string value";

  const PHONE =
    "Value must be a standar  10 digit phone number (I.e. 780000000)";
  const _isPhone = {
    mask: /^\d{9}$/,
  };

  const EMAIL = "Invalid email";
  const _isEmail = {
    mask: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  };

  const validNID = (row, element, errors) => {
    const COLUMN = "NID";
    let validNID = _isInteger.mask.test(element[COLUMN]);
    if (!validNID) {
      let rowError = row + 2;
      errors.push({
        row: rowError,
        column: COLUMN,
        message: INTEGER,
        value: element[COLUMN],
      });
    }
  };

  const validPhone = (row, element, errors) => {
    const COLUMN = "Phone Number";
    let validPhone = _isPhone.mask.test(element[COLUMN]);
    if (!validPhone) {
      let rowError = row + 2;
      errors.push({
        row: rowError,
        column: COLUMN,
        message: PHONE,
        value: element[COLUMN],
      });
    }
  };

  const validEmail = (row, element, errors) => {
    const COLUMN = "Email";
    let validEmail = _isEmail.mask.test(element[COLUMN]);
    if (!validEmail) {
      let rowError = row + 2;
      errors.push({
        row: rowError,
        column: COLUMN,
        message: EMAIL,
        value: element[COLUMN],
      });
    }
  };

  const validGender = (row, element, errors) => {
    const COLUMN = "Gender";
    if (typeof element[COLUMN] !== "string") {
      let rowError = row + 2;
      errors.push({
        row: rowError,
        column: COLUMN,
        message: TEXT,
        value: element[COLUMN],
      });
    }
  };

  const validName = (row, element, errors) => {
    const COLUMN = "Names";
    if (typeof element[COLUMN] !== "string") {
      let rowError = row + 2;
      errors.push({
        row: rowError,
        column: COLUMN,
        message: TEXT,
        value: element[COLUMN],
      });
    }
  };

  const validateExcel = (rows) => {
    for (let i = 0; i < rows.length; i++) {
      let element = rows[i];
      validNID(i, element, errors);
      validPhone(i, element, errors);
      validEmail(i, element, errors);
      validGender(i, element, errors);
      validName(i, element, errors);
    }
    return errors;
  };

  client.get(`${filename}`, (err, response) => {
    const wb = xlsx.readFile(`${response}`);
    const ws = wb.Sheets["Sheet1"];
    const data = xlsx.utils.sheet_to_json(ws);
    const getErrors = validateExcel(data);
    if (errors.length > 0) {
      res.send(getErrors);
    } else {
      res.send("File validated successfull with no errors");
    }
  });
};

module.exports = validateFile;
