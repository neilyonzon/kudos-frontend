import React, { Component } from "react";

class Form extends Component {
  state = {};

  render() {
    return (
      <div>
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
            <select className="form__input" name="category" id="category">
              <option value="arts">Arts &amp; Crafts</option>
              <option value="games">Games</option>
              <option value="toys">Toys</option>
            </select>
          </div>
        </form>
        <button className="btn btn-primary">Call to Action</button>
      </div>
    );
  }
}

export default Form;
