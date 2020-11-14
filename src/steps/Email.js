import React from 'react'

import ErrorList from '../components/ErrorList'


class Email extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            errors: [],
            email: '',
            consent: false,
            verified: false,
            show_verify: false,
            verify_code: ''
        }

        this.updateState = this.updateState.bind(this)
        this.next = this.next.bind(this)
        this.verifyInput = this.verifyInput.bind(this)
    }

    updateState(e) {
        const name = e.target.name
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        this.setState({
            [name]: value
        })
    }

    next() {
        this.errors = []

        if (!this.state.email) {
            this.errors = ["Please enter an email address"]
        }

        if (!this.state.verify_code && this.state.show_verify) {
            this.errors = ["Please enter your verification code."]
        }

        this.setState({
            errors: this.errors
        })
        if (this.errors.length > 0) {
            return
        }

        if (this.state.verified) {
            this.props.onDone()
        }

        this.setState({
            show_verify: true
        })
    }

    verifyInput(props) {
        if (this.state.show_verify === false) {
            return ''
        }

        return (
            <section className="tg-field">
                <label>
                    <h3 className="field-title">Enter verification code</h3>
                    <p className="hint">
                        We've sent a verification code to the email address you entered above, please enter
                        it here to continue.
                    </p>
                    <input name="verify_code"
                        type="number"
                        data-width="5"
                        autoComplete="off"
                        value={this.state.verify_code}
                        onChange={this.updateState} />
                </label>
            </section>
        )
    }

    render() {
        let VerifyInput = this.verifyInput

        return (
            <div>
                <ErrorList errors={this.state.errors}></ErrorList>

                <label className="tg-field">
                    <h3 className="field-title">Email Address</h3>
                    <input name="email"
                        type="email"
                        data-width="20"
                        autoComplete="email"
                        value={this.state.email}
                        disabled={this.state.show_verify}
                        onChange={this.updateState} />
                </label>


                <h3 className="field-title">Preferences</h3>
                <p>
                    We'll always send you emails to do with your membership or important Union business, however you can
                    chose if you'd like to receive emails about events and campaigns.
                </p>
                <section className="tg-field">
                    <div className="tg-checkbox">
                        <input name="consent"
                            id="consent_box"
                            type="checkbox"
                            className="tg-checkbox"
                            value={this.state.consent}
                            onChange={this.updateState} />
                        <label htmlFor="consent_box">
                            I would like to receive emails about events and campaigns.
                        </label>
                    </div>
                </section>

                <VerifyInput></VerifyInput>

                <footer className="tg-form-footer">
                    {!this.state.show_verify && (<button className="color-blue" onClick={this.next}>Save</button>)}
                    {this.state.show_verify && (<button className="color-green" onClick={this.next}>Next</button>)}
                </footer>
            </div>
        )
    }
}

export default Email