$(function() {
    var i = 0;
    for (i = 0; i < localStorage.length; i++) {
        var taskId = "task-" + i;
        $('#taskList').append("<li id='" + taskId + "' class='well well-small'>" + localStorage.getItem(taskId) + "</li>");
    }

    $('#clear').click(function () {
        localStorage.clear();
        location.reload();
    });

    $('#taskInput').keyup(function(event){
        if((event.keyCode == 13) && ($('#taskInput').val() != "")){
            var taskId = "task-" + i;
            var taskMessage = $('#taskInput').val();
            localStorage.setItem(taskId, taskMessage);
            $('#taskList').append("<li id='" + taskId + "' class='well well-small'>" + localStorage.getItem(taskId) + "</li>");
            var task = $('#' + taskId);
            task.css('display', 'none');
            task.slideDown('fast');
            $('#taskInput').val('');
            i++;
        }
        return false;
    });

    $('#taskList').on('click', 'li', function (event) {
        self = $(this);
        taskId = self.attr('id');
        localStorage.removeItem(taskId);
        self.slideUp('fast', function () {
            self.remove();
        })
    });
});