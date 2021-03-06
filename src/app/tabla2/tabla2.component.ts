import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, of} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabla2',
  templateUrl: './tabla2.component.html',
  styleUrls: ['./tabla2.component.scss']
})
export class Tabla2Component {

  displayedColumns = ['codigo','name', 'symbol', 'comment', 'actionsColumn'];
  dataSource = new ExampleDataSource(initialData);

  idPedido: string;
  routingSubscription: any;

  constructor(private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {

    this.routingSubscription = this.route.params.subscribe(params => {
      this.idPedido = params["idPedido"];
      console.log("idPedido=" + this.idPedido );
    })
  }

  update(el: Element, comment: string) {
    if (comment == null) { return; }
    // copy and mutate
    const copy = this.dataSource.data().slice()
    el.comment = comment;
    this.dataSource.update(copy);
  }
  remove (el: Element ) {
    //console.log("inicial="+JSON.stringify(this.dataSource.data())) ;
    const copy =  this.dataSource.data().filter( row => row != el );
    //console.log("copy="+JSON.stringify(copy)) ;
    
    this.dataSource.update(copy);
    //console.log("json="+JSON.stringify(this.dataSource.data())) ;
    //console.log( "adeu");
  }

  addRow() {
    
    this.dataSource.data().push({
      id: 1,
      codigo: '30025',
      name: "Hydrogen",
      symbol: "CJ",
      comment: '20'
    });
    const copy = this.dataSource.data().filter( row => row );
    this.dataSource.update(copy);

  }

  
  goBack() {
    this.router.navigate(['']);
  }

  goValidar() {
    console.log("Grabando!");
  }
}

export interface Element {
  id: number;
  codigo: string;
  name: string;
  symbol: string;
  comment?: string;
}

const initialData: Element[] = [
  {id: 1,codigo: '30458',name: 'Coca Cola Lata 33 Cl', symbol: 'CJ', comment: '12'},
  {id: 2,codigo:'30000',name:'Agua Font Vella 1,5 L', symbol: 'UN',  comment: '24'},
  {id: 3,codigo:'49000',name:'Leche Pascual Semi 1 L', symbol: 'CJ', comment: '10'},
  {id: 4, codigo:'21106',name: 'Azucar Blanco Refinado 1 Kg', symbol: 'CJ',  comment: '15'},
];

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {

  private dataSubject = new BehaviorSubject<Element[]>([]);

  data() {
    return this.dataSubject.value;
  }

  update(data) {
    this.dataSubject.next(data);
  }

  constructor(data: any[]) {
    super();
    this.dataSubject.next(data);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return this.dataSubject;
  }

  disconnect() {}
}