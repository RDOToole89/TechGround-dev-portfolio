import React, { Component } from 'react';
import Button from '../components/Button/Button';
import { StyledButtonWrapper, Title, Wrapper } from '../styled/StyledComponents';

export default class About extends Component {
  constructor() {
    super();

    this.state = {
      counter: 0,
    };
  }

  increase = () => {
    console.log('clicked on increase');
    console.log('state after increase => ', this.state);
    this.setState({ counter: this.state.counter + 1 });
  };

  decrease = () => {
    console.log('clicked on decrease');
    console.log('state after decrease => ', this.state);
    this.setState({ counter: this.state.counter - 1 });
  };

  render() {
    const { counter } = this.state;

    return (
      <Wrapper>
        <Title>Counter!</Title>
        <div>{counter}</div>
        <StyledButtonWrapper>
          <Button
            buttonColor='red'
            buttonOpacity={0.7}
            onClickCallback={this.decrease}
            buttonText='decrease'
          />
          <Button
            buttonColor='pink'
            buttonOpacity={0.8}
            onClickCallback={this.increase}
            buttonText='increase'
          />
        </StyledButtonWrapper>
      </Wrapper>
    );
  }
}
