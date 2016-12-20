$('#task_input').focus();

var taskCnt = Number(localStorage.getItem('taskCnt')) + 1;
var list = '';
var id = 0;
var data = {
    id: 0,
    taskId: 0,
    taskMessage: 0,
    isDone: ''
};

function renderTasks() {
    $('#task_list').empty();
    for (i = 0; i < taskCnt; i++) {
        taskId = "task-" + i;
        data = JSON.parse(localStorage.getItem(taskId));
        if (localStorage.getItem(taskId) != null) {
            var id = data.id;
            var taskMessage = data.taskMessage;
            var done = data.isDone;
            addTask(taskMessage, id, done);
        } else continue;
    }
    $('#task_input').focus();
}

function addTask(taskMessage, id, done) {
    $('#task_list').append("<li data-id=" + id + " class = 'list-group-item " + done + "'>" + taskMessage +
        "<a href='#' data-id=" + id + "  class='task-remove'>" +
        "<span class='glyphicon glyphicon-remove'></span>" +
        "</a>" +
        "<a href='#' data-id=" + id + "  class='task-complete'>" +
        "<span class='glyphicon glyphicon-ok " + done + "'></span>" +
        "</a>" +
        "</li>");
}

$('#clear').click(function () {
    localStorage.clear();
    $('#task_list').empty();
    $('#task_input').focus();
});

$('#task_input').keyup(function(event){
    if((event.keyCode == 13) && ($('#task_input').val() != "")){
        var taskId = "task-" + taskCnt;
        var taskMessage = $('#task_input').val();
        data = {
            id : taskCnt,
            taskId : taskId,
            taskMessage : taskMessage,
            isDone : ''
        };
        localStorage.setItem(taskId, JSON.stringify(data));
        localStorage.setItem('taskCnt', taskCnt);
        taskCnt++;
        renderTasks();
        $('#task_input').val('');
    }
    return false;
});

$(document.body).on('click', '.task-remove', function (event) {
    taskRemove = 'task-' + $(this).attr("data-id");
    localStorage.removeItem(taskRemove);
        $(this).parent().remove();
    renderTasks();
});

$(document.body).on('click', '.task-complete', function (event) {
    taskId = 'task-' + $(this).attr("data-id");
    var dataTmp = {
        id: 0,
        taskId: 0,
        taskMessage: 0,
        isDone: ''
    };
    for (i = 1; i < taskCnt; i++) {
        taskId = 'task-' + i;
        dataTmp = JSON.parse(localStorage.getItem(taskId));
        if (localStorage.getItem(taskId) != null) {
            if (dataTmp.id == $(this).attr("data-id")) {
                break;
            }
        } else continue;
    }
    dataTmp.isDone = 'done';
    localStorage.setItem(taskId, JSON.stringify(dataTmp));
    renderTasks();
});

renderTasks();