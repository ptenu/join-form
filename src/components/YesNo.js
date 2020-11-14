import React from 'react'

class YesNo extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.displayIf && (
                    <fieldset className="tg-field">
                        {this.props.children}

                        <span className="tg-checkbox">
                            <input type="radio" name={this.props.name} id={this.props.name+'_yes'} value={true} onChange={this.props.onChange} />
                            <label htmlFor={this.props.name+'_yes'}>
                                Yes
                            </label>
                        </span>

                        <span className="tg-checkbox">
                            <input type="radio" name={this.props.name} id={this.props.name+'_no'} value={false} onChange={this.props.onChange} />
                            <label htmlFor={this.props.name+'_no'}>
                                No
                            </label>
                        </span>
                    </fieldset>
                )}
            </React.Fragment>
        )
    }
}

export default YesNo