import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(fb: FormBuilder, public dialog: MatDialog) {
    this.question3 = fb.group({
      two: false,
      five: false,
      seventeen: false,
      twenty: false,
    });

    this.question8 = fb.group({
      sight: false,
      taste: false,
      fly: false,
      electricity: false,
      sound: false,
    });
  }

  ngOnInit(): void {
  }

  answered3 = false;
  answered8 = false;
  answered10 = false;

  answerWrong = false;
  disable = false;

  question2 = "";
  question3: FormGroup;
  question6 = "";
  question8: FormGroup;

  errorList: Array<DialogData> = [];

  animals: string[] = ['Cat', 'Dog', 'Swan', 'Lion'];  
  placesList: string[] = ['New York', 'Seville', 'India', 'Morocco'];
  

  changeStatus(number: number){
    number === 3 ? this.answered3 = true : number === 8 ? this.answered8 = true : this.answered10 = true;
  }

  send(question1: string, question2: string, question3: HTMLElement, question4: string, question5: string, question6: string, question7: string, question8: HTMLElement, question9: string, question10: boolean){

    // Check that the questions have been answered
    if (question1 === '' || question5 === '' || question9 === ''){ // Inputs
      this.openDialogUnansweredQuestions();
    } else if (question2 === ''|| question6 === ''){ //Radio buttons
      this.openDialogUnansweredQuestions();
    } else if (question4 === undefined|| question7 === undefined){ // Selects
      this.openDialogUnansweredQuestions();
    } else { // Check that the answers are correct      
      
      this.disable = true; // Disable button (only 1 attempt)

      (question1.toLowerCase() === 'the beatles' || question1.toLowerCase() === 'beatles') ? '' : this.openDialogWrongQuestions(1, 'The Beatles');
      question2 === 'Dog' ? '' : this.openDialogWrongQuestions(2, 'Dog');
      (this.question3.controls['two'].value === false && this.question3.controls['five'].value === true && this.question3.controls['seventeen'].value === true && this.question3.controls['twenty'].value === false) ? '' : this.openDialogWrongQuestions(3, '5 and 17');
      question4 === 'january' ? '' : this.openDialogWrongQuestions(4, 'January');
      (question5.toLowerCase() === 'earth' || question5.toLowerCase() === 'the earth') ? '' : this.openDialogWrongQuestions(5, 'Earth');
      question6 === 'India' ? '' : this.openDialogWrongQuestions(6, 'India');
      question7 === 'mexico' ? '' : this.openDialogWrongQuestions(7, 'Mexico');
      (this.question8.controls['sight'].value === true && this.question8.controls['taste'].value === true && this.question8.controls['fly'].value === false && this.question8.controls['electricity'].value === false && this.question8.controls['sound'].value === true) ? '' : this.openDialogWrongQuestions(8, 'sight, taste and sound');
      (question9.toLowerCase() === 'miguel de cervantes' || question9.toLowerCase() === 'cervantes') ? '' : this.openDialogWrongQuestions(9, 'Miguel de Cervantes');
      question10 === true ? '' : this.openDialogWrongQuestions(10, 'true, humans rocks!');

      
      // Open Success dialog
      if (this.answerWrong === false){
        this.openDialogSuccess();
      }
    }

  }  

   // Display dialog for wrong questions/failure
   openDialogWrongQuestions(number: number, solution: string) {    
    this.answerWrong = true;
    
    const dialogRef = this.dialog.open(DialogContentWrongQuestions, {
      data: {number: number, solution: solution},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  // Display dialog for unanswered questions
  openDialogUnansweredQuestions() {
    const dialogRef = this.dialog.open(DialogContentUnansweredQuestions);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  
  // Display dialog for success
  openDialogSuccess() {
    const dialogRef = this.dialog.open(DialogContentSuccess);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


export interface DialogData {
  number: number;
  solution: string;
}


@Component({
  selector: 'dialog-content-wrong-questions',
  templateUrl: './dialog-content-wrong-questions.html',
})
export class DialogContentWrongQuestions {
  constructor(
    public dialogRef: MatDialogRef<DialogContentWrongQuestions>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'dialog-content-unanswered-questions',
  templateUrl: './dialog-content-unanswered-questions.html',
})
export class DialogContentUnansweredQuestions {}


@Component({
  selector: 'dialog-content-success',
  templateUrl: './dialog-content-success.html',
})
export class DialogContentSuccess {}