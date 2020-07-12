import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import { Term } from './term';

@Injectable({
  providedIn: 'root'
})
export class TermServiceService {

  private termsUrl:string = "http://localhost:8000/terms";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json"
    })
  }

  constructor(private http:HttpClient) { }

  getTerms():Observable<any[]> {
    // to do search accepts matches for term 
    // for now other end limits response data
    return this.http.get<Term[]>(this.termsUrl);
  }

  getTermsLike(term:string):Observable<any[]> {
    term = term.trim();
    if (!term) return of([]);
    
    const url = `http://localhost:8000/term?term=${term}`;
    return this.http.get<Term[]>(url).pipe(
      tap(_=>console.log(JSON.stringify(_)))
    );
  }

  addTerm(term:Term):Observable<any>{
    const url = `${this.termsUrl}/add`;
    return this.http.post<any>(url, [term], this.httpOptions).pipe(
      tap(_=> console.log(`Sent term ${JSON.stringify(term)}`))
    );
  }

  deleteTerm(term_id:string):Observable<any> {
    const url = `http://localhost:8000/term/delete/${term_id}`;
    return this.http.delete<any>(url, this.httpOptions).pipe(
      tap(_=>console.log(JSON.stringify(_)))
    );
  }
}
