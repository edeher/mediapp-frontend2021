import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Medico } from 'src/app/_model/medico';
import { Paciente } from 'src/app/_model/paciente';
import { Signos } from 'src/app/_model/signos';
import { PacienteService } from 'src/app/_service/paciente.service';
import { SignosService } from 'src/app/_service/signos.service';

@Component({
  selector: 'app-signos-dialogo',
  templateUrl: './signos-dialogo.component.html',
  styleUrls: ['./signos-dialogo.component.css']
})
export class SignosDialogoComponent implements OnInit {

  signos: Signos;
  fechaSeleccionada:Date=new Date(); //variable para el calendario
  maxFecha:Date=new Date(); // restrincion del picker fecha
  pacientes : Paciente[];
  idPacienteSeleccionado : number;
  constructor(
    private dialogRef: MatDialogRef<SignosDialogoComponent>, //referencia del dialogo, para poder operar con el
    @Inject(MAT_DIALOG_DATA) private data:Signos,//recibe la data que le envio el padre, quien aperturo el dialogo
    private signosService: SignosService,
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {
    this.listarPacientes();
    console.log(this.data);
    
    this.idPacienteSeleccionado=this.data.paciente.idPaciente;

    this.signos=new Signos(); //cargo la data apenas carga el modal
    this.signos.idSignos=this.data.idSignos;
    //this.signos.paciente=this.data.paciente;
    this.signos.temperatura=this.data.temperatura;
    this.signos.pulso=this.data.pulso;
    this.signos.ritmo=this.data.ritmo;
    this.signos.fecha=this.data.fecha;
     }

  operar(){
    if(this.signos!=null && this.signos.idSignos>0){
      //Modificar
      let paciente=new Paciente();
      paciente.idPaciente=this.idPacienteSeleccionado;
      this.signos.paciente=paciente;
      
      this.signosService.modificar(this.signos).pipe(switchMap (()=>{
        return this.signosService.listar();
      })).subscribe(data =>{
        this.signosService.setSignosCambio(data);
        this.signosService.setMensajeCambio('SE MODIFICO');
      });
    }else{
      //Registrar
      let paciente=new Paciente();
      paciente.idPaciente=this.idPacienteSeleccionado;
      this.signos.paciente=paciente;

      this.signosService.registrar(this.signos).pipe(switchMap (()=>{
        return this.signosService.listar();
      })).subscribe(data =>{
        this.signosService.setSignosCambio(data);
        this.signosService.setMensajeCambio('SE REGISTRO');
      });
    }
    this.cerrar();
  }

  cerrar(){
      this.dialogRef.close();
  }

  listarPacientes(){
      this.pacienteService.listar().subscribe(data=> this.pacientes=data);
  }

}
