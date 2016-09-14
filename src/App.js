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
          urlState: 'all'
        };
    }

    setUrlStateToOpen(){
      this.setState({
        urlState: 'open'
      })
    }

    testFunc() {
      console.log('made it!')
    }

    componentWillMount(){
        this.getIssues();
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

        // let allIssues = {this.state.allIssues, (issue) {
        //                   return <li>
        //                 })}

        return (
            <div>
                <button className="open" onClick={this.setUrlStateToOpen.bind(this)}>Open</button>
                <button className="open" onClick={this.testFunc}>test</button>
                <ol className="timeline group">
                    {allIssues}
                </ol>
                <h1>{this.state.urlState}</h1>
                <IssuesContainer />
            </div>
        );
    }
    getIssues(query = "roadmap", userTest='pebutler3') {
        let issues = 'https://api.github.com/repos/' + userTest + '/' + query + '/issues?state=' + this.state.urlState;
        axios.get(issues).then((response) => {
            this.setState({
                allIssues: response.data,
            });
            console.log(response.data)
        });
    };

}


export default App;
