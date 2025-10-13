class FormField {
    constructor(label, textFieldObject) {
        this.label = label;
        this.textFieldObject = textFieldObject;
        this.validator = () => { return true; };
    }

    getValue() {
        return this.textFieldObject.value;
    }

    getLabel() {
        return this.label;
    }

    setValidator(validator) {
        this.validator = validator;
    }

    validate() {
        return this.validator(this.getValue());
    }
}

class Form {
    constructor(submitButton, errorMessage) {
        this.fields = [];
        this.submitButton = submitButton;
        this.errorMessage = errorMessage;
        this.onSubmit = (_) => { console.log("Form does nothing right now."); };

        submitButton.addEventListener("click", () => { this.submit(); });
        this.errorMessage.innerHTML = "";
    }

    addField(field) {
        this.fields.push(field);
    }

    setOnSubmit(onSubmit) {
        this.onSubmit = onSubmit;
    }

    setErrorMessage(message) {
        this.errorMessage.innerHTML = message;
    }

    submit() {
        console.log("Submitted form!");
        let formData = {};

        for (let i = 0; i < this.fields.length; i++) {
            let field = this.fields[i];
            let validation = field.validate();
            if (validation === true) {
                formData[field.getLabel()] = field.getValue();
            }
            else {
                this.setErrorMessage(validation);
                return validation;
            }
        }

        this.onSubmit(formData);
        this.setErrorMessage("");
        return true;
    }
}
