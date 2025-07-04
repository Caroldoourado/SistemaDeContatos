function getContato(){
const inputMobile = document.getElementById('contato-mobile');
    const inputDesktop = document.getElementById('contato-desktop');

    let contato = "";

    if (window.innerWidth < 768) {
        contato = inputMobile.value;
    } else {
        contato = inputDesktop.value;
    }

    if(!contato){
        abrirModal("Informe o nome ou o número do contato");
        return;
    }

    fetch(`https://bemmequer.onrender.com/bmq/contato/${contato}`).then (res =>{
        return res.json();

    }).then(contatos => {
        try{
            let containerId = window.innerWidth < 768 ? "contatosFiltradosMobile" : "contatosFiltradosDesktop";
            if(contatos.length === 0){
                document.getElementById(containerId).innerHTML = `<p style="color: black; text-align: center; margin-bottom: 50px"> Nenhum contato encontrado.</p>`;
                return;
            }

            let contatosElements = '';
            
            contatos.forEach((contato) => {
                let contatoElement = `<div class="card-contato">
                    <div>
                        <h5 class="nome-contato">${contato.cli_nome}</h5>
                        <p>${contato.cli_telefone}</p>
                    </div>
                    <button onclick="removerContato(${contato.cli_id})" class="remover-contato">Remover</button>
                </div>`;
                contatosElements += contatoElement; 
            })
            document.getElementById(containerId).innerHTML = contatosElements;
        } catch (error){
            abrirModal('Erro ao processar contatos recebidos');
        }
    })
    .catch(error => console.error("Erro na requisição:", error));
}

function carregarListaClientes(){
    fetch("https://bemmequer.onrender.com/bmq/contatos")
    .then(res => res.json())
    .then(clientes => {
        const datalist = document.getElementById("lista-contatos");
        datalist.innerHTML = ""

        clientes.forEach(cliente) => {
            const option = document.createElement("option")
        }
    })
}

function removerContato(id){
    if(confirm("Você tem certeza que deseja remover este contato?")){
        fetch(`https://bemmequer.onrender.com/bmq/contatos/${id}`, {
            method: "DELETE",
        }).then (response => {
            if(response.ok){
                abrirModal("Contato removido com sucesso!");
                document.getElementById("contatosFiltrados").innerHTML = '';
                document.getElementById("contato").value = '';
            }else {
                abrirModal("Erro ao remover o contato.")
            }
        }).catch(error => console.error("Erro ao remover contato:", error));
    }
}

function addContato(){
    let nome = document.getElementById('iname').value;
    let email = document.getElementById('iemail').value;
    let telefone = document.getElementById('itelefone').value;

    const telefoneRegex = /^55\d{2}9\d{8}$/;

    if(!nome){
        abrirModal('O campo Nome é obrigatório.')
        return;
    }else if(!telefone){
        abrirModal('O campo Telefone é obrigatório.')
        return;
    } else if (!telefoneRegex.test(telefone)) {
    abrirModal('Telefone inválido. Use o padrão: 55 + DDD + 9 + número (ex: 5562999999999).');
    return;
}

    let dados = {nome, email, telefone};

    fetch("https://bemmequer.onrender.com/bmq/contatos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if(!response.ok){
            return response.json().then(errorData => {
                throw new Error(errorData.erro || "Erro ao adicionar contato.");
            });
        }
        return response.json();
    })
    .then(data => {
        abrirModal("Contato adicionado com sucesso!", data);
    })
   .catch(error => {
    console.error('Erro retornado:', error);
    abrirModal(error.message || "Erro ao adicionar contato.");
});
}

function abrirModal(mensagem) {
  document.getElementById('mensagemModal').innerText = mensagem;
  document.getElementById('modal').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

document.getElementById('contato-mobile').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') getContato();
});

document.getElementById('contato-desktop').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') getContato();
});