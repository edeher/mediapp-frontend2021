import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from 'src/app/_service/login.service';
import { MenuService } from 'src/app/_service/menu.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  user: string;
  roles: string[]=[];


  constructor(
    private menuService : MenuService,
    public loginService: LoginService
  ) { 
    
  }

  ngOnInit(): void {
    this.cargarUser();
  }

  cargarUser(){
    

    let rpta = this.loginService.estaLogueado();
    if (!rpta) {
      this.loginService.cerrarSesion();
      return false;
    }else{
      const helper = new JwtHelperService();
      let token = sessionStorage.getItem(environment.TOKEN_NAME);
  
      const decodedToken = helper.decodeToken(token);
      console.log(decodedToken.user_name);
      this.user=decodedToken.user_name;
      this.roles=decodedToken.authorities;

    }

}
}

