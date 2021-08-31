<template>
  <div>
    <Titulo texto = "CLIENTES"/>
    <div>
      <input type="text" placeholder="Nome do Cliente" v-model="nome" v-on:keyup.enter="addClientes()">
      <button class="btn btnInput" @click="addClientes()">Adicionar</button>
    </div>
    
    <table>
      <thead>
        <th>Id</th>
        <th>Nome</th>
        <th>Opções</th>
      </thead>
      <tbody v-if="clientes.length">
        <tr v-for="(cliente, index) in clientes" :key="index">
          <td>{{cliente.id}}</td>
          <td>{{cliente.nome}} {{cliente.sobrenome}}</td>
          <td>
            <button class="btn btn_Danger" @click="remover(cliente)">Remover</button>
          </td>
        </tr>
      </tbody>
      <tfoot v-else>
        Nenhum Cliente encontrado
      </tfoot>
    </table>
  </div>
</template>

<script>
import Titulo from '../_share/Titulo.vue';
export default {
  components:{
    Titulo
  },
  data(){
    return{
      titulo:'CLIENTES',
      nome:'',
      sobrenome:'',
      clientes: []
    }
  },
  created() {
    this.$http.get('http://localhost:3000/clientes').then(res => res.json()).then(clientes => this.clientes = clientes)
  },
  props: {
  },
  methods: {
    addClientes() {
      let _cliente = {
        nome: this.nome,
        sobrenome: ""
      }
      this.$http.post('http://localhost:3000/clientes', _cliente).then(res => res.json())
      .then(cliente =>{
        this.clientes.push(cliente)
        this.nome = ''
      })
      
    },
    remover(cliente){
      this.$http.delete(`http://localhost:3000/clientes/${cliente.id}`).then(()=>{
        let indice = this.clientes.indexOf(cliente);
        this.clientes.splice(indice, 1);
      })
      
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input{
  border: 0px;
  padding: 20px;
  font-size: 1.3em;
  display: inline;
  color: #687f7f
}
.btnInput{
  border: 0px;
  padding: 20px;
  font-size: 1.3em;
  display: inline;
  background-color: rgb(116,115,115);
}
.btn:hover{
  padding: 20px;
  border: 0px;
  margin: 0px;
}
</style>
