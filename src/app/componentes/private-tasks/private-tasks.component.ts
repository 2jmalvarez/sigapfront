import { Component, OnInit  } from '@angular/core';
import { TaskService } from '../../servicios/task.service'
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


import { ComunicService } from 'src/app/servicios/comunic.service';



@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css'],

})

export class PrivateTasksComponent implements OnInit {




  public get taskService(): TaskService {
    return this._taskService;
  }
  public set taskService(value: TaskService) {
    this._taskService = value;
  }

  privateTasks = [];

  constructor(
    private _taskService: TaskService,
    private router: Router,
    private servicioComunicacion: ComunicService
  ) { }

  onClickMe(a){
    // console.log(a);
    this.servicioComunicacion.enviarMensaje(a);
    
  }


  ngOnInit() {
    this.taskService.getPrivateTasks()
      .subscribe(
        res => {
          this.privateTasks = res
          // console.log(res);
        
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/signin']);
            }
          }
        }
      )
  }

}
