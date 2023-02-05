export const checkValidityForm = (number, password) => {
    if(number.trim().length < 5) {
        return "Длина телефона должен быть больше 5 символов!";
    } else if(password.trim().length < 6) {
        return "Длина пароля должен быть больше 6 символов!"
    } else if(/[a-zA-zа-я]/g.test(password)) {
        return "Пароль не должен содержать буквы!";
    }

    return "";
}