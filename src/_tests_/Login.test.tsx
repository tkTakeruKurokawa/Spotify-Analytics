import React from "react";
import renderer from "react-test-renderer";
import Login from "../Login";

it("Login test", () => {
  const component = renderer.create(<Login />);
  expect(component).toMatchSnapshot();
});
