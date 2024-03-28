import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../utilitarios/modelos/Cliente';
import { ClienteService } from '../../servicios/Cliente.service';

@Component({
  selector: 'app-Pag-lista-clientes',
  templateUrl: './Pag-lista-clientes.component.html',
  styleUrls: ['./Pag-lista-clientes.component.css']
})
export class PagListaClientesComponent implements OnInit {

  constructor(private clienteService: ClienteService ) { }

  public listaClientes:Array<Cliente> = [];

  ngOnInit() {
    this.consultarCliente();
  }

  consultarCliente(){
    this.clienteService.getClientes().subscribe(respuesta =>{
      if(respuesta.codigo == '1'){
        // this.listaClientes = respuesta;

      }
    })
  }

}
