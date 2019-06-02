import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})


export class TablaComponent {
  editField: string;
  idPedido: string;

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  routingSubscription: any;

  personList: Array<any> = [
    { id: 10, codigo: '44015', descripcion: 'Aceite Carbonell 0.4', cantRef: 10, um: 'CJ', cant: 10, dif: 0 },
    { id: 20, codigo: '30458', descripcion: 'Coca Cola Lata 30 Cc', cantRef: 20, um: 'CJ', cant: 20, dif: 0 },
    { id: 30, codigo: '21106', descripcion: 'Azucar Refinado 1 Kg', cantRef: 12, um: 'CJ', cant: 12, dif: 0 }
  ];

  awaitingPersonList: Array<any> = [
    { id: 40, codigo: '44015', descripcion: 'Aceite Carbonell 0.4', cantRef: 30, um: 'CJ', cant: 30, dif: 0 },
    { id: 50, codigo: '30458', descripcion: 'Coca Cola Lata 30 Cc', cantRef: 40, um: 'CJ', cant: 40, dif: 0 },

  ];

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
    this.personList[id]["dif"] = this.personList[id]["cant"] -
    this.personList[id]["cantRef"];
  }

  remove(id: any) {
    this.awaitingPersonList.push(this.personList[id]);
    this.personList.splice(id, 1);
  }

  add() {
    if (this.awaitingPersonList.length > 0) {
      const person = this.awaitingPersonList[0];
      this.personList.push(person);
      this.awaitingPersonList.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  ngOnInit() {

    this.routingSubscription = this.route.params.subscribe(params => {
      this.idPedido = params["idPedido"];
      console.log("idPedido=" + this.idPedido );
    })

  }


  goBack() {
    this.router.navigate(['']);
  }

  goValidar() {
    console.log("Grabando!");
  }

}
