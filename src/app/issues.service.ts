import { Injectable } from '@angular/core';
import { Issue } from './issue';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private issues: Issue[];

  constructor() {
    this.issues = this.getStoredIssues();
  }

  getPendingIssues(): Issue[] {
    return this.issues.filter(issue => !issue.completed);
  }

  completeIssue(issue: Issue) {
    const selectedIssue: Issue = {
      ...issue,
      completed: new Date()
    };
    const index = this.issues.findIndex(i => i === issue);
    this.issues[index] = selectedIssue;
    this.storeIssues();
  }

  updateIssue(issue: Issue) {
    const index = this.issues.findIndex(i => i.issueNo === issue.issueNo);
    this.issues[index] = issue;
    this.storeIssues();
  }

  createIssue(issue: Issue) {
    issue.issueNo = this.issues.length + 1;
    this.issues.push(issue);
    this.storeIssues();
  }

  getSuggestions(title: string): Issue[] {
    if (title.length > 3) {
      return this.issues.filter(issue => issue.title.indexOf(title) !== -1);
    }

    return [];
  }

  getStoredIssues(): Issue[] {
    const issues = localStorage.getItem('issues')
    return issues ? JSON.parse(issues) : [];
  }

  storeIssues() {
    localStorage.setItem('issues', JSON.stringify(this.issues));
  }
}
