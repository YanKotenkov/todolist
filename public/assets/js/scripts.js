$('#task_input').focus();

var taskCnt = Number(localStorage.getItem('taskCnt')) + 1;
var list = '';

function renderTasks() {
    for (i = 0; i < taskCnt; i++) {
        var taskId = "task-" + i;
        if (localStorage.getItem(taskId) == null) {
            continue;
        } else {
            addTask(taskId, i, '#task_list');
        }
        console.log("taskId = ", taskId, "storage item = ", localStorage.getItem(taskId));
    }
}

function addTask(taskId, i) {
    $('#task_list').append("<li data-id=" + i + " class='well well-small'>" + localStorage.getItem(taskId) +
        "<a href='#' data-id=" + i + "  class='task-remove'>" +
        "<span class='glyphicon glyphicon-remove' style='color:red;'></span>" +
        "</a>" +
        "<a href='#' data-id=" + i + "  class='task-complete' style='color: grey'>" +
        "<span class='glyphicon glyphicon-ok'></span>" +
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
        localStorage.setItem(taskId, taskMessage);
        localStorage.setItem('taskCnt', taskCnt);
        addTask(taskId, i);
        var task = $('#' + taskId);
        task.css('display', 'none').slideDown('normal');
        $('#task_input').val('').focus();
        taskCnt++;
    }
    return false;
});

$(document.body).on('click', '.task-remove', function (event) {
    taskRemove = 'task-' + $(this).data("id");
    localStorage.removeItem(taskRemove);
    $(this).slideUp('normal', function () {
        $(this).parent().remove();
    });
    $('#task_input').focus();
});

$(document.body).on('click', '.task-complete', function (event) {
    $(this).attr('style', 'color:green');
    $(this).parent().attr('style', 'text-decoration:line-through');
});

renderTasks();