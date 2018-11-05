const getHome = function(){
    getAccountBalance();
    getBudgetData();
};

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

const getBudgetData = function(){
    $.ajax({
        url: '/api/budgets',
        method: "GET"
    }).then(function(response){
        for (let i = 0; i < response.length; i++){
            let data = '';
            let width = ((response[i].category_total/response[i].category_budget)*100);
            console.log(width);
            data += `<div class = card><div class = card-body><h4>${response[i].category_name}</h4>
            <div class="progress"><div class="progress-bar bg-success" role="progressbar" aria-valuemax="${response[i].category_budget}" aria-valuemin="0" aria-valuenow="${response[i].category_total}" style="width: ${width}%"</div></div></div></div>`;
            $('#budgets').append(data);
        }
    })
}

$('#home').on('click', getHome);
$('.navbar-brand').on('click', getHome);