import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public name : string="";
  public questionList : any=[];
  public currentQuestion:number=0;
  public point:number=0;
  counter=60; 
  correctAnswer :number=0;
  worngAnswer :number=0;
  intrval$:any;
  progress:any;
  isQuizCompleted:boolean=false;
  constructor(private questionserver:QuestionService) { }
  ngOnInit(): void {
    this.name=localStorage.getItem("name")!;//! mean that we well get this value ? without it i get an error
    this.getAllQuestion();
    this.startcountr();
  }
  getAllQuestion(){
    this.questionserver.getquestionjson().subscribe(res => {
      this.questionList = res.questions;});
  }
  NextQuestion(curentQ:number){
     this.currentQuestion++; 
    if(curentQ===this.questionList.length){
      this.isQuizCompleted=true;
      this.stopcounter();
    }
  }
  PreviousQuestion(){ this.currentQuestion--; }
  answer(curentQ:number,option:any){
    if(curentQ===this.questionList.length){
      this.isQuizCompleted=true;
      this.stopcounter();
    }
    if(option.correct){
      this.point+=10;
      this.correctAnswer++;
      setTimeout(() => {
      this.currentQuestion++;
      this.getProgressPercent();
      this.restcounter();        
      }, 1000);

    }else{
      setTimeout(() => {
        this.worngAnswer++;
        this.currentQuestion++;
        this.getProgressPercent();
        this.restcounter();
         }, 1000);
        this.point-=10;
    }
  }
  startcountr(){
    this.intrval$=interval(1000).subscribe(val=>{this.counter--;
     if(this.counter==0){
      this.currentQuestion++;
      this.counter=60;
      this.point=-10;
    }});
   setTimeout(() => {
    this.intrval$.unsubscribe()
   }, 600000);
}
  stopcounter(){ this.intrval$.unsubscribe();this.counter=0; }
  restcounter(){this.stopcounter();this.counter=60;this.startcountr();}
  restquiz(){this.restcounter();this.getAllQuestion();this.counter=60;this.point=0;this.currentQuestion=0;}
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;

  }
}
