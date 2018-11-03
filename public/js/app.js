$('#home').on('click', function(){
    $.ajax({
        url: '/api/account',
        method: "GET",
    }).then(function(response){
        let sum =0;
        for (let i = 0; i < response.length; i++){
            sum += response[i].amount;
        }
        $('#account').text(sum);
    })
})