function setFormData(Title, DueDate, Priority,taskId) {
  
  document.getElementById("etask").defaultValue = Title;
  document.getElementById("edue").defaultValue = DueDate;
  
  document.getElementById("eid").defaultValue = taskId;

}
function editForm(){
  $('.editfor').empty()
  var content = ` <div class="editorfor"><label for="eid">Taskid</label>
  <input type="text" id="eid" name="task" disabled>
  <label for="task">Title</label>
  <input type="text" id="etask" name="task" disabled>
<label for="edue">Due Date</label>
<input type ="date" id="edue" name="due">
<label for="epriorty">Priority</label>
<input type ="radio" id="epriority1" name="priority" value="High">
<label for="priority">High</label>
<input type ="radio" id="epriority2" name="priority" value="Medium">
<label for="priority">Medium</label>
<input type ="radio" id="epriority3" name="priority" value="Low">
<label for="epriority">Low</label>
<label for="estatus">Status</label>
<input type ="radio" id="estatus1" name="status" value="Complete">
<label for="estatus">Complete</label>
<input type ="radio" id="estatus2" name="status" value="Incomplete">
<label for="estatus">Incomplete</label>
<button type="submit" id="edit">Edit</button></div>`
  $('.editfor').append(content)
}
$(document).ready(() => {

  var dp = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  var month = dp.getMonth()+1;
  var day = dp.getDate();
  var output = dp.getFullYear() + '-' +
      (month<10 ? '0' : '') + month + '-' +
      (day<10 ? '0' : '') + day;
  document.getElementById("due").defaultValue = output;

     var sortType;
     var refreshTasks = function(){
      $.ajax({
          datatype: 'json',
          url: '/todo',
          type: 'get',
         
          success: (data) => {
            var count = 0;
            if (sortType == 1) {
              data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.due) - new Date(a.due);
              });
            }
            else if (sortType == 2) {
              data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(a.due) - new Date(b.due);
              });
            }
            else if (sortType == 3) {
              var sortOrder = ['High', 'Medium', 'Low'];   // Declare a array that defines the order of the elements to be sorted.
              data.sort(
                function (a, b) {                              // Pass a function to the sort that takes 2 elements to compare
                  if (a.priority == b.priority) {                    // If the elements both have the same `type`,
                    return a.task.localeCompare(b.task); // Compare the elements by `name`.
                  } else {                                   // Otherwise,
                    return sortOrder.indexOf(a.priority) - sortOrder.indexOf(b.priority); // Substract indexes, If element `a` comes first in the array, the returned value will be negative, resulting in it being sorted before `b`, and vice versa.
                  }
                }
              );
            }
    
            else if (sortType == 4) {
              var sortOrder = ['incomplete', 'complete'];   // Declare a array that defines the order of the elements to be sorted.
              data.sort(
                function (a, b) {                              // Pass a function to the sort that takes 2 elements to compare
                  if (a.done == b.done) {                    // If the elements both have the same `type`,
                    return a.title.localeCompare(b.task); // Compare the elements by `name`.
                  } else {                                   // Otherwise,
                    return sortOrder.indexOf(a.done) - sortOrder.indexOf(b.done); // Substract indexes, If element `a` comes first in the array, the returned value will be negative, resulting in it being sorted before `b`, and vice versa.
                  }
                }
              );
            }
           
              data.forEach(element => {
                  count++;
                  console.log(count)
                  $('#accordionExample').append(
                    $('.testing').append(
                    '<div class="taskss"><div class="card" style="text-align: center;">'+
                      '<div class="card-header" id="'+element.id+count+'">'+
                        '<h2 class="mb-0">'+
                          '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#ok'+element.id+'" aria-expanded="true" aria-controls="'+element.id+'">'+
                            '<h6> Title: '+element.task+'</h6>'+
                            '<h6> Due-Date: '+element.due+'</h6>'+
                            '<h6> Status: '+element.done+'</h6>'+
                            '<h6> Description: '+element.description+'</h6>'+
                            '<h6> Priority: '+element.priority+'</h6>'+
                          '</button>'+
                        '</h2>'+
                      '</div>'+
                      '<div id="ok'+element.id+'" class="collapse" aria-labelledby="'+element.id+count+'" data-parent="#accordionExample">'+
                        '<div class="card-body" id ="cardbody'+element.id+'">'+
                        '<input type = "text" id= "'+element.id+'notesbox" ></input>'+
                        '<input type="submit" value="Add" id="'+element.id+'notesbutton">'+
                        '<input type="submit" value="Edit" OnClick="editForm()" id="'+element.id+'editbutton">'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                    '</div></div>'
  
                  ));
                  
                  $(document).on('click', '#' + element.id + 'notesbutton', function () {
           
                    var taskTitle = element.task;
                    console.log("ji")
                   
                    var taskNote = $('#' + element.id + 'notesbox').val();
                    $.ajax({
                      datatype: 'json',
                      url: '/todo/'+element.id+'/notes',
                      type: 'post',
                      data: { notes: taskNote },
                      success: function (data) {
                        console.log("successfully added Note ");
                      }
                  
                    });
                    // var reloadPage = function () { location.reload(true); }
                    // location.reload(true);
                    // reloadComponent = reloadPage;
                  
                  });
                    //This function would edit the corresponding Task
          $(document).on('click', '#' + element.id + 'editbutton', function () {
            alert("Great now fill the updated Info on the right side")
            var taskTitle = element.task;
            var taskId=element.id;
            var due_Date = element.due.month;
            var priority = element.priority;

            setFormData(taskTitle, due_Date, priority,taskId);

          });
                  notesCall(element.id);
              });
              
          }

      });

      
    }  
               
refreshTasks();
$(document).on('click', '#edit', function () {
  var taskid = document.getElementById("eid").value;
  var taskTitle = document.getElementById("etask").value;
  var taskDate = document.getElementById("edue").value;
  
  var taskPriority;
  var taskStatus = "incomplete";
  if(document.getElementById("epriority1").checked){taskPriority = "High"}
  if(document.getElementById("epriority2").checked){taskPriority = "Medium"}
  else{taskPriority = "Low"}
  if (document.getElementById('estatus1').checked) {
    taskStatus = document.getElementById('estatus1').value;
  }
  $.ajax({
    datatype: 'json',
    url: '/todo/'+taskid,
    type: 'patch',
    data: { done: taskStatus, due: taskDate, priority: taskPriority,task:taskTitle },
    success: function (data) {
      console.log("successfully edited Task ");
    }

  });
  
});
var notesCall = function (  id) {

  $.ajax({
    datatype: 'json',
    url: '/todo/' + id + '/notes',
    type: 'get',

    success: (data) => {

      data.forEach(element => {

        $('#cardbody' + id).append(

          '<div class="card border-success mb-3">' +
          '<div class="card-header">Note</div>' +
          '<div class="card-body text-success">' +
          '<h5 class="card-title">' +
          element.note +
          '</h5>' +
          '</div>' +
          '</div>'

        );

      })

    }

  });

}

$('#submit1').onclick=function() {
  var obj = $('#formdata');

  $.ajax({
      type: "POST",
      url: "/todo",
      data: JSON.stringify(obj),
      dataType: "json",
      contentType : "application/json",
      success: function(data){
          console.log(data)
      }
      
  });
}
 //Sort by date descending
 $('#b1').click(() => {

  sortType = 1;
  $("#accordionExample").empty();
 
  window.setTimeout(refreshTasks, 2000);


});

//Sort by date ascending
$('#b2').click(() => {

  sortType = 2;
  $("#accordionExample").empty();
 
  window.setTimeout(refreshTasks, 2000);


});

//Sort by priority
$('#b3').click(() => {

  sortType = 3;
  $("#accordionExample").empty();
 
  window.setTimeout(refreshTasks, 2000);


});

//Sort by status
$('#b4').click(() => {

  sortType = 4;
  $("#accordionExample").empty();
  
  window.setTimeout(refreshTasks, 2000);


});
})