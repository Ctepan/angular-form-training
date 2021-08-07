import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.scss']
})
export class IssueEditComponent implements OnInit {
  issueForm: FormGroup | undefined;

  @Input() issue: Issue | null = null;
  @Output() formClose = new EventEmitter();

  constructor(private issuesService: IssuesService, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.issueForm = this.builder.group({
      title: [this.issue?.title, Validators.required],
      description: [this.issue?.description],
      priority: [this.issue?.priority, Validators.required]
    })
  }

  close() {
    this.formClose.emit();
  }

  editIssue() {
    if (this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }

    if (!this.issue) {
      return
    }

    this.issuesService.updateIssue({ ...this.issue, ...this.issueForm?.value });
    this.formClose.emit();
  }
}
