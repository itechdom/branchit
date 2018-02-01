import React from "react";

export const LEAF_TYPES = {
  "GREEN": 0,
  "RED-ORGANGE": 1,
  "YELLOW": 2
};

export class Leaf extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>leaf</div>;
  }
}