import { Tarefa, Prioridade } from "./Tarefa";

export class ListaDeTarefas{

    tarefas:Tarefa[];
    input:HTMLInputElement; 
    form:HTMLFormElement;
    tabela:HTMLTableElement;
    
    constructor(main:HTMLElement){
        this.input  = <HTMLInputElement>main.querySelector("#tf_2do");
        this.form   = <HTMLFormElement>main.querySelector("#form");
        this.tabela = <HTMLTableElement>main.querySelector("#table");
        this.tarefas = [];
        
        //Quando o form for submetido, que se adicione uma tarefa
        this.form.addEventListener("submit", (event) => {
            // interrompendo o envio do formulario
            event.preventDefault();
            this.adicionarTarefa();
        });
    }
    
    removerTarefa(t:Tarefa){
        this.tarefas.splice(this.tarefas.indexOf(t),1);
        document.getElementById(t.id).remove();

    }
    adicionarTarefa(){

        // Verificar se o input tem alguma string!
        if(this.input.value == "") return;


        // Criar nova tarefa com prioridade baixa e com texto digitado pelo usuário
        let t = new Tarefa(this.input.value, Prioridade.Baixa);
        
        // Adicionar a tarefa criada a array tarefas
        this.tarefas.push(t);

        // Criando a linha de tarefa
        let tr = t.toRow();

        tr.querySelector("i").addEventListener("click",
        () => {
            tr.remove();
            this.removerTarefa(t);
            }
        );

        // Executar e exibirTarefas(tarefas)
        this.tabela.appendChild(tr);

        // Limpar o campo toda vez que a tarefa seja adicionada
        this.input.value = "";
        console.log(this.tarefas);
    }

    mostrarTarefas():void {
        // Limpar tabela
        this.tabela.innerHTML = "";
        // Mostrar tarefas no html
        for(let tarefa of this.tarefas){
            this.tabela.appendChild(tarefa.toRow());
        }
    }
}