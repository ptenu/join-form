import React from 'react'

import YesNo from '../components/YesNo'

class Eligibility extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            landlord: null,
            own_house: null,
            restricted_job: null,
            pays_rent: null
        }

        this.updateState = this.updateState.bind(this)
    }

    updateState(e) {
        const name = e.target.name
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <p>
                    We just need to check a few things before you finish.
                </p>

                <YesNo name="own_house" displayIf={true} onChange={this.updateState}>
                    <legend className="field-title">Do you own the house you live in?</legend>
                    <p className="hint">
                        This includes if you own part of your house or have a mortgage.
                    </p>
                </YesNo>

                <YesNo name="pays_rent" displayIf={this.state.own_house != null} onChange={this.updateState}>
                    <legend className="field-title">Do you pay rent to live there?</legend>
                    <p className="hint">
                        This can include any 'consideration' (anything with value - including work, favours, non-monetary goods
                        or contributing to the cost of running the house).
                    </p>
                </YesNo>

                <YesNo name="landlord" displayIf={this.state.pays_rent != null} onChange={this.updateState}>
                    <legend className="field-title">Do you receive any rental income?</legend>
                    <p className="hint">
                        This does not include where you pay the rent on behalf of someone else, who then pays you back.
                    </p>
                </YesNo>

                <YesNo name="restricted_job" displayIf={this.state.landlord != null} onChange={this.updateState}>
                    <legend className="field-title">Does your job involve planning or carrying out evictions?</legend>
                </YesNo>

                {this.state.restricted_job != null && (
                    <footer className="tg-form-footer">
                        <button onClick={this.next} className="color-green">Save & Next</button>
                    </footer>
                )}
            </div>
        )
    }
}

export default Eligibility