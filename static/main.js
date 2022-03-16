const { createApp } = Vue 

const TaskApp = {
    data(){
        return {
            task:{
                'title':''
            },
            tasks:[],
            selectTodo:false,
        }
    },
    async created(){
        await this.getTasks()
    },
    methods: {
        async sendRequest(url, method, data){
            const myHeaders = new Headers({
                'Content-Type' : 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            })

            const response = await fetch(url, {
                method: method,
                headers: myHeaders,
                body: data
            })

            return response
        },

        async getTasks(){
            const response = await this.sendRequest(window.location.origin, 'get')
            this.selectTodo = false
            this.tasks = await response.json()
        },

        async getTodoTasks(){
            const response = await this.sendRequest(window.location.origin + '/todo', 'get')
            this.selectTodo = true
            this.tasks = await response.json()
        },
        
        async createTask() {
            // await this.getTasks()

            const response = await this.sendRequest(window.location.origin + '/create', 'post', JSON.stringify(this.task))
            console.log(this.selectTodo)
            if (this.selectTodo) {
                await this.getTodoTasks()
            }
            else{
                await this.getTasks()
            }

            this.task.title = ''
        },

        async deleteTask(task){
            await this.sendRequest(window.location.origin + '/delete', 'post', JSON.stringify(task))
            if (this.selectTodo) {
                await this.getTodoTasks()
            }
            else{
                await this.getTasks()
            }
        },

        async completeTask(task){
            await this.sendRequest(window.location.origin + '/complete', 'post', JSON.stringify(task))

            if (this.selectTodo) {
                await this.getTodoTasks()
            }
            else{
                await this.getTasks()
            }
        }
    },
    delimiters: ['{','}']
}

createApp(TaskApp).mount('#app')