import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { FotoService } from '../foto/foto.service';
import { FotoComponent } from '../foto/foto.component';

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html'
})
export class ListagemComponent {

    fotos: Object[] = [];
    service: FotoService;

    constructor(service: FotoService){
        this.service = service;
        this.listar();
    }

    listar() {
        this.service.listar().subscribe(
            (res) => this.fotos = res.json(),
            (erro) => console.log(erro)
        );
    }

    remover(foto: FotoComponent): void {
        this.service.remover(foto).subscribe(
            () => {
                this.listar();
                console.log("Registro removido com sucesso.");
            },
            (erro) => console.log(erro)
        );
    }
}