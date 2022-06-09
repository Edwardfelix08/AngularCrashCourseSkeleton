import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  
  taskText: string = '';
  day: string ='';
  reminder: boolean = false; 
  showAddTaskForm: boolean = false;
  subscription: Subscription = new Subscription;


  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value=> (this.showAddTaskForm = value));
  }

  ngOnInit(): void {
  }

  onSubmit(){
    var message: string = '';
    if(!this.taskText) {
      message = message + 'Task Name is required';
    }
    if(!this.day){
      message = message + 'Day is required';
    }
    
    if(message){
      alert( message);
      return;
    } else {
      var newTask: Task ={
        Day: this.day,
        Reminder: this.reminder,
        Text: this.taskText
      };

      this.onAddTask.emit(newTask);

      this.day = '';
      this.reminder = false;
      this.taskText = '';
    }
  } 

}
