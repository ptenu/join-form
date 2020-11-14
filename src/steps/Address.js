import React from 'react'
import axios from 'axios'

import ErrorList from '../components/ErrorList'


class Address extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            errors: [],
            lookup_addr: '',
            lookup_postcode: '',
            address: {},
            manual: false
        }

        this.next = this.next.bind(this)
        this.updateState = this.updateState.bind(this)
        this.lookupUrl = this.lookupUrl.bind(this)
        this.lookupAddress = this.lookupAddress.bind(this)
        this.foundAddress = this.foundAddress.bind(this)
        this.postCodeFinder = this.postCodeFinder.bind(this)
        this.manualAddressForm = this.manualAddressForm.bind(this)
        this.setManual = this.setManual.bind(this)
        this.updateAddress = this.updateAddress.bind(this)
    }

    updateState(e) {
        const name = e.target.name
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        this.setState({
            [name]: value
        })
    }

    next() {
        if (!this.state.address.line_1 || !this.state.address.city || !this.state.address.post_code) {
            this.setState({
                errors: ["You must provide a complete address."]
            })
            return
        }

        this.props.onDone()
    }

    updateAddress(e) {
        const name = e.target.name
        const value = e.target.value;

        let addr = this.state.address
        addr[name] = value

        this.setState({
            address: addr
        })
    }

    lookupUrl() {
        const key = 'y3V1QQfbXEmFhZg0BAC72Q28948'
        return `https://api.getAddress.io/find/${this.state.lookup_postcode}/${this.state.lookup_addr}?api-key=${key}&expand=true`
    }

    lookupAddress() {
        let url = this.lookupUrl()
        axios.get(url).then((response) => {
            let pc = response.data.postcode
            let addr = response.data.addresses[0]

            this.setState({
                address: {
                    line_1: addr.line_1,
                    locality: addr.locality,
                    city: addr.town_or_city,
                    post_code: pc
                }
            })
        }).catch((error) => {
            this.setState({
                errors: [
                    "There was a problem finding your address. Try entering it manually."
                ],
                manual: true,
                address: []
            })
        })
    }

    foundAddress(props) {
        if (Object.keys(this.state.address).length === 0 || this.state.manual) {
            return ''
        }

        let locality = ''
        if (props.address.locality != '') {
            locality = (<span>{props.address.locality}<br /></span>)
        }

        return (
            <section>
                <h3>Address</h3>
                <blockquote>
                    <p>
                        {props.address.line_1} <br />
                        {locality}
                        {props.address.city} <br />
                        {props.address.post_code}
                    </p>
                </blockquote>
                <button onClick={this.setManual}>Enter address manually</button>
                <button className="color-green" onClick={this.next}>This is my address</button>
            </section>
        )
    }

    postCodeFinder(props) {
        if (Object.keys(this.state.address).length > 0 || this.state.manual) {
            return ''
        }

        return (
            <fieldset className="tg-field">
                <legend className="field-title">Find your address</legend>
                <div className="flex">
                    <label>
                        <input name="lookup_addr" type="text" data-width="4" onChange={this.updateState} />
                        <p className="hint">
                            House <br />
                            Number
                        </p>
                    </label>
                    <label>
                        <input name="lookup_postcode" type="text" data-width="10" onChange={this.updateState} autoComplete="postal-code" />
                        <p className="hint">
                            Post Code
                        </p>
                    </label>
                </div>

                <button className="color-blue" onClick={this.lookupAddress}>Find Address</button>
            </fieldset>
        )
    }

    manualAddressForm(props) {
        if (this.state.manual === false) {
            return ''
        }
        return (
            <fieldset className="tg-field">
                <legend className="field-title">Manually enter your address</legend>
                <label>
                    <p className="hint">
                        House and street
                        </p>
                    <input name="line_1" type="text" data-width="20" autoComplete="address-line1" onChange={this.updateAddress} value={this.state.address.line_1} />
                </label>

                <label>
                    <p className="hint">
                        Locality (District / Area)
                        </p>
                    <input name="locality" type="text" data-width="20" autoComplete="address-line2" onChange={this.updateAddress} value={this.state.address.locality} />
                </label>

                <label>
                    <p className="hint">
                        Town / City
                        </p>
                    <input name="city" type="text" data-width="20" autoComplete="address-level2" onChange={this.updateAddress} value={this.state.address.city} />
                </label>

                <label>
                    <p className="hint">
                        Post Code
                        </p>
                    <input name="post_code" type="text" data-width="10" autoComplete="postal-code" onChange={this.updateAddress} value={this.state.address.post_code} />
                </label>

                <footer className="tg-form-footer">
                    <button className="color-green" onClick={this.next}>Save & Next</button>
                </footer>
            </fieldset>
        )
    }

    setManual() {
        this.setState({
            manual: true
        })
    }

    render() {

        let FoundAddress = this.foundAddress
        let PostCodeFinder = this.postCodeFinder
        let ManualAddressForm = this.manualAddressForm

        return (
            <div>
                <p className="hint">
                    We need your address so we know you live in or near Peterborough, and so we can help
                    you if you have any issues with your tenancy.
                </p>

                <ErrorList errors={this.state.errors}></ErrorList>

                <PostCodeFinder></PostCodeFinder>

                <FoundAddress address={this.state.address}></FoundAddress>

                <ManualAddressForm></ManualAddressForm>
            </div>
        )
    }
}

export default Address