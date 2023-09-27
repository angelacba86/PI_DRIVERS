export const validate = (values) => {
    let errors = {}
    const regexImage = /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|jpeg)(\?[^\s[",><]*)?/;
    // name:
    if (!values.name) {
        errors.name = "Name is required";
    } else if (!isNaN(values.name)) {
        errors.name = "Numbers are not allowed";
    } else if (values.name.length < 3 || values.name.length > 15) {
        errors.name = "Name must have between 03 and 15 characters.";
    }
    // surname:
    if (!values.surname) {
        errors.surname = "Surname is required";
    } else if (!isNaN(values.surname)) {
        errors.surname = "Numbers are not allowed";
    } else if (values.surname.length < 3 || values.surname.length > 15) {
        errors.surname = "Surname must have between 03 and 15 characters.";
    }
    //name and surname:

    // nationality:
    if (!values.nationality) {
        errors.nationality = "Nationality is required";
    } else if (values.nationality.length < 5) {
        errors.nationality = "Nationality must have at least 5 characters";
    } else if (!isNaN(values.nationality)) {
        errors.nationality = "Numbers are not allowed";
    }
    // image:
    if(values.image){
        if (!regexImage.test(values.image)) {
            errors.image = "Invalid URL format";
        }
    }
    // dob:
    if (!values.dob) {
        errors.dob = "Date of birth is required";
    } else{
        let dateValue = new Date(values.dob);
        let limitDate = new Date("2005-09-01");
        if(isNaN(dateValue)){
            errors.dob = "Invalid date format"
        } else if(dateValue > limitDate) {
            errors.dob = "They must have been born on or after 2005-09-01.";
        }
    }
    // description:
    if (!values.description) {
        errors.description = "Description is required";
    } else if (values.description.length < 10) {
        errors.description = "The description must have at least 10 characters";
    }
    // teams:
    if (!values.teams.length) {
        errors.teams = "Teams are required";
    }
    return errors;
}