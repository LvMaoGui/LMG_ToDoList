<template>
  <div class="todo-header">
    <input type="text" class="todo-header-inp" placeholder="请输入任务名称" ref="inpEl"/>
    <button class="todo-header-btn" @click="addHandler">添加</button>
  </div>
</template>

<script>
  import {nanoid} from 'nanoid'
  export default {
    name: "TodoHeader",
    methods:{
      addHandler(){
        if(!this.$refs.inpEl.value.trim()){
          return
        }
        const name = this.$refs.inpEl.value
        const todoData = {
          name,
          done:false,
          id:nanoid()
        }
        this.$refs.inpEl.value = ''
        this.$emit('addTodoHandler',todoData)
        // this.addTodoHandler(todoData)
      }
    },
    props:{
      addTodoHandler:{
        type:Function
      }
    }
    
  };
</script>

<style>
  .todo-header {
    padding: 10px 20px;
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }
  .todo-header-inp {
    width: 100%;
    border: 1px solid #ddd;
    height: 32px;
    padding: 5px;
  }
  .todo-header-btn{
    width: 80px;
    height: 32px;
    border: none;
    background-color: #ddd;
    border-radius: 4px;
    cursor: pointer;
  }
  .todo-header-btn:hover{
    border: 1px solid #444;
  }
</style>
