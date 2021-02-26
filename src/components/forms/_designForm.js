import React, { Component } from "react";
import Input from "./Input";

class Form extends Component {
  state = {
    formData: {
      username: {
        inputType: "input",
        label: "Username",
        config: {
          type: "text",
          placeholder: "Username",
          helper: "Add Username",
        },
        value: "",
      },
      password: {
        inputType: "input",
        config: {
          type: "password",
          placeholder: "Password",
          helper: "Password",
        },
        value: "",
      },
      description: {
        inputType: "textarea",
        config: {
          placeholder: "Description",
          helper: "Description",
        },
        value: "",
      },
      categories: {
        inputType: "select",
        elementConfig: {
          options: [
            { value: "option1", displayValue: "Option 1" },
            { value: "option2", displayValue: "Option 2" },
          ],
        },
      },
      color: {},
      points: {},
    },
  };

  render() {
    return (
      <div className="form-container">
        <h1>Get Started</h1>
        <p>Lorem ipsum dolor sit amet, consecte</p>
        <form className="form" id="example-form">
          <Input
            inputType="input"
            inputConfig={this.state.formData.username.config}
            value=""
            label={this.state.formData.username.label}
          />
          <div className="form__group">
            <label className="form__label--hidden" htmlFor="username">
              Username
            </label>
            <input
              className="form__input"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              aria-controls="helper-text__username"
              aria-describedby="helper-text__username"
            ></input>
            <div
              id="helper-text__username"
              className="form__helper-text form__helper-text--active"
              aria-hidden="hidden"
            >
              Username
            </div>
          </div>
          <div className="form__group">
            <label className="form__label--hidden" htmlFor="description">
              Description
            </label>
            <textarea
              className="form__input"
              name="desecription"
              id="description"
              rows="4"
              placeholder="Type Description..."
            ></textarea>
            <div
              id="helper-text__description"
              className="form__helper-text form__helper-text--active"
              aria-hidden="hidden"
            >
              Description
            </div>
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="category">
              Category
            </label>
            <select className="form__select" name="category" id="category">
              <option value="default" disabled hidden>
                Categories
              </option>
              <option value="arts">Arts &amp; Crafts</option>
              <option value="games">Games</option>
              <option value="toys">Toys</option>
            </select>
          </div>
          <div className="form__group form__group--points">
            <label className="form__label" htmlFor="points">
              Points
            </label>
            <div className="form__points-control">
              <div className="points-control--minus"></div>
              <input
                className="form__input--points form__input"
                name="points"
                id="points"
                type="text"
              ></input>
              <div className="points-control--plus"></div>
            </div>
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="options">
              Colors
            </label>
            <div className="form__radio-group">
              <input type="radio" id="option1" name="options" value="option1" />
              <label htmlFor="option1" className="form__label--radio">
                Option 1
              </label>
            </div>
            <div className="form__radio-group">
              <input type="radio" id="option2" name="options" value="option2" />
              <label htmlFor="option2" className="form__label--radio">
                Option 2
              </label>
            </div>
            <div className="form__radio-group">
              <input
                type="radio"
                id="option3"
                name="options"
                value="option3"
              ></input>
              <label htmlFor="option3" className="form__label--radio">
                Option 3
              </label>
            </div>
          </div>
          <button className="btn btn-primary">Call to Action</button>
        </form>
      </div>
    );
  }
}

export default Form;
