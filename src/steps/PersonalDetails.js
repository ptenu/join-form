import React from 'react'
import { DateTime, Interval } from 'luxon'

import ErrorList from '../components/ErrorList'

class PersonalDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name_first: '',
            name_last: '',
            dob_day: 0,
            dob_month: 0,
            dob_year: 0,
            errors: []
        }

        this.updateState = this.updateState.bind(this)
        this.next = this.next.bind(this)
        this.prev = this.prev.bind(this)
        this.validateDob = this.validateDob.bind(this)
        this.validateName = this.validateName.bind(this)
    }

    updateState(e) {
        const name = e.target.name
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        this.setState({
            [name]: value
        })
    }

    next(e) {
        this.errors = []

        let passed = true

        if (!this.validateName()) {
            passed = false
        }

        if (!this.validateDob()) {
            passed = false
        }

        if (passed) {
            this.props.onDone(e)
            return
        }

        this.setState({
            errors: this.errors
        })
    }

    prev(e) {
        this.props.onBack(e)
    }

    validateName() {
        if (this.state.name_first == false || this.state.name_last == false) {
            this.errors.push("Please provide your full name.")
            return false
        }

        return true
    }

    validateDob() {
        if (this.state.dob_year == false || this.state.dob_month == false || this.state.dob_day == false) {
            this.errors.push("Please enter your date of birth.")
            return false
        }

        let dob = new DateTime.fromObject({
            year: Number(this.state.dob_year),
            month: Number(this.state.dob_month),
            day: Number(this.state.dob_day)
        })

        if (!dob.isValid) {
            this.errors.push(`Please provide a valid date of birth; ${dob.invalidExplanation}.`)
            return false
        }

        let age = Interval.fromDateTimes(dob, DateTime.local())

        if (age.length('years') > 99) {
            this.errors.push(`Please enter a more recent date.`)
            return false
        }

        if (age.length('years') < 16) {
            this.errors.push(`You must be over 16 to join the Union.`)
            return false
        }

        return true
    }

    render() {
        return (
            <div>
                <ErrorList errors={this.state.errors}></ErrorList>

                <fieldset className="tg-field">
                    <legend className="field-title">Full name</legend>
                    <div className="flex">
                        <label>
                            <input name="name_first"
                                type="text"
                                data-width="10"
                                autoComplete="given-name"
                                value={this.state.name_first}
                                onChange={this.updateState} />

                            <p className="hint">First Name</p>
                        </label>
                        <label>
                            <input name="name_last"
                                type="text"
                                data-width="10"
                                autoComplete="family-name"
                                value={this.state.name_last}
                                onChange={this.updateState} />
                            <p className="hint">Last Name</p>
                        </label>
                    </div>
                </fieldset>

                <fieldset className="tg-field">
                    <legend className="field-title">Date of Birth</legend>
                    <p className="hint">
                        We'll use this to make sure you're eligible and to confirm your
                        identity in the future.
                    </p>
                    <div className="flex">
                        <label>
                            <input name="dob_day" type="number" data-width="2" onChange={this.updateState} autoComplete="bday-day" />
                            <p className="hint">Day</p>
                        </label>
                        <label>
                            <input name="dob_month" type="number" data-width="2" onChange={this.updateState} autoComplete="bday-month" />
                            <p className="hint">Month</p>
                        </label>
                        <label>
                            <input name="dob_year" type="number" data-width="4" onChange={this.updateState} autoComplete="bday-year" />
                            <p className="hint">Year</p>
                        </label>
                    </div>
                </fieldset>

                <footer className="tg-form-footer">
                    <button onClick={this.prev}>Back</button>
                    <button onClick={this.next} className="color-green">Save & Next</button>
                </footer>
            </div>
        )
    }
}

export default PersonalDetails