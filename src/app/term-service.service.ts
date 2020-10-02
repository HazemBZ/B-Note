import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, concat } from 'rxjs';
import { catchError, map, tap, switchMap} from 'rxjs/operators';
import { Term } from './term';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TermServiceService {
  private base:string = `http://${environment.api_ip}:${environment.api_port}`; 
  private termsUrl:string = `${this.base}/terms`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json"
    })
  }
  
  public tags = [];
  public index= 0;
  public termPopShow= false;
  public lastHighlightTerm;
  public markdown:Observable<string> = null;
  public parsed_markdown:Observable<any> = null;
  public filteredTerms:Term[] = [];
  public focusedTermIndex = null;

  constructor(private http:HttpClient) { }

  getTerm(id:string):Observable<Term> {
    const url = `${this.base}/term?id=${id}`;
    return this.http.get<Term>(url, this.httpOptions);
  }
  
  getTerms():Observable<any[]> {
    // to do search accepts matches for term 
    // for now other end limits response data
    return this.http.get<Term[]>(this.termsUrl);
  }

  getTermsLike(term:string):Observable<any[]> {
    term = term.trim();
    if (!term) return of([]);
    
    const url = `${this.termsUrl}?term=${term}`;
    return this.http.get<Term[]>(url).pipe(
      tap(_=>console.log(JSON.stringify(_)))
    );
  }

  getTermsByCategories(cat:any[]):Observable<any> { // for now by one cat
    
    return this.http.get<Term[]>(`${this.termsUrl}?categories=${cat.join('+')}`);

  }

  addTerm(term:Term):Observable<any>{
    const url = `${this.termsUrl}/add`;
    return this.http.post<any>(url, [term], this.httpOptions).pipe(
      tap(_=> console.log(`Sent term ${JSON.stringify(term)}`))
    );
  }

  deleteTerm(term_id:string):Observable<any> {
    const url = `http://${environment.api_ip}:${environment.api_port}/term/delete/${term_id}`;
    return this.http.delete<any>(url, this.httpOptions).pipe(
      tap(_=>console.log(JSON.stringify(_)))
    );
  }
  
  updateTerm(term:Term):Observable<any> {
    const url = "";
    return this.http.patch<any>(`http://${environment.api_ip}:${environment.api_port}/term/patch`, term,this.httpOptions).pipe(
      tap(_=> console.log("received " + JSON.stringify(_)))
    );
  }

  parseMarkdown(markdown:string):Observable<any> {
    const url = `http://${environment.api_ip}:${environment.api_port}/markdown/html`;
    return this.http.post<any>(url, [markdown], this.httpOptions).pipe(
      tap(_=> console.log("received " + JSON.stringify(_)))
    );
  }

  public updateParsedMardown(markdown){
    this.parseMarkdown(markdown).subscribe((resp)=>{
      this.parsed_markdown= resp.parse_result;//this.reflectFocusedTermUpdate(markdown);
      // term.desc = resp.parse_result;
    });
    
  }

  public reflectFocusedTermUpdate(mark){
    // console.log(`index is ${this.focusedTermIndex}`);
    // console.log(`updating description from ${this.filteredTerms[this.focusedTermIndex].desc}`)
    // console.log(`to ${mark}`)
    this.filteredTerms[this.focusedTermIndex].desc = mark;
    // maybe change terms desc to bind to parsedMarkup
    // thnen update that parsed markup instead
    // OR maybe seperate description from markup => each an individual attribute of its own
    
  }

  //// tags update 
  // tagsSubjects: Subject<any>[] = <any>[];
  // $tagsObs: Observable<any>[] = [];

  // createTag(index){
  //   this.tagsSubjects[index] = new Subject<any>();
  //   this.$tagsObs[index] = this.tagsSubjects[index].pipe();
    
  //   console.log("CREATE TAG: this.tagsSubjects ",this.tagsSubjects)
  // }

  // getTag(index){
    
  //   let inter = this.$tagsObs[index];
  //   console.log("getTag ", inter);
  //   return inter;
  // }

  updateTag(index, data){
    this.tags[index] = data;
  }

  // getSub(index){
  //   return this.tagsSubjects[index];
  // }

  showTermPop(){
    this.termPopShow = true;
  }

  // prototype implementation
  getCategories():string[] {
    return [
      "ALL",
      "Music",
      "IT",
      "Note",
      "Manga",
      "Sports",
      "News",
      "Term",
    ];
  }

}