import { Component, OnInit } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

interface IdForm {
  id: FormControl
}

@Component({
 selector: 'app-user-delete-id',
 standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    UsersService
  ],
 templateUrl: './user-delete-id.component.html',
 styleUrls: ['./user-delete-id.component.scss']
})
export class UserDeleteIdComponent implements OnInit {

  idForm: FormGroup<IdForm>;
  usuario: any;

constructor(
  private router: Router,
  private usersService: UsersService,
  private toastService: ToastrService,
  public dialog: MatDialog
){
  this.idForm = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.minLength(1)]),
  })
}

 ngOnInit(): void {
 }

 submit(){
  this.usersService.deleteUsuarioById(this.idForm.value.id).subscribe({
    next: () => {
      this.toastService.success("Usuário Deletado com Sucesso.");      
  },
    error: (err) => {
      if (err.status === 403) {
        this.toastService.error("Usuário sem permissão para executar essa ação.")
      } else if (err.status === 404) {
        this.toastService.error("O ID do Usuário não foi localizado.")
      } else {
        this.toastService.error("Erro Desconhecido. Tente novamente.")
      }
    }
  })
}

backUsersPanel(){
  this.router.navigate(["users-panel"])
}
}