import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Menu } from './_model/menu';
import { LoginService } from './_service/login.service';
import { MenuService } from './_service/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: string;
  roles: string[]=[];
  menus: Menu[];

  constructor(
    private menuService : MenuService,
    public loginService: LoginService
  ) { }

  ngOnInit() {
    this.menuService.getMenuCambio().subscribe(data => {
      this.menus = data;
      this.cargarUser();
    });

    
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
      

    }

    
    //let decodedToken = helper.decodeToken(this.loginService.estaLogueado());

  }

}
