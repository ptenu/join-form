import React from 'react'


class ErrorList extends React.Component {

    render() {
        let errors = this.props.errors.map((error) => (
            <li>{error}</li>
        ))

        if (errors.length < 1) {
            return null
        }

        return (
            <section className="tg-alert">
                <p>There were some problems with your answers:</p>
                <ul>
                    {errors}
                </ul>
            </section>
        )
    }
}

export default ErrorList