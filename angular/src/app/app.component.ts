import { Component, OnInit } from '@angular/core';
import { TodoStore, Todo } from './services/store';
import '../assets/css/styles.css';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
	todoStore: TodoStore;
	newTodoText = '';
	visibility = 'all';
	filters: any;
	filteredTodos: any;
	
	constructor(todoStore: TodoStore, private route: ActivatedRoute) {
		this.todoStore = todoStore;
		this.filters = {
			all: function (todos: Array<Todo>) {
				return todos
			},
			active: function (todos: Array<Todo>) {
				return todos.filter(function (todo) {
					return !todo.completed
				})
			},
			completed: function (todos: Array<Todo>) {
				return todos.filter(function (todo) {
					return todo.completed
				})
			}
		}
	}

	ngOnInit() {
		const url: Observable<string> = this.route.url.map(segments => segments.join(''));
		url.subscribe((p) => {
			this.visibility = p ? p : 'all';
			this.filteredTodos = this.filters[this.visibility](this.todoStore.todos);
		});
	}

	stopEditing(todo: Todo, editedTitle: string) {
		todo.title = editedTitle;
		todo.editing = false;
	}

	cancelEditingTodo(todo: Todo) {
		todo.editing = false;
	}

	updateEditingTodo(todo: Todo, editedTitle: string) {
		editedTitle = editedTitle.trim();
		todo.editing = false;

		if (editedTitle.length === 0) {
			return this.todoStore.remove(todo);
		}

		todo.title = editedTitle;
	}

	editTodo(todo: Todo) {
		todo.editing = true;
	}

	removeCompleted() {
		this.todoStore.removeCompleted();
	}

	toggleCompletion(todo: Todo) {
		this.todoStore.toggleCompletion(todo);
	}

	remove(todo: Todo) {
		this.todoStore.remove(todo);
	}

	addTodo() {
		if (this.newTodoText.trim().length) {
			this.todoStore.add(this.newTodoText);
			this.newTodoText = '';
		}
	}
}