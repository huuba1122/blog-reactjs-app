const validateInput = (type, checkingText) => {
    if(!checkingText){
        return {
            isCheck: false,
            message: 'This fields required!'
        }
    }
    if(type === 'email') {
        if(checkingText.length > 200){
            return {
                isCheck: false,
                message: 'Maximum of 200 characters!'
            }
        }
        const emailRegex = /^(\w+[_\-.]*\w+)+@(\w+[_\-.]*\w+)+(\.\w{2,4})$/;
        if(!emailRegex.test(checkingText)){
            return {
                isCheck: false,
                message: 'Email is invalid!!'
            }
        }
        return true;
    }

    if(type === 'password'){
        if(checkingText.length < 6){
            return {
                isCheck: false,
                message: 'Minimum of 6 characters!'
            }
        }

        return true;
    }

    if(type === 'name') {
        if(checkingText.length > 100){
            return {
                isCheck: false,
                message: 'Maximum of 100 characters!'
            }
        }
        return true
    }
}

export default validateInput;