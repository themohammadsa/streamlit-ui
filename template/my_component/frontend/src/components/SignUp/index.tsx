import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"
import icon from "../../assets/icon.jpeg"
import eye from "../../assets/eye.png"
import hideEye from "../../assets/hide_eye.png"
import "./styles.css"

const FRAME_HEIGHT = 1000

interface State {
  isFocused: boolean
  accountLocator: string
  username: string
  password: string
  signUpClicked: boolean
  showPassword: boolean
}

interface InputLabel {
  inputName: string
  placeholder: string
}

class Signup extends StreamlitComponentBase<State> {
  public state = {
    isFocused: false,
    accountLocator: "",
    username: "",
    password: "",
    signUpClicked: false,
    showPassword: false,
  }

  public inputLabels: InputLabel[] = [
    {
      inputName: "accountLocator",
      placeholder: "Account locator",
    },
    {
      inputName: "username",
      placeholder: "Username",
    },
    {
      inputName: "password",
      placeholder: "Password",
    }
  ]

  private handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target
    this.setState({ [name]: value } as unknown as Pick<State, keyof State>)
  }

  private handlePasswordIcon = (): void  => {
    this.setState({ showPassword: !this.state.showPassword })
  }
  
  private handleSignUp = (): void => {
    this.setState({ signUpClicked: true })
  }

  componentDidMount(): void {
    Streamlit.setFrameHeight(FRAME_HEIGHT)
  }

  componentDidUpdate(): void {
    Streamlit.setFrameHeight(FRAME_HEIGHT)
  }

  public render = (): ReactNode => {
    const { accountLocator, username, password, signUpClicked, showPassword } = this.state

    const isFocused = accountLocator !== "" && username !== "" && password !== "";
    this.setState({ isFocused });

    const renderInput = ({ inputName, placeholder }: InputLabel) => {
      if (inputName === 'password') {
        return (
          <label htmlFor={inputName} className="form-label form-password" key={inputName}>
          <input
            type={showPassword ? 'text' : 'password'}
            name={inputName}
            placeholder={placeholder}
            className="form-input"
            value={String(this.state[inputName as keyof typeof this.state])}
            onChange={this.handleInputChange}
          />
          {inputName === 'password' && (
            <img
              src={!showPassword ? eye : hideEye}
              alt="eye"
              className="eye"
              onClick={this.handlePasswordIcon}
            />
          )}
        </label>
        )
      }
      return (
        <label htmlFor={inputName} className="form-label" key={inputName}>
          <input
            type="text"
            name={inputName}
            placeholder={placeholder}
            className="form-input"
            value={String(this.state[inputName as keyof typeof this.state])}
            onChange={this.handleInputChange}
          />
        </label>
      );
    };

    return (
      <div className="container-signup flex-center">
        <div className="title">
          <img src={icon} alt="logo" className="logo" />
          <h1>samooha</h1>
        </div>
        <h2 className="subtitle">Sign up using Snowflake account</h2>
        <br />
        <form className="form flex-center">
          {this.inputLabels.map((label: InputLabel) => renderInput(label))}
        </form>
        <br />
        <p className="agreement">
          By signing up, I agree to the{" "}
          <a href="https://samooha.tech" target="_blank" rel="noreferrer" className="link">Terms of Service</a> and{" "}
          <a href="https://samooha.tech" target="_blank" rel="noreferrer" className="link">Privacy Policy</a>.
        </p>
        <button
          onClick={this.handleSignUp}
          className="btn btn-signup"
          disabled={!isFocused || signUpClicked}
        >
          Sign up
        </button>
        {signUpClicked && <p className="msg success">Success! You have signed up.</p>}
        <br />
        <p className="note">
          Note: You can later login to Samooha as a <br /> 
          <b>Provider</b> or a <b>Consumer</b>
        </p>
      </div>
    )
  }

}

export default withStreamlitConnection(Signup)
