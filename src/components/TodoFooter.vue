<template>
  <div class="todo-footer" v-show="total">
    <!-- <input type="checkbox" :checked="isAll" @change="checkedAll"> -->
    <input type="checkbox" v-model="isAll">
    <span>已完成{{doneTotal}} / 全部{{total}}</span>
    <button class="del-btn" @click="removeHandler">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    name: "TodoFooter",
    props:{
      todosData:{
        type:Array
      },
      checkAllTodo:{
        type:Function
      },
      removeTodoHandler:{
        type:Function
      }
    },
    methods:{
      checkedAll(e){
        //改用自定义事件
        this.$emit('checkAllTodo',e.target.checked)
        
        // this.checkAllTodo(e.target.checked)
      },
      removeHandler(){
        if(!confirm('是否清除所有已完成的todo?')) return
        this.$emit('removeTodoHandler')
        // this.removeTodoHandler()
      }
    },
    computed:{
      total(){
        return this.todosData.length
      },
      doneTotal(){
        return this.todosData.reduce((accumulator, curValue)=>curValue.done ? accumulator + 1 : accumulator ,0)
      },
      // isAll(){
      //   return this.doneTotal === this.total && this.todosData.length > 0
      // }
      isAll:{
        get(){
          return this.doneTotal === this.total && this.todosData.length > 0
        },
        set(value){
          // this.checkAllTodo(value)
          this.$emit('checkAllTodo',value)
        }
      }
    }
  };
</script>

<style>
  .todo-footer{
    display: flex;
    gap: 30px;
    padding: 10px 20px;
    margin-top: auto;
    align-items: center;
  }
</style>
