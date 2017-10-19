import { Component } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { Http, Headers } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FotoService } from '../foto/foto.service';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html'
})
export class CadastroComponent {

    foto: FotoComponent = new FotoComponent();
    service: FotoService;
    formulario: FormGroup;

    constructor(service: FotoService, fb: FormBuilder) {
        this.service = service;

        this.formulario = fb.group({
                            titulo: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
                            url: ['', Validators.required],
                            descricao: ['']
                          });
    }

    cadastrar(event) {
        event.preventDefault();
        
        this.service.cadastrar(this.foto).subscribe(
                () => {
                    this.foto = new FotoComponent();
                    console.log("Foto armazenada com sucesso.");
                },
                erro => console.log(erro)
            );
    }

}