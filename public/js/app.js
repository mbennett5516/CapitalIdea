const getAccountBalance = function(){
    $.ajax({
        url: '/api/account',
        method: "GET",
    }).then(function(response){
        let sum =0;
        for (let i = 0; i < response.length; i++){
            sum += response[i].amount;
        }
        if(sum > 0){
            $('#account').css('background-color', '#19722e');
        $('#account').html(`<div class="card-body"><h3>Account Balance: $${sum.toFixed(2)}</h3></div>`);
        }
        else{
            $('#account').css('background-color', 'red');
            $('#account').html(`<div class="card-body"><h3>Account Balance: $${sum.toFixed(2)}</h3></div>`);
        }
    })
}

$('#home').on('click', getAccountBalance);
$('.navbar-brand').on('click', getAccountBalance);