import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private htpp:HttpClient) { }
  getquestionjson(){

    return this.htpp.get<any>("assets/questions.json")
  }
}
