import React, { Component } from "react";

class Form extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1>Get Started</h1>
        <p>Lorem ipsum dolor sit amet, consecte</p>
        <form className="form" id="example-form">
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
              className="form__helper-text"
              aria-hidden="hidden"
            >
              Username
            </div>
          </div>
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
            <label className="form__label--hidden" htmlFor="category">
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
          <div className="form__group">
            <div className="form__radio-group">
              <input type="radio" id="option1" name="options" value="option1" />
              <label htmlFor="option1" className="form__label">
                Option 1
              </label>
            </div>
            <div className="form__radio-group">
              <input type="radio" id="option2" name="options" value="option2" />
              <label htmlFor="option2" className="form__label">
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
              <label htmlFor="option3" className="form__label">
                Option 3
              </label>
            </div>
          </div>
        </form>
        <button className="btn btn-primary">Call to Action</button>
      </div>
    );
  }
}

export default Form;
