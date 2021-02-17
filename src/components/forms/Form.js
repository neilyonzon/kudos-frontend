import React, { Component } from "react";
import Input from "./Input";

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
        helper: "Password",
        value: "",
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
        helper: "",
        value: "",
      },
      color: {
        inputType: "radio",
        labelConfig: {
          display: true,
          label: "Colors",
        },
        config: {
          options: [
            { value: "red", displayValue: "Red" },
            { value: "blue", displayValue: "Blue" },
            { value: "green", displayValue: "Green" },
          ],
        },
        helper: "",
        value: "",
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

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedForm = { ...this.state.form };
    const updatedFormInput = { ...updatedForm[inputIdentifier] };
    updatedFormInput.value = event.target.value;
    updatedForm[inputIdentifier] = updatedFormInput;
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
            changed={(event) => this.inputChangeHandler(event, formInput.id)}
          />
        ))}

        <button className="btn btn-primary">Call to Action</button>
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
