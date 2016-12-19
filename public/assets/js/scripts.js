function addTask(taskId, i) {
    $('#taskList').append("<li data-id=" + i + " class='well well-small'>" + localStorage.getItem(taskId) +
        " <button data-id=" + i + " class='taskRemove btn btn-danger'>Удалить</button>" +
        "</li>");
}

$(function() {
    var i = 0;
    for (i = 0; i < localStorage.length; i++) {
        var taskId = "task-" + i;
        addTask(taskId, i);
        console.log("taskId = ", taskId, "storage item = ", localStorage.getItem(taskId));
    }

    $('#clear').click(function () {
        localStorage.clear();
        $('div#taskList').empty();
    });

    $('#taskInput').keyup(function(event){
        if((event.keyCode == 13) && ($('#taskInput').val() != "")){
            var taskId = "task-" + i;
            var taskMessage = $('#taskInput').val();
            localStorage.setItem(taskId, taskMessage);
            addTask(taskId, i);
            var task = $('#' + taskId);
            task.css('display', 'none');
            task.slideDown('fast');
            $('#taskInput').val('');
            i++;
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
});