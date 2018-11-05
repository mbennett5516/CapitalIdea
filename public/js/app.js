let ctx = $('#myChart');

const getHome = function(){
    getAccountBalance();
    getBudgetData();
    getPie();
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
            data += `<div class = card><div class = card-body><h4>${response[i].category_name}</h4>`;
            if (response[i].category_total < (response[i].category_budget / 2)){
                data += `<div class="progress"><div class="progress-bar bg-success" role="progressbar" aria-valuemax="${response[i].category_budget}" aria-valuemin="0" aria-valuenow="${response[i].category_total}" style="width: ${width}%"</div></div></div></div>`;
            }
            else if (response[i].category_total < response[i].category_budget){
                data += `<div class="progress"><div class="progress-bar bg-warning" role="progressbar" aria-valuemax="${response[i].category_budget}" aria-valuemin="0" aria-valuenow="${response[i].category_total}" style="width: ${width}%"</div></div></div></div>`;
            }
            else{
                data += `<div class="progress"><div class="progress-bar bg-danger" role="progressbar" aria-valuemax="${response[i].category_budget}" aria-valuemin="0" aria-valuenow="${response[i].category_total}" style="width: ${width}%"</div></div></div></div>`;
            }
            $('#budgets').append(data);
        }
    })
}

const resetCanvas = function () {
    $('#myChart').remove(); // removes the HTML canvas element and all its data
    $('#pie').append('<canvas id="myChart"></canvas>'); // adds a new canvas
    canvas = document.querySelector('#myChart'); // tried using JQuery to do this but...wouldn't work for ... reasons I guess?
    ctx = canvas.getContext('2d'); // sets chart to 2d
    ctx.canvas.width = $('#pie').width(); // resize to parent width
    ctx.canvas.height = $('#pie').height(); // resize to parent height
}

const getPie = function(){
    $.ajax({
        url: "/api/budgets",
        method: "GET"
    }).then(function(response){
        console.log(response);
        let chartdata = {
            datasets: [{
                label: 'Spending',
                data: [],
                backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
            }],
            labels : []
        };
        for (let i = 0; i < response.length; i++){
           chartdata.datasets[0].data.push(response[i].category_total);
           chartdata.labels.push(response[i].category_name);
        }
        resetCanvas();
        var myPieChart = new Chart(ctx,{
            type: 'pie',
            data: chartdata,
            options: {
                responsive: true,
                title:{
                    display: true,
                    text: "Spending"
                }
            }
        });
        // $('#myChart').html(myPieChart)
    })
}

$('#home').on('click', getHome);
$('.navbar-brand').on('click', getHome);