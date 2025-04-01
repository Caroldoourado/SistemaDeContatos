function getContato(){
    let contato = document.getElementById('contato').value;

    if(!contato){
        alert("Informe o nome ou o número do contato");
        return;
    }

    fetch(`http://localhost:3000/api/contato/${contato}`).then (res =>{
        return res.json();

    }).then(contatos => {
        try{
            if(contatos.length === 0){
                document.getElementById("contatosFiltrados").innerHTML = "<p> Nenhum contato encontrado.<p/>";
                return;
            }

            let contatosElements = '';
            contatos.forEach((contato) => {
                let contatoElement = `<h5>${contato.cli_nome}</h5>
                <p>${contato.cli_telefone}</p>`;

                contatosElements += contatoElement; 
            })
            document.getElementById("contatosFiltrados").innerHTML = contatosElements;
        } catch (error){
            alert('Erro ao processar contatos recebidos');
        }
    })
    .catch(error => console.error("Erro na requisição:", error));
}

function carregarAddContatos(){
    fetch('http://localhost:3000/api/add').then(response => 
        response.text()
    ).then(data => {
        document.body.innerHTML = data;
    }).catch(error => console.error('Erro ao carregar a página,', error));
}

function addContato(){
    let nome = document.getElementById('iname').value;
    let email = document.getElementById('iemail').value;
    let telefone = document.getElementById('itelefone').value;

    

    if(!nome){
        alert('O campo Nome é obrigatório.')
    }else if(!email){
        alert('O campo Email é obrigatório.')
    }else if(!telefone){
        alert('O campo Telefone é obrigatório.')
    }

    let dados = {nome, email, telefone};

    fetch("http://localhost:3000/api/novocontato", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        alert("Contato adicionado com sucesso!", data);
    })
    .catch(error => {
        console.error("Erro ao adicionar contato: ", error);
    });
}