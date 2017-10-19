import { Component } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { Http, Headers } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FotoService } from '../foto/foto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html'
})
export class CadastroComponent {

    foto: FotoComponent = new FotoComponent();
    service: FotoService;
    formulario: FormGroup;
    mensagem: string = '';
    route: ActivatedRoute;
    router: Router;

    constructor(service: FotoService, fb: FormBuilder, route: ActivatedRoute, router: Router) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.lerParametros(route);
        this.adicionarValidacoes(fb);
    }

    lerParametros(route: ActivatedRoute): void {
        let id = null;
        this.route.params.subscribe(params => id = params['id']);
        if(id) {
            this.service.buscarPorId(id).subscribe((foto) => {
                this.foto = foto;
            },
            erro => console.log(erro));
        }
    }

    adicionarValidacoes(fb: FormBuilder): void {
        this.formulario = fb.group({
            titulo: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            url: ['', Validators.required],
            descricao: ['']
          });
    }

    cadastrar(event): void {
        event.preventDefault();
        
        this.service.salvar(this.foto).subscribe(
                (res) => {
                    this.foto = new FotoComponent();
                    this.mensagem = res.mensagem;
                    if(!res.inclusao){
                        this.router.navigate(['']);
                    }
                },
                erro => {
                    this.mensagem = "Não foi possível cadastrar o registro.";
                    console.log(erro);
                }
            );
    }

}