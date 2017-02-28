<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1 style="color:seagreen">Todos</h1>
        <img src="../assets/logo.png" height="100" width="100" style="position:absolute;top:-109px;margin-left: 40px">
        <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo">
      </header>
      <section class="main" v-show="todos.length" v-cloak>
        <input class="toggle-all" type="checkbox" v-model="allDone">
        <ul class="todo-list">
          <li v-for="todo in filteredTodos" class="todo" :key="todo.id" :class="{ completed: todo.completed, editing: todo == editedTodo }">
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed">
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <input class="edit" type="text" v-model="todo.title" v-todo-focus="todo == editedTodo" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)"
              @keyup.esc="cancelEdit(todo)">
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length" v-cloak>
        <span class="todo-count">
          <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
        </span>
        <ul class="filters">
          <li><a href="#/all" :class="{ selected: visibility == 'all' }" @click="show('all')">All</a></li>
          <li><a href="#/active" :class="{ selected: visibility == 'active' }" @click="show('active')">Active</a></li>
          <li><a href="#/completed" :class="{ selected: visibility == 'completed' }" @click="show('completed')">Completed</a></li>
        </ul>
        <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
      Clear completed
    </button>
      </footer>
    </section>
    <footer class="info" style="font-size:larger">
      Double-click to edit a todo
    </footer>
  </div>
</template>

<script>
  // localStorage persistence
  var STORAGE_KEY = 'todos-vuejs-2.0'

  var todoStorage = {
    fetch: function () {
      var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      todos.forEach(function (todo, index) {
        todo.id = index
      })
      todoStorage.uid = todos.length
      return todos
    },
    save: function (todos) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
  }

  // visibility filters
  var filters = {
    all: function (todos) {
      return todos
    },
    active: function (todos) {
      return todos.filter(function (todo) {
        return !todo.completed
      })
    },
    completed: function (todos) {
      return todos.filter(function (todo) {
        return todo.completed
      })
    }
  }

  var app = {
    name: 'app',
    data() {
      return {
        todos: todoStorage.fetch(),
        newTodo: '',
        editedTodo: null,
        visibility: 'completed'
      }
    },
    // watch todos change for localStorage persistence
    watch: {
      todos: {
        handler: function (todos) {
          todoStorage.save(todos)
        },
        deep: true
      }
    },
    // computed properties
    computed: {
      filteredTodos: function () {
        return filters[this.visibility](this.todos)
      },
      remaining: function () {
        return filters.active(this.todos).length
      },
      allDone: {
        get: function () {
          return this.remaining === 0
        },
        set: function (value) {
          this.todos.forEach(function (todo) {
            todo.completed = value
          })
        }
      }
    },
    filters: {
      pluralize: function (n) {
        return n === 1 ? 'item' : 'items'
      }
    },
    // methods that implement data logic.
    // note there's no DOM manipulation here at all.
    methods: {
      addTodo: function () {
        var value = this.newTodo && this.newTodo.trim()
        if (!value) {
          return
        }
        this.todos.push({
          id: todoStorage.uid++,
          title: value,
          completed: false
        })
        this.newTodo = ''
      },
      removeTodo: function (todo) {
        this.todos.splice(this.todos.indexOf(todo), 1)
      },
      editTodo: function (todo) {
        this.beforeEditCache = todo.title
        this.editedTodo = todo
      },
      doneEdit: function (todo) {
        if (!this.editedTodo) {
          return
        }
        this.editedTodo = null
        todo.title = todo.title.trim()
        if (!todo.title) {
          this.removeTodo(todo)
        }
      },
      cancelEdit: function (todo) {
        this.editedTodo = null
        todo.title = this.beforeEditCache
      },
      removeCompleted: function () {
        this.todos = filters.active(this.todos)
      },
      show: function(v) {
        this.visibility = v;
      }
    },
    directives: {
      'todo-focus': function (el, value) {
        if (value) {
          el.focus()
        }
      }
    }
  }

  export default app;
</script>

<style>

</style>