import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component ({
    moduleId: module.id,
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    fotos: Object[] = [];
    
    constructor(http: Http){
        http.get('v1/fotos').subscribe(
            (res) => this.fotos = res.json(),
            (erro) => console.log(erro)
        );
    }

}