import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './App.css';

// Containers
import IssuesContainer from './containers/IssuesContainer';

class App extends Component {
    constructor(){
        super();
        this.state = {
          allIssues: '',
          urlState: 'all'
        }
        this.urlStateToAll = this.urlStateToAll.bind(this);
        this.urlStateToOpen = this.urlStateToOpen.bind(this);
        this.urlStateToClosed = this.urlStateToClosed.bind(this);
    }

    urlStateToAll() {
      this.getAllIssues();
    }

    urlStateToOpen() {
      this.getOpenIssues();
    }

    urlStateToClosed() {
      this.getClosedIssues();
    }

    componentWillMount() {
        this.getAllIssues();
    }

    render() {
            let allIssues = _.map(this.state.allIssues, (issue) => {
            // Date format
            let cts = issue.created_at,
                cdate = (new Date(cts)).toLocaleString();

            return <li key={issue.id}>
                      <strong>{issue.title}</strong>
                      <a href={issue.user.url} >
                          <img className="avatar-small" src={issue.user.avatar_url} alt={issue.user.login}/>
                      </a>
                      <p>
                          {issue.body}
                      </p>
                      <span className="status" data-status={issue.state}>{issue.state}</span>
                      <span> Created: { cdate }</span>
                      <br />
                  </li>
        });

        return (
            <div>
                <div className="filters">
                <h1>{this.state.urlState.toUpperCase()}</h1>
                <button className="all" onClick={this.urlStateToAll}>All</button>
                <button className="open" onClick={this.urlStateToOpen}>Open</button>
                <button className="closed" onClick={this.urlStateToClosed}>Closed</button>
                </div>
                <ol className="timeline group">
                    {allIssues}
                </ol>
                <IssuesContainer />
            </div>
        );
    }
    getAllIssues(query = 'roadmap', userTest='pebutler3', urlState='all') {
        let issues = 'https://api.github.com/repos/' + userTest + '/' + query + '/issues?client_id=' + process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET + '&state=' + urlState;
        axios.get(issues).then((response) => {
            this.setState({
                allIssues: response.data,
                urlState: 'all'
            });
        });
    };
    getOpenIssues(query = 'roadmap', userTest = 'pebutler3', urlState = 'open') {
      let openIssues = 'https://api.github.com/repos/' + userTest + '/' + query + '/issues?client_id=' + process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET + '&state=' + urlState;
      axios.get(openIssues).then((response) => {
        this.setState({
          allIssues: response.data,
          urlState: 'open'
        });
      });
    };
    getClosedIssues(query = 'roadmap', userTest = 'pebutler3', urlState = 'closed') {
      let closedIssues = 'https://api.github.com/repos/' + userTest + '/' + query + '/issues?client_id=' + process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET + '&state=' + urlState;
      axios.get(closedIssues).then((response) => {
        this.setState({
          allIssues: response.data,
          urlState: 'closed'
        });
      });
    }

}


export default App;
