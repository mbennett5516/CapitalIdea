$(document).ready(function () {
    getHome();
})

const getHome = function () {
    hideAll();
    $('#homePage').removeClass('hide');
    getAccountBalance();
    getBudgetData();
    getPie();
};

const hideAll = function () {
    $('#homePage').addClass('hide');
    $('#transactionsPage').addClass('hide');
    $('#categoriesPage').addClass('hide');
}

const getAccountBalance = function () {
    $.ajax({
        url: '/api/account',
        method: "GET",
    }).then(function (response) {
        let sum = 0;
        for (let i = 0; i < response.length; i++) {
            if (response[i].transaction_type === 'Debt') {
                sum -= response[i].amount;
            }
            else {
                sum += response[i].amount;
            }
        }
        if (sum > 0) {
            $('#account').css('background-color', '#19722e');
            $('#account').html(`<div class="card-body"><h3>Account Balance: $${sum.toFixed(2)}</h3></div>`);
        }
        else {
            $('#account').css('background-color', 'red');
            $('#account').html(`<div class="card-body"><h3>Account Balance: $${sum.toFixed(2)}</h3></div>`);
        }
    })
}

const getBudgetData = function () {
    $.ajax({
        url: '/api/budgets',
        method: "GET"
    }).then(function (response) {
        $('#budgets').empty();
        for (let i = 0; i < response.length; i++) {
            let data = '';
            let width = ((response[i].category_total / response[i].category_budget) * 100);
            data += `<div class = card><div class = card-body><h4>${response[i].category_name}</h4>`;
            if (response[i].category_total < (response[i].category_budget / 2)) {
                data += `<div class="progress"><div class="progress-bar bg-success" role="progressbar" aria-valuemax="${response[i].category_budget}" aria-valuemin="0" aria-valuenow="${response[i].category_total}" style="width: ${width}%"</div></div></div></div>`;
            }
            else if (response[i].category_total < response[i].category_budget) {
                data += `<div class="progress"><div class="progress-bar bg-warning" role="progressbar" aria-valuemax="${response[i].category_budget}" aria-valuemin="0" aria-valuenow="${response[i].category_total}" style="width: ${width}%"</div></div></div></div>`;
            }
            else {
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

const getPie = function () {
    $.ajax({
        url: "/api/budgets",
        method: "GET"
    }).then(function (response) {
        let chartdata = {
            datasets: [{
                label: 'Spending',
                data: [],
                backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
            }],
            labels: []
        };
        for (let i = 0; i < response.length; i++) {
            chartdata.datasets[0].data.push(response[i].category_total);
            chartdata.labels.push(response[i].category_name);
        }
        resetCanvas();
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: chartdata,
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: "Spending"
                }
            }
        });
    })
}

const getTransactions = function () {
    hideAll();
    $('#transactionsPage').removeClass('hide');
    $.ajax({
        url: '/api/account',
        method: "GET"
    }).then(function (response) {
        $('#transactionsData').empty();
        for (let i = response.length - 1; i >= 0; i--) {
            let data = '';
            if (response[i].transaction_type === 'Debt') {
                data += `
            <tr id = "row${response[i].id}">
                <td class="red">${response[i].transaction_type}</td>
                <td class="red">$${response[i].amount.toFixed(2)}</td>
                <td class="red">${response[i].category}</td>
                <td class="red">${response[i].createdAt}</td>
                <td><a href="#" class="editDebtBtn" value="${response[i].id}" id="edit${response[i].id} "data-toggle="modal" data-target="#editModal"><i class="far fa-edit fa-2x"></i></a> <a href="#" class="deleteBtn" value="${response[i].id}" id="delete${response[i].id}"><i class="fas fa-trash-alt fa-2x red"></i></a></td>
            </tr>`;
            }
            else {
                data += `
            <tr id = "row${response[i].id}">
                <td>${response[i].transaction_type}</td>
                <td>$${response[i].amount.toFixed(2)}</td>
                <td></td>
                <td>${response[i].createdAt}</td>
                <td><a href="#" class="editBtn" value="${response[i].id}"id="edit${response[i].id}" data-toggle="modal" data-target="#editdepositModal"><i class="far fa-edit fa-2x"></i></a> <a href="#" class="deleteBtn" value="${response[i].id}" id="delete${response[i].id}"><i class="fas fa-trash-alt fa-2x red"></i></a></td>
            </tr>`;
            }
            $('#transactionsData').append(data);
        }
    })
}

const getCategories = function () {
    console.log("running");
    hideAll();
    $('#categoriesPage').removeClass('hide');
    $.ajax({
        url: '/api/budgets',
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $('#categoriesData').empty();
        for (let i = response.length - 1; i >= 0; i--) {
            let data = '';
            if (response[i].category_total >= response[i].category_budget) {
                data += `
            <tr id = "row${response[i].id}">
                <td class="red">${response[i].category_name}</td>
                <td class="red">$${response[i].category_budget.toFixed(2)}</td>
                <td class="red">$${response[i].category_total.toFixed(2)}</td>
                <td><a href="#" class="editCategoryBtn" value="${response[i].id}" id="edit${response[i].id} "data-toggle="modal" data-target="#editCategoryModal"><i class="far fa-edit fa-2x"></i></a></td>
            </tr>`;
            }
            else if (response[i].category_total >= (response[i].category_budget / 2)) {
                data += `
                <tr id = "row${response[i].id}">
                    <td class="yellow">${response[i].category_name}</td>
                    <td class="yellow">$${response[i].category_budget.toFixed(2)}</td>
                    <td class="yellow">$${response[i].category_total.toFixed(2)}</td>
                    <td><a href="#" class="editCategoryBtn" value="${response[i].id}" id="edit${response[i].id} "data-toggle="modal" data-target="#editCategoryModal"><i class="far fa-edit fa-2x"></i></a></td>
                </tr>`;
            }
            else {
                data += `
                <tr id = "row${response[i].id}">
                    <td>${response[i].category_name}</td>
                    <td>$${response[i].category_budget.toFixed(2)}</td>
                    <td>$${response[i].category_total.toFixed(2)}</td>
                    <td><a href="#" class="editCategoryBtn" value="${response[i].id}" id="edit${response[i].id} "data-toggle="modal" data-target="#editCategoryModal"><i class="far fa-edit fa-2x"></i></a></td>
                </tr>`;
            }
            $('#categoriesData').append(data);
        }
    })
}

const newDeposit = function (event) {
    event.preventDefault();
    let body = {
        transaction_type: 'Deposit',
        amount: $('#depositAmount').val()
    };
    $.ajax({
        url: '/api/transaction',
        method: "POST",
        data: body
    }).then(function (response) {
        if (response.success === true)
            getTransactions();
        else {
            alert("something went wrong");
        }
    });
};

const newDebt = function (event) {
    event.preventDefault();
    $.ajax({
        url: `/api/category/${$('#categorySelect').val()}`,
        method: "GET"
    }).then(function (response) {
        const transactionBody = {
            transaction_type: 'Debt',
            amount: $('#debtAmount').val(),
            category: response[0].category_name,
            CategoryId: $('#categorySelect').val()
        };

        let input = $('#debtAmount').val().trim()
        let newTotal = parseFloat(response[0].category_total) + parseFloat(input);
        newTotal = newTotal.toFixed(2);
        const categoryBody = {
            id: response[0].id,
            category_name: response[0].category_name,
            category_budget: response[0].category_budget,
            category_total: newTotal
        };
        updateCategory(categoryBody, 'transactions');
        postDebt(transactionBody);
        
    });
};

const postDebt = function (body) {
    $.ajax({
        url: '/api/transaction',
        method: "POST",
        data: body
    }).then(function (response) {
        getTransactions();
        return response;
    })
};

const updateCategory = function (body, param) {
    $.ajax({
        url: `/api/category/${body.id}`,
        method: "PUT",
        data: body
    }).then(function (response) {
        if(param === 'categories')
        getCategories();
        else if (param === 'transactions')
        getTransactions();
        else
        getHome();
    })
}

const populateCategories = function () {
    $.ajax({
        url: '/api/budgets',
        method: "GET"
    }).then(function (response) {
        $('#categorySelect').empty();
        $('#editCategory').empty();
        $('#categorySelect').html(`<option selected>Choose...</option>`);
        $('#editCategory').html(`<option>Choose...</option>`);
        let options = '';
        for (let i = 0; i < response.length; i++) {
            options += `<option value="${response[i].id}">${response[i].category_name}</option>`;
        }
        $('#categorySelect').append(options);
        $('#editCategory').append(options);
    })
}

const deleteTrasaction = function () {
    let amount = 0;
    let categoryid = 0;
    let name = '';
    let newTotal = 0;
    let categoryBody = {};
    $.ajax({
        url: `/api/transaction/${$(this).attr('value')}`,
        method: "GET"
    }).then(function (response) {
        $.ajax({
            url: `/api/transaction/${response[0].id}`,
            method: "DELETE"
        }).then(function (response) {
            getTransactions();
        });
        if (response[0].transaction_type === 'Debt') {
            amount = response[0].amount;
            categoryid = response[0].CategoryId;
            name = response[0].category;

            $.ajax({
                url: `/api/category/${categoryid}`,
                method: "GET"
            }).then(function (response) {
                newTotal = response[0].category_total - amount;
                categoryBody = {
                    id: categoryid,
                    category_name: name,
                    category_budget: response[0].category_budget,
                    category_total: newTotal
                }
                updateCategory(categoryBody, 'transactions');
            })
        }
    })
}

let tempvalue = 0;

const editTransaction = function () {
    populateCategories();
    $.ajax({
        url: `/api/transaction/${$(this).attr('value')}`,
        method: "GET"
    }).then(function (response) {
        $('#editAmount').val(response[0].amount);
        $('#editCategory > option').each(function () {
            if ($(this).val() == response[0].CategoryId) {
                $(this).attr('selected', true);
            }
            $('#submitEdit').attr('value', response[0].id)
        })
        tempvalue = response[0].amount;
    })
}

const submitEditTransaction = function () {
    let id = $(this).val();

    $.ajax({
        url: `/api/category/${$('#editCategory').val()}`,
        method: "GET"
    }).then(function (response) {
        newTotal = parseFloat(response[0].category_total) - parseFloat(tempvalue) + parseFloat($('#editAmount').val().trim());
        newCategory = {
            id: response[0].id,
            category_name: response[0].category_name,
            category_budget: response[0].category_budget,
            category_total: newTotal
        };
        let newTransaction = {
            transaction_type: "Debt",
            amount: $('#editAmount').val(),
            category: response[0].category_name,
            CategoryId: $('#editCategory').val()
        }
        $.ajax({
            url: `/api/transaction/${id}`,
            method: "PUT",
            data: newTransaction
        }).then(function (response) {

        });
        updateCategory(newCategory,'transactions');
        getTransactions();
    })
}

const editDeposit = function () {
    $.ajax({
        url: `/api/transaction/${$(this).attr('value')}`,
        method: "GET"
    }).then(function (response) {
        $('#editdepositAmount').val(response[0].amount);
        $('#editsubmitDeposit').attr('value', response[0].id)
    })
}

const submitEditDeposit = function () {
    let id = $(this).val();
    let newDeposit = {
        transaction_type: "Deposit",
        amount: $('#editdepositAmount').val()
    };
    $.ajax({
        url: `/api/transaction/${id}`,
        method: "PUT",
        data: newDeposit
    }).then(function (response) {
        getTransactions();
    });
}

const editCategory = function () {
    $.ajax({
        url: `/api/category/${$(this).attr('value')}`,
        method: "GET"
    }).then(function (response) {
        $('#editName').val(response[0].category_name);
        $('#editBudget').val(response[0].category_budget);
        $('#submitCategoryEdit').attr('value', response[0].id)
    })
}

const submitCategoryEdit = function(){
    let newid = $(this).val();
    $.ajax({
        url: `/api/category/${newid}`,
        method: "GET"
    }).then(function(response){
        let newCategory = {
            id: newid,
            category_name: $('#editName').val().trim(),
            category_budget: $('#editBudget').val().trim(),
            category_total: response[0].category_total,
        }
        updateCategory(newCategory, 'categories');
        
    })

}

$('#home').on('click', getHome);
$('.navbar-brand').on('click', getHome);
$('#transactions').on('click', getTransactions);
$('#categories').on('click', getCategories);
$('#submitDeposit').on('click', newDeposit);
$('#submitDebt').on('click', newDebt);
$('#new_debt').on('click', populateCategories);
$('#transactionsData').on('click', '.deleteBtn', deleteTrasaction);
$('#transactionsData').on('click', '.editDebtBtn', editTransaction);
$('#transactionsData').on('click', '.editBtn', editDeposit);
$('#editsubmitDeposit').on('click', submitEditDeposit);
$('#submitEdit').on('click', submitEditTransaction);
$('#categoriesData').on('click', '.editCategoryBtn', editCategory);
$('#submitCategoryEdit').on('click', submitCategoryEdit);