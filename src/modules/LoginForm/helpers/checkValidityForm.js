export const checkValidityForm = (number, password) => {
    if(number.trim().length < 5) {
        return "Длина телефона должен быть больше 5 символов!";
    } else if(password.trim().length < 4) {
        return "Длина пароля должен быть больше 4 символов!"
    }

    return "";
}