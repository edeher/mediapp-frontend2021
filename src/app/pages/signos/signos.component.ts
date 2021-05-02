import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Signos } from 'src/app/_model/signos';
import { SignosService } from 'src/app/_service/signos.service';
import { SignosDialogoComponent } from './signos-dialogo/signos-dialogo.component';


@Component({
  selector: 'app-signos',
  templateUrl: './signos.component.html',
  styleUrls: ['./signos.component.css']
})
export class SignosComponent implements OnInit {

  displayedColumns=['idSignos', 'paciente','apellidos','temperatura','pulso','ritmo','fecha','acciones'];
                      //tambien es el orden para mostrar ene l html
  dataSource: MatTableDataSource<Signos>;
  
  constructor(
    private signosService: SignosService,
    private snackBar: MatSnackBar,
    private dialog:MatDialog
    ) { }

  ngOnInit(): void {
    this.signosService.listar().subscribe(data => {
      this.dataSource=new MatTableDataSource(data);

    });

    this.signosService.getSignosCambio().subscribe(data=>{// verifico si hay cambios y lo cargo cuando se llama, reactivo
      this.dataSource=new MatTableDataSource(data);
    });

    this.signosService.getMensajeCambio().subscribe(data => {// verifica si hay cambios en el mensaje, reactivo
      this.snackBar.open(data,'AVISO', {duration:2000});
    });

  }
  filtrar(valor: string){
    this.dataSource.filter=valor.trim().toLowerCase();
  }

  eliminar(idSignos: number){
      this.signosService.eliminar(idSignos).pipe(switchMap(()=>{
        return this.signosService.listar();
      })).subscribe(data=>{
        this.signosService.setSignosCambio(data);
        this.signosService.setMensajeCambio('SE ELEIMINO');
      });
      
  }

  abrirDialogo(signos?: Signos){// el parametro es opcional "?"
    let sig=signos!=null? signos:new Signos();
    console.log(sig);
      this.dialog.open(SignosDialogoComponent,{//lamando al componente que se abre en el modal/dialogo
        
        width:'250px',
        data: sig
      });

  }

}

