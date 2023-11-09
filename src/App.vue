<template>
  <div id="app">  
    <h1 class="title">LvMaoGui</h1>
    <!-- <TodoHeader :addTodoHandler="addTodoHandler"/> -->
    <TodoHeader @addTodoHandler="addTodoHandler"/>
    <!-- <TodoList :todosData="listData" :updateTodoHandler="updateTodoHandler" :delTodoHandler="delTodoHandler"/> -->
    <TodoList :todosData="listData"/>
    <TodoFooter :todosData="listData" @checkAllTodo="checkAllTodo" @removeTodoHandler="removeTodoHandler"/>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'



export default {
  name: 'App',
  components: {
    TodoHeader,
    TodoList,
    TodoFooter
  },
  data(){
    return {
      listData: JSON.parse(localStorage.getItem('listData')) ?? []
    }
  },
  methods:{
    addTodoHandler(todoData){
      console.log(todoData);
      const arr = []
      this.listData.unshift(todoData)
    },
    updateTodoHandler(id, data){
      debugger
      const hasDataIndex = this.listData.findIndex(t => t.id === id)
      // 数据不存在
      if(hasDataIndex < 0 || !data){
        return
      }
      this.listData.splice(hasDataIndex, 1 ,data)
    },
    delTodoHandler(id){
      if(!confirm('确认删除？')){return}
      const hasDataIndex = this.listData.findIndex(t => t.id === id)
       // 数据不存在
       if(hasDataIndex < 0){
        return
      }
      this.listData.splice(hasDataIndex, 1)
    },
    checkAllTodo(isCheck){
      this.listData = this.listData.map(todo => {
        return isCheck ? {
          name:todo.name,
          id:todo.id,
          done:true
        } : {
          name:todo.name,
          id:todo.id,
          done:false
        }
      })
    },
    removeTodoHandler(){
      // this.listData = []
      this.listData = this.listData.filter(t => !t.done)
    }
  },
  watch:{
    listData:{
      handler(value){
        localStorage.setItem('listData', JSON.stringify(value))
      },
      deep:true
    }
  },
  mounted(){
    // 添加自定义事件监听
    this.$eventBus.$on('updateTodoHandler',this.updateTodoHandler)
    this.$eventBus.$on('delTodoHandler',this.delTodoHandler)
  },
  beforeDestroy(){
    this.$eventBus.$off('updateTodoHandler')
    this.$eventBus.$off('delTodoHandler')
  }
}
</script>

<style>
  *{
    padding: 0;;
    margin: 0;
    box-sizing: border-box;
  }
  #app{
    width: 800px;
    height: 500px;
    /* background-color: #f7f7f7; */
    margin: 10px auto;
    border: 2px solid #ddd;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }
  .title{
    text-align: center;
  }
</style>
