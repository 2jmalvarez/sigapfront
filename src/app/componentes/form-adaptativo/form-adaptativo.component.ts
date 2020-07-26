import {Component, Inject , Input, OnInit, OnChanges} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 * 
 */
// @Component({
//   selector: 'dialog-overview-example',
//   templateUrl: 'dialog-overview-example.html',
//   styleUrls: ['dialog-overview-example.css'],
// })
@Component({
  selector: 'form-adaptativo',
  templateUrl: './form-adaptativo.component.html',
  styleUrls: ['./form-adaptativo.component.css']
})
// export class DialogOverviewExample {
  export class FormAdaptativoComponent implements OnChanges {

  @Input("BASE") BASE: {}
  @Input("TIPO") TIPO: {}
  @Input("FLAG") FLAG: Boolean
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {
  }
  
  // ngOnInit(): void {
  //   this.openDialog()
  //   console.log("ngOnInit");
  //   // this.BuscarBase(this.BASE)

  ngOnChanges(a){
    console.log("aaaaa", a);
    // if(a)
    // this.openDialog()
  }

  // }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '650px',
      // data: {name: this.name, animal: this.animal}
      data: { base: this.BASE, tipo: this.TIPO},
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.animal = result;
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

// import { Component, OnInit } from '@angular/core';
// import {  ViewChild, Output, EventEmitter, Input, OnChanges } from '@angular/core';
// import { FormControl , FormBuilder , FormGroup , Validators } from '@angular/forms';

// @Component({
//   selector: 'form-adaptativo',
//   templateUrl: './form-adaptativo.component.html',
//   styleUrls: ['./form-adaptativo.component.css']
// })
// export class FormAdaptativoComponent implements OnInit {

//   form: FormGroup;
//   @Input("BASE") BASE: {}
//   // @Output() Seleccionado = new EventEmitter<string>();

//   constructor(
//     private FormBuilder: FormBuilder
//   ) {
//     this.buildForm2(this.BASE);

//    }
   

//   ngOnInit(): void {
//   }

//   private buildForm2(a){


//     for (const key in a) {
//       if (a.hasOwnProperty(key)) {
//         const element = a[key];
//         console.log(element);
        
        
//       }
//     }
//     // this.form = this.FormBuilder.group({
//     //   name: ['',  [Validators.required]],
//     //   date: ['', [Validators.required]],
//     //   email: ['', [Validators.required, Validators.email]],
//     //   text: ['', [Validators.required, Validators.maxLength(200)]],
//     //   category: ['', [Validators.required]],
//     //   gender: ['', [Validators.required]],
//     // });
//   }

//   private buildForm() {

    

//     this.form = this.FormBuilder.group({
//       name: ['',  [Validators.required]],
//       date: ['', [Validators.required]],
//       email: ['', [Validators.required, Validators.email]],
//       text: ['', [Validators.required, Validators.maxLength(200)]],
//       category: ['', [Validators.required]],
//       gender: ['', [Validators.required]],
//     });

//     this.form.valueChanges
//     .subscribe(value => {
//       console.log(value);
//     });
//   }

//   save(event: Event) {
//     event.preventDefault();
//     if (this.form.valid) {
//       const value = this.form.value;
//       console.log(value);
//     }
//   }

// }
