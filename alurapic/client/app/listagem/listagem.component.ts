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

    fotos: FotoComponent[] = [];
    service: FotoService;
    mensagem: string = '';

    constructor(service: FotoService){
        this.service = service;
        this.listar();
    }

    listar() {
        this.service.listar().subscribe(
            res => this.fotos = res,
            erro => console.log(erro)
        );
    }

    remover(foto: FotoComponent): void {
        this.service.remover(foto).subscribe(
            () => {
                let novaLista = [].concat(this.fotos);
                novaLista.splice(novaLista.indexOf(foto), 1);
                this.fotos = novaLista;
                this.mensagem = "Registro removido com sucesso."
            },
            erro => {
                this.mensagem = "Não foi possível remover o registro.";
                console.log(erro);
            }
        );
    }
}