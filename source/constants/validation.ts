const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRegExp = /^[a-zA-z\d]{8,20}$/;
const nameRegExp = /^[a-zA-Zа-яА-Я' ]{2,18}$/;
const dateLength = 10;
const minYear = 1950;
const maxYear = 2005;

export { emailRegExp, passwordRegExp, nameRegExp, dateLength, minYear, maxYear };
