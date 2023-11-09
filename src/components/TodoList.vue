<template>
  <div class="listContainer">
    <TodoListItem  
      v-for="item in todosData" 
      :key="item.id" 
      :todoData="item" 
      :updateTodoHandler="updateTodoHandler" 
      :delTodoHandler="delTodoHandler"
    />
  </div>
</template>

<script>
  import TodoListItem from './TodoListItem.vue'

  export default {
    name: "TodoList",
    components:{
      TodoListItem
    },
    props:{
      todosData:{
        type:Array
      },
      updateTodoHandler:{
        type:Function
      },
      delTodoHandler:{
        type:Function
      }
    }
  };
</script>

<style>
  .listContainer{
    width: 100%;
    padding: 10px 20px;
    /* background-color: #ddd; */
    min-height: 32px;
  }
</style>
