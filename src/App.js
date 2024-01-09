import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const colorsList = ['red', 'yellow', 'blue', 'green', 'orange']

class App extends Component {
  state = {
    isTrue: false,
    isShow: false,
    website: '',
    userName: '',
    password: '',
    passwordsList: [],
    searchInput: '',
  }

  onChangeWebsite = e => {
    this.setState({website: e.target.value})
  }

  onChangeUsername = e => {
    this.setState({userName: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()

    const {website, userName, password} = this.state
    const classValue = colorsList[Math.floor(Math.random() * 5)]
    const newPasswords = {
      id: uuidv4(),
      website,
      userName,
      password,
      classValue,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswords],
      website: '',
      userName: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  onChangeUserInput = e => {
    this.setState({searchInput: e.target.value})
  }

  render() {
    const {
      website,
      userName,
      password,
      passwordsList,
      isShow,
      searchInput,
    } = this.state
    let {isTrue} = this.state
    const newList = passwordsList.filter(eachValue =>
      eachValue.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="upper-container">
          <form className="card-container" onSubmit={this.onSubmitForm}>
            <h1 className="heading">Add New Password</h1>
            <div className="website-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                alt="website"
                className="website"
              />
              <hr className="line" />
              <input
                className="input"
                onChange={this.onChangeWebsite}
                value={website}
                placeholder="Enter Website"
                type="text"
              />
            </div>
            <div className="name-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                alt="username"
                className="website"
              />
              <hr className="line" />
              <input
                className="input"
                onChange={this.onChangeUsername}
                value={userName}
                placeholder="Enter Username"
                type="text"
              />
            </div>
            <div className="password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                alt="password"
                className="website"
              />
              <hr className="line" />
              <input
                className="input"
                onChange={this.onChangePassword}
                value={password}
                placeholder="Enter Password"
                type="password"
              />
            </div>
            <button type="submit" className="button">
              Add
            </button>
          </form>

          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager"
          />
        </div>
        <div className="lower-container">
          <div className="my-password-container">
            <h1 className="heading2">Your Password</h1>
            <p className="span">{newList.length}</p>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search"
              />
              <hr className="line" />
              <input
                type="search"
                className="input2"
                placeholder="Search"
                onChange={this.onChangeUserInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="line2" />
          <div className="show-password-cont">
            <input id="check" type="checkbox" onChange={this.showPassword} />
            <label htmlFor="check" className="label">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords"
              />
              <p>No passwords</p>
            </div>
          )}
          {!isTrue && (
            <ul className="new-passwords-order">
              {newList.map(eachPass => (
                <li
                  key={eachPass.id}
                  id={eachPass.id}
                  className="password-list"
                >
                  <div>
                    <p>{eachPass.website}</p>
                    <p>{eachPass.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars"
                      />
                    )}
                    {isShow && <p>{eachPass.password}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
