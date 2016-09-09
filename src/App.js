import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './App.css';

// Containers
import IssuesContainer from './containers/IssuesContainer';

class App extends Component {
constructor(){
    super();
    this.state = {};
  }

  componentWillMount(){
    this.getIssues();
  }
  render() {
    let allIssues = _.map(this.state.allIssues, (issue) => {
      return <li key={issue.id}>
               <strong>{issue.title}</strong>
               <a href={issue.user.url} >
                 <img className="avatar-small" src={issue.user.avatar_url} alt={issue.user.login}/>
               </a>
               <p>
                 {issue.body}
               </p>
                 <span className="status" data-status={issue.state}>{issue.state}</span>
                 <span> Created: {issue.created_at}</span><br />
             </li>
    });

    return (
      <div>
        <ol className="timeline group">
          {allIssues}
        </ol>
        <IssuesContainer />
      </div>
    );
  }
  getIssues(query = "mysite") {
    let issues = `https://api.github.com/repos/pebutler3/${query}/issues?state=all`;
    axios.get(issues).then((response) => {
      this.setState({
        allIssues: response.data,
      });
    });
  };
}


export default App;
