import React from 'react'

class BeforeStart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.next = this.next.bind(this)
    }

    next(e) {
        if (false) {
            return
        }

        this.props.onDone(e)
    }

    render() {
        return (
            <div>
                <p>
                    You'll need to provide your name, date of birth, address, and some information about your
                    living arrangements. This will be explained on each page.
                </p>
                <p>
                    We'll use this information to administer your membership and to organise campaigns. We'll also
                    use it to help you if you get in touch with a problem you're having.
                </p>
                <p>
                    Membership has a monthly cost, and we'll ask you to chose a rate and pay by card as part of this 
                    form. The payment is processed by a certified third party payments provider (Stripe.com) and your card
                    details will be stored by them so we can renew your membership each month.
                </p>
                <blockquote>
                    <p>
                        Do not use the back button in your browser while completing this form, as you
                        will lose your progress.
                    </p>
                </blockquote>
                <footer className="tg-form-footer">
                    <button className="color-green" onClick={this.next}>Start &#10132;</button>
                </footer>
            </div>
        )
    }
}

export default BeforeStart