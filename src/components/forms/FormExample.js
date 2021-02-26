import React, { Component } from "react";
import Input from "./Input";
import Button from "../elements/Button";

class Form extends Component {
  state = {
    form: {
      username: {
        inputType: "input",
        labelConfig: {
          display: false,
          label: "Username",
        },
        config: {
          type: "text",
          placeholder: "Username",
        },
        helper: "Username",
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        inputType: "input",
        labelConfig: {
          display: false,
          label: "Password",
        },
        config: {
          type: "password",
          placeholder: "Password",
        },
        helper: "",
        value: "",
        validation: {
          required: false,
        },
        valid: false,
        touched: false,
      },
      description: {
        inputType: "textarea",
        labelConfig: {
          display: false,
          label: "Description",
        },
        label: "Description",
        config: {
          placeholder: "Description",
        },
        helper: "Description",
        value: "",
        validation: {
          required: true,
          maxLength: 30,
        },
        valid: false,
        touched: false,
      },
      categories: {
        inputType: "select",
        labelConfig: {
          display: true,
          label: "Categories",
        },
        config: {
          options: [
            { value: "option1", displayValue: "Option 1" },
            { value: "option2", displayValue: "Option 2" },
          ],
        },
        value: "option1",
        valid: true,
      },
      points: {
        inputType: "points",
        labelConfig: {
          display: true,
          label: "Points",
        },
        config: {
          placeholder: "",
        },
        helper: "",
        value: 0,
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const formData = {};
    for (let inputIdentifier in this.state.form) {
      formData[inputIdentifier] = this.state.form[inputIdentifier].value;
    }
    console.log(formData);
    //Make request and pass data.
  };

  checkValidity = (value, rules) => {
    if (!rules) {
      return true;
    }
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedForm = { ...this.state.form };
    const updatedFormInput = { ...updatedForm[inputIdentifier] };
    updatedFormInput.value = event.target.value;
    updatedFormInput.valid = this.checkValidity(
      updatedFormInput.value,
      updatedFormInput.validation
    );
    updatedFormInput.touched = true;
    updatedForm[inputIdentifier] = updatedFormInput;

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      form: updatedForm,
      formIsValid: formIsValid,
    });
  };

  pointsIncrementHandler = (inputIdentifier, operator) => {
    console.log(inputIdentifier);
    let updatedForm = { ...this.state.form };
    let updatedInput = this.state.form[inputIdentifier];
    operator == "plus" ? updatedInput.value++ : updatedInput.value--;
    updatedForm[inputIdentifier] = updatedInput;
    this.setState({
      form: updatedForm,
    });
  };

  render() {
    const formInputArray = [];
    for (let key in this.state.form) {
      formInputArray.push({
        id: key,
        config: this.state.form[key],
      });
    }

    let formOuput = (
      <form onSubmit={this.submitHandler} className="form" id="example-form">
        {formInputArray.map((formInput) => (
          <Input
            key={formInput.id}
            inputType={formInput.config.inputType}
            inputConfig={formInput.config.config}
            value={formInput.config.value}
            labelConfig={formInput.config.labelConfig}
            helper={formInput.config.helper}
            isValid={!formInput.config.valid}
            shouldValidate={formInput.config.validation}
            touched={formInput.config.touched}
            changed={(event) => this.inputChangeHandler(event, formInput.id)}
            pointsHandler={this.pointsIncrementHandler}
          />
        ))}
        {/* <div className="form__group form__group--points">
          <label className="form__label" htmlFor="points">
            Points
          </label>
          <div className="form__points-control">
            <FiMinus
              className="form__icon points-minus"
              aria-controls="points"
              onClick={(event) =>
                this.pointsIncrementHandler("points", "minus")
              }
            ></FiMinus>
            <input
              onChange={(event) => this.inputChangeHandler(event, "points")}
              className="form__input--points form__input"
              name="points"
              id="points"
              type="number"
              value={this.state.form.points.value}
            ></input>
            <FiPlus
              className="form__icon points-plus"
              aria-controls="points"
              onClick={(event) => this.pointsIncrementHandler("points", "plus")}
            ></FiPlus>
          </div>
        </div> */}
        <Button btnColor="green" disabled={!this.state.formIsValid}>
          Call to Action
        </Button>
      </form>
    );

    return (
      <div className="form-container">
        <h1>Get Started</h1>
        <p>Lorem ipsum dolor sit amet, consecte</p>
        {formOuput}
      </div>
    );
  }
}

export default Form;
