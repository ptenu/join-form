import React from 'react';

import './scss/style.scss';

import BeforeStart from './steps/BeforeStart'
import PersonDetails from './steps/PersonalDetails'
import Address from './steps/Address'
import Email from './steps/Email'
import Eligibility from './steps/Eligibility'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 0,
      steps: [
        { title: 'Before you start', component: BeforeStart },
        { title: 'Personal details', component: PersonDetails },
        { title: 'Home address', component: Address },
        { title: 'Contact preferences', component: Email },
        { title: 'Almost done', component: Eligibility }
      ]
    }

    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
  }

  prev(e) {
    let current = this.state.currentPage
    this.setState({
      currentPage: current - 1
    })
  }

  next(e) {
    let current = this.state.currentPage
    this.setState({
      currentPage: current + 1
    })
  }

  render() {
    let CurrentStepTag = this.state.steps[this.state.currentPage].component;

    return (
      <article className="join-form">
        <header>
          <h2>
            {this.state.steps[this.state.currentPage].title}
          </h2>
        </header>

        <CurrentStepTag onDone={this.next} onBack={this.prev}></CurrentStepTag>
        
      </article>
    )
  }
}

export default App;
