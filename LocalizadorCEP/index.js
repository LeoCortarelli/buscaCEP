const cep = document.querySelector('#cep');
const endereco = document.querySelector('#endereco');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const complemento = document.querySelector('#complemento');
const message = document.querySelector('#message');

cep.addEventListener('focusout', async () => {


    try {
        const somenteNumeros = /^[0-9]+$/;  // Vericar se tem somente numeros
        const quantNumeros = /^[0-9]{8}$/;  // Verificar se a quantidade de numeros e 8

        if(!somenteNumeros.test(cep.value) || !quantNumeros.test(cep.value)){ // (!) se não for somenteNumero
            throw {cep_error: 'Cep Invalido'}
        }    
        
        // REQUISIÇÃO PARA O VIA CEP
        const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`); // Procurando o  CEP no via cep

        if(!response.ok){
            throw await response.json();
        }

        const responseCep = await response.json();

        endereco.value = responseCep.logradouro;
        bairro.value = responseCep.bairro;
        cidade.value = responseCep.localidade;
        complemento.value = responseCep.complemento;

    } catch (error) {
        if(error?.cep_error){

            message.textContent = error.cep_error;  // Ele aplica a message de error 

            setTimeout(() =>{ // Depois de 5 segundos ela some
                message.textContent = '';
            }, 5000)

        }
    }

})