$('#task_input').focus();

var taskCnt = Number(localStorage.getItem('taskCnt')) + 1;

function renderTasks() {
    $('#task_list').empty();
    for (i = 0; i < taskCnt; i++) {
        var taskId = "task-" + i;
        if (localStorage.getItem(taskId) == null) {
            continue;
        } else {
            addTask(taskId, i);
        }
        console.log("taskId = ", taskId, "storage item = ", localStorage.getItem(taskId));
    }
}

function addTask(taskId, i) {
    $('#task_list').append("<li data-id=" + i + " class='well well-small'>" + localStorage.getItem(taskId) +
        " <button data-id=" + i + " class='taskRemove btn btn-danger'>Удалить</button>" +
        "</li>");
}

$('#clear').click(function () {
    localStorage.clear();
    $('#task_list').empty();
    taskCnt = 0;
});

$('#task_input').keyup(function(event){
    if((event.keyCode == 13) && ($('#task_input').val() != "")){
        var taskId = "task-" + taskCnt;
        var taskMessage = $('#task_input').val();
        localStorage.setItem(taskId, taskMessage);
        localStorage.setItem('taskCnt', taskCnt);
        addTask(taskId, i);
        var task = $('#' + taskId);
        task.css('display', 'none').slideDown('fast');
        $('#task_input').val('').focus();
        taskCnt++;
    }
    return false;
});

$(document).on('click', '.taskRemove', function (event) {
    taskRemove = 'task-' + $(this).data("id");
    localStorage.removeItem(taskRemove);
    $(this).slideUp('fast', function () {
        $(this).parent().remove();
    })
});

renderTasks();