<template>
  <transition 
    name="animate__animated animate__bounce" 
    :appear="true"
    enter-active-class="animate__fadeIn"
    leave-active-class="animate__fadeOutLeft"
  >
    <div class="list-item" @mouseenter="selectHandler" @mouseleave="selectHandler" ref="itemContainer">
      <input type="checkbox" :checked="todoData.done" @change="changeHandler" ref="doneEl">
      <!-- <input type="checkbox" v-model="todoData.done" ref="doneEl"> -->
      <span class="name" v-show="!isEdit">{{todoData.name}}</span>
      <input type="text" class="edit-inp" v-show="isEdit" :value="todoData.name" ref="editInp" @blur="blurHandler">
      <div class="edit-btn" v-show="seleted && !isEdit" @click="openEdit" >
        <svg t="1699149445609" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1485" width="16" height="16"><path d="M116.363636 837.818182h837.818182v46.545454H116.363636zM772.654545 458.472727l-197.818181-197.818182 132.654545-132.654545 197.818182 197.818182-132.654546 132.654545z m-130.327272-195.490909l132.654545 132.654546 65.163637-65.163637-132.654546-132.654545-65.163636 65.163636z" fill="#424752" p-id="1486"></path><path d="M204.8 830.836364l37.236364-235.054546L609.745455 228.072727l197.818181 197.818182-367.709091 367.709091-235.054545 37.236364z m79.127273-211.781819l-23.272728 155.927273 155.927273-23.272727 325.818182-325.818182-132.654545-132.654545-325.818182 325.818181z m144.290909 153.6z" fill="#424752" p-id="1487"></path></svg>
      </div>
      <div class="save-btn edit-btn" v-if="isEdit" @click="saveHandler">
        <svg v-show="isEdit" t="1699150285805" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2497" width="16" height="16"><path d="M605.7 340.8h4.9c16.2 0 29.5-13.3 29.6-29.6v-69.3c0-16.3-13.3-29.6-29.6-29.6h-4.9c-16.3 0-29.6 13.3-29.6 29.6v69.3c0 16.3 13.3 29.6 29.6 29.6z" fill="#4D4D4D" p-id="2498"></path><path d="M863.5 671.9a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z" fill="#4D4D4D" p-id="2499"></path><path d="M928 544V191.9c0-70.4-57.6-128-128-128H226c-70.4 0-128 57.6-128 128v639.7c0 70.4 57.6 128 128 128h574c70.4 0 128-57.6 128-128v-31.8h-0.1c0-17.7-14.4-32.1-32.2-32.1s-32.2 14.4-32.2 32.1v30.8c0 35.2-28.8 64-64 64H222.2c-35.2 0-64-28.8-64-64V192.8c0-35.2 28.8-64 64-64H255V385.2c0 35.2 28.8 64 64 64h383.1c35.2 0 64-28.8 64-64V128.9v-0.1h33.3c35.2 0 64 28.8 64 64l0.1 351.2c0 17.7 14.4 32.1 32.2 32.1s32.2-14.4 32.3-32.1zM703.1 368.8c0 8.8-7.2 16-16 16h-352c-8.8 0-16-7.2-16-16v-240h384v240z" fill="#4D4D4D" p-id="2500"></path></svg>
      </div>
      <button v-show="seleted" class="del-btn" @click="delHandler(todoData.id)">删除</button>
    </div>
  </transition>
</template>

<script>
import 'animate.css';
  export default {
    name: "TodoListItem",
    data(){
      return{
        seleted:false,
        isEdit:false
      }
    },
    props:{
      todoData:{
        required:true,
        type:Object
      },
      updateTodoHandler:{
        type:Function
      },
      delTodoHandler:{
        type:Function
      }
    },
    methods:{
      selectHandler(e){
        if(e.target.classList.contains('list-item')){
          this.seleted = !this.seleted
        }
      },
      changeHandler(){
        const done = this.$refs.doneEl.checked
        const data = {
          done,
          name:this.todoData.name,
          id:this.todoData.id
        }
        this.$eventBus.$emit('updateTodoHandler',this.todoData.id, data)
        // this.updateTodoHandler(this.todoData.id, data)
      },
      delHandler(id){
        this.$eventBus.$emit('delTodoHandler',id)
      },
      openEdit(e){
        e.stopPropagation();
        this.isEdit = true
        // setTimeout(()=>{
        //   this.$refs.editInp.focus()
        // })
        this.$nextTick(()=>{
          this.$refs.editInp.focus()
        })
      },
      blurHandler(e){
        this.saveHandler()
      },
      saveHandler(){
        const value = this.$refs.editInp.value
        if(!value.trim()){
          alert('输入不能为空！')
          return;
        }
        const data = {
          id:this.todoData.id,
          done:this.todoData.done,
          name:value
        }
        this.$eventBus.$emit('updateTodoHandler',this.todoData.id, data)
        this.isEdit = false
      }
    }
  };
</script>

<style>
  .list-item{
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    padding: 8px;
    height: 40px;
    border-radius: 4px;
    gap: 5px;
    /* background-color: #aaccbb; */
  }
  .list-item:hover{
    background-color: #ddd;
  }
  .del-btn{
    min-width: 80px;
    height: 32px;
    background-color: rgb(255, 77, 0);
    border: none;
    border-radius: 4px;
    color: #fff;
    margin-left: auto;
    padding: 0 10px;
    cursor: pointer;
  }
  .name{
    padding-left: 10px;
  }
  .edit-inp{
    border: 1px solid #ddd;
    height: 32px;
    padding: 5px;
    border-radius: 4px;
  }
  .edit-btn{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    margin: left 8px; ;
    cursor: pointer;
  }

  /* .slidingtransitione-enter-active{
    animation: slidingtransitione 0.5s linear;
  } 

  .slidingtransitione-leave-active{
    animation: slidingtransitione 0.5s linear reverse;
  }


  @keyframes slidingtransitione{
    from{
      transform: translateX(-100%);
      
    }
    to{
      transform: translateX(0px);
    }
  } */
</style>
