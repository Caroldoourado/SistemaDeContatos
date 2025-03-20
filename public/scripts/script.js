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