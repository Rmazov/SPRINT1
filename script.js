

const listaUsuarios = [
    { nombre: "Leire", numeroId: "10", password: "100", isAdmin: 1 },
    { nombre: "Gorka", numeroId: "20", password: "200", isAdmin: 2 },
    { nombre: "Miguel", numeroId: "30", password: "300", isAdmin: 1 },
    { nombre: "Lucía", numeroId: "40", password: "400", isAdmin: 2 },
    { nombre: "Ricardo", numeroId: "50", password: "500", isAdmin: 1 }
];
let cantidadBilletes = [
    [5000, 0], [10000, 0], [20000, 1], [50000, 0], [100000, 0]
];

validarUsario();

function validarUsario() {
    const idIngresada = prompt("Ingrese su Id");
    console.log(idIngresada);
    const resultId = listaUsuarios.find(listaUsuarios => listaUsuarios.numeroId === idIngresada);

    if (resultId === undefined) {
        alert("idnoexiste");
        validarUsario();
    } else {
        const passwordUsuario = resultId.password
        const passwordIngresada = prompt(` Ingrese su Contraseña`);
        if (passwordIngresada == passwordUsuario) {
            console.log("usuario y contraseña correctos");
           
            if (resultId.isAdmin == 1) {
                // funciones del admin cargar billetes
                console.log("es admin");
                console.log(cantidadBilletes);
                cargarBilletes();
            } else {
                // funciones de retiro
                console.log("no es admin");
                retirarBilletes();
            }
        } else {
            alert("contraseña incorrecta");
            validarUsario();
        }
    }
}





function cargarBilletes() {
    cargarBilletes5();
    cargarBilletes10();
    cargarBilletes20();
   cargarBilletes50();
   cargarBilletes100();
    consultasaldoActual();
    validarUsario();
}

function retirarBilletes() {
    let valorActualCajero =(consultasaldoActual());
    if(valorActualCajero > 0){
  
   console.log( valorActualCajero);
   let valorRetirar = prompt(` ingrese valor a retirar`);
   let valorRetirarInt = parseInt(valorRetirar);
   console.log( "loffa",valorRetirarInt);
   let valorValido = (validarMultipo5(5000, valorRetirarInt));
   console.log( "loa",valorValido);
 
   
    
   if( valorRetirarInt >= 5000 && valorValido == 'ValValido'){
     if(valorRetirarInt <= valorActualCajero){
    descontarSaldoActualMayor100(valorRetirarInt);
    validarUsario();
    console.log("valorvalidominimo");
   }else{
    alert("cantidad a retirar supera cantidad actual del cajero");
    retirarBilletes();
   }
}else{
    alert("valor invalido");
    retirarBilletes();
 }

}else{
    alert("Cajero en mantenimiento, vuelva pronto.");
    validarUsario();
}
}


function validarMultipo5(x, y) {
    if (Number.isInteger(y / x)) {
      return 'ValValido';
    }
    return 'cantidad errada debe ser multiplos de 5';
    //volver a empezar
  }
 
  function descontarSaldoActualMayor100(valorRetiro) {
    let valorRestante = 0;
    console.log("entro a descontar100", valorRetiro);
    if(valorRetiro >= 100000  ){
        if(cantidadBilletes[4][1] > 0){
       let valorReAux = valorRetiro / 100000
       console.log(Math.trunc(valorReAux));
       let valorEntero = (Math.trunc(valorReAux));
       if(valorEntero > cantidadBilletes[4][1] ){
       let aux4 = valorEntero - cantidadBilletes[4][1];
       let aux5 = valorEntero -aux4;
       let aux6 = aux5*100000;
       cantidadBilletes[4][1] = cantidadBilletes[4][1]-aux5;
       console.log(aux5);
        valorRestante = valorRetiro - aux6 ;
       console.log(valorRestante );
       }else{

       
       console.log("dd",cantidadBilletes[4][1]);
       cantidadBilletes[4][1] = cantidadBilletes[4][1] - valorEntero;
       let aux = valorEntero*100000;
         valorRestante = valorRetiro - aux;
       console.log("valorres",valorRestante);
       console.log("valroaux",aux);
       console.log("dd1",cantidadBilletes[4][1]);
       console.log (cantidadBilletes);
    }
      if(valorRestante>0){
        descontarSaldoActualMayor50(valorRestante);
      } else{
        console.log("ha retirado", valorRetiro);
      }
     }else{
        console.log ("no hay billetes de 100");
        descontarSaldoActualMayor50(valorRetiro);
     }
    }else{
        descontarSaldoActualMayor50(valorRetiro);
    }
}


  function descontarSaldoActualMayor50(valorRetiro) {
    let valorRestante = 0;
    console.log("entro a descontar mayot50", valorRetiro);
    if(valorRetiro >= 50000  ){

        if(cantidadBilletes[3][1] > 0){
            console.log("entro a desconar valor restante", valorRetiro);
            let valorReAux = valorRetiro / 50000
       console.log(Math.trunc(valorReAux));
       let valorEntero = (Math.trunc(valorReAux));
       if(valorEntero > cantidadBilletes[3][1] ){
        let aux4 = valorEntero - cantidadBilletes[3][1];
        let aux5 = valorEntero -aux4;
        let aux6 = aux5*50000;
        cantidadBilletes[3][1] = cantidadBilletes[3][1]-aux5;
        console.log(aux5);
         valorRestante = valorRetiro - aux6 ;
        console.log(valorRestante );
    }else{
       console.log("dd",cantidadBilletes[3][1]);
       cantidadBilletes[3][1] = cantidadBilletes[3][1] - valorEntero;
       let aux = valorEntero*50000;
       valorRestante = valorRetiro - aux;
       console.log("valorres50",valorRestante);
       console.log("valroaux50",aux);
       console.log("dd1",cantidadBilletes[3][1]);
       console.log (cantidadBilletes);
    }
       if(valorRestante>0){
        descontarSaldoActualMayor20(valorRestante);
      } else{
        console.log("ha retirado", valorRetiro);
      }
        }else{
            console.log ("no hay billetes de 50");
            descontarSaldoActualMayor20(valorRetiro);
         }
    }else{
    descontarSaldoActualMayor20(valorRetiro);
  }
}

  function descontarSaldoActualMayor20(valorRetiro) {
    let valorRestante = 0;
    console.log("entro a descontar mayot20", valorRetiro);
    if(valorRetiro >= 20000  ){

        if(cantidadBilletes[2][1] > 0){
            console.log("entro a desconar valor restante", valorRetiro);
            let valorReAux = valorRetiro / 20000
       console.log(Math.trunc(valorReAux));
       let valorEntero = (Math.trunc(valorReAux));
       if(valorEntero > cantidadBilletes[2][1] ){
        let aux4 = valorEntero - cantidadBilletes[2][1];
        let aux5 = valorEntero -aux4;
        let aux6 = aux5*20000;
        cantidadBilletes[2][1] = cantidadBilletes[2][1]-aux5;
        console.log(aux5);
         valorRestante = valorRetiro - aux6 ;
        console.log(valorRestante );
    }else{
       console.log("dd",cantidadBilletes[2][1]);
       cantidadBilletes[2][1] = cantidadBilletes[2][1] - valorEntero;
       let aux = valorEntero*20000;
      valorRestante = valorRetiro - aux;
       console.log("valorres20",valorRestante);
       console.log("valroaux20",aux);
       console.log("dd1",cantidadBilletes[2][1]);
       console.log (cantidadBilletes);
    }
       if(valorRestante>0){
        descontarSaldoActualMayor10(valorRestante);
      } else{
        console.log("ha retirado", valorRetiro);
      }
        }else{
            console.log ("no hay billetes de 20");
            descontarSaldoActualMayor10(valorRetiro);
         }
    }else{
        descontarSaldoActualMayor10(valorRetiro); 
    }
  }

  function descontarSaldoActualMayor10(valorRetiro) {
    let valorRestante = 0;
    console.log("entro a descontar mayot10", valorRetiro);
    if(valorRetiro >= 10000  ){

        if(cantidadBilletes[1][1] > 0){
            console.log("entro a desconar valor restante", valorRetiro);
            let valorReAux = valorRetiro / 10000
       console.log(Math.trunc(valorReAux));
       let valorEntero = (Math.trunc(valorReAux));
       if(valorEntero > cantidadBilletes[1][1] ){
        let aux4 = valorEntero - cantidadBilletes[1][1];
        let aux5 = valorEntero -aux4;
        let aux6 = aux5*10000;
        cantidadBilletes[1][1] = cantidadBilletes[1][1]-aux5;
        console.log(aux5);
         valorRestante = valorRetiro - aux6 ;
        console.log(valorRestante );
    }else{
       console.log("dd",cantidadBilletes[1][1]);
       cantidadBilletes[1][1] = cantidadBilletes[1][1] - valorEntero;
       let aux = valorEntero*10000;
      valorRestante = valorRetiro - aux;
       console.log("valorres10",valorRestante);
       console.log("valroaux10",aux);
       console.log("dd10",cantidadBilletes[1][1]);
       console.log (cantidadBilletes);
    }
       if(valorRestante>0){
        
        descontarSaldoActualMayor5(valorRestante);
      } else{
        console.log("ha retirado", valorRetiro);
      }
        }else{
            console.log ("no hay billetes de 10");
            descontarSaldoActualMayor5(valorRetiro);
         }
    }else{
        descontarSaldoActualMayor5(valorRetiro); 
    }
  }
  function descontarSaldoActualMayor5(valorRetiro) {
    let valorRestante = 0;
    console.log("entro a descontar mayot5", valorRetiro);
    if(valorRetiro >= 5000  ){
       
        if(cantidadBilletes[0][1] > 0){
            console.log("entro aca perro11");
            console.log("entro a desconar valor restante", valorRetiro);
            let valorReAux = valorRetiro / 5000
       console.log(Math.trunc(valorReAux));
       let valorEntero = (Math.trunc(valorReAux));
       if(valorEntero > cantidadBilletes[0][1] ){
        let aux4 = valorEntero - cantidadBilletes[0][1];
        let aux5 = valorEntero -aux4;
        let aux6 = aux5*5000;
        cantidadBilletes[0][1] = cantidadBilletes[0][1]-aux5;
        console.log(aux5);
         valorRestante = valorRetiro - aux6 ;
        console.log(valorRestante );
    }else{
       console.log("dd",cantidadBilletes[0][1]);
       cantidadBilletes[0][1] = cantidadBilletes[0][1] - valorEntero;
       let aux = valorEntero*5000;
    valorRestante = valorRetiro - aux;
       console.log("valorres10",valorRestante);
       console.log("valroaux10",aux);
       console.log("dd1",cantidadBilletes[0][1]);
       console.log (cantidadBilletes);
    }
       if(valorRestante>0){
        //descontarSaldoActualMayor10(valorRestante);
      } else{
        console.log("ha retirado", valorRetiro);
      }
        }else{
            console.log ("no hay billetes de 50");
            descontarSaldoActualMayor10(valorRetiro);
         }
    }
  }
  


function consultasaldoActual() {
    
    let saltoTotalBilel5 =(cantidadBilletes[0][1]*cantidadBilletes[0][0]);
    let saltoTotalBilel10 =(cantidadBilletes[1][1]*cantidadBilletes[1][0]);
    let saltoTotalBilel20 =(cantidadBilletes[2][1]*cantidadBilletes[2][0]);
    let saltoTotalBilel50 =(cantidadBilletes[3][1]*cantidadBilletes[3][0]);
    let saltoTotalBilel100 =(cantidadBilletes[4][1]*cantidadBilletes[4][0]);

    console.log("el valor en billetes de 5000 es ",saltoTotalBilel5);
    console.log("el valor en billetes de 10000 es ",saltoTotalBilel10);
    console.log("el valor en billetes de 20000 es ",saltoTotalBilel20);
    console.log("el valor en billetes de 50000 es ",saltoTotalBilel50);
    console.log("el valor en billetes de 100000 es ",saltoTotalBilel100);
    let saldoTotal = saltoTotalBilel100 + saltoTotalBilel50 + saltoTotalBilel20 + saltoTotalBilel10 + saltoTotalBilel5;
    console.log(saldoTotal);
    console.log(cantidadBilletes);
 
    if(saldoTotal>0){
    return saldoTotal;
}else{
    console.log("cajero en mantenimiento");
}
}


function cargarBilletes5() {
    alert("funcion cargar");
    let cantBille5Ingre = prompt(` Ingrese cantidad de billetes de 5`);
    if (cantBille5Ingre >= 0) {
        let Billetes5Actuales = cantidadBilletes[0][1];
        let cantBille5IngreIn = parseInt(cantBille5Ingre);
        let Billetes5ActualesIn = parseInt(Billetes5Actuales);
        Billetes5Actuales = Billetes5ActualesIn + cantBille5IngreIn;
        cantidadBilletes[0][1] = Billetes5Actuales;
        ;

    } else {
        alert("no se puede cantidades negativas");
        cargarBilletes5();
    }
}
function cargarBilletes10() {
    let cantBille10Ingre = prompt(` Ingrese cantidad de billetes de 10`);
    if (cantBille10Ingre >= 0) {
        let Billetes10Actuales = cantidadBilletes[1][1];
        let cantBille10IngreIn = parseInt(cantBille10Ingre);
        let Billetes10ActualesIn = parseInt(Billetes10Actuales);
        Billetes10Actuales = Billetes10ActualesIn + cantBille10IngreIn;

        cantidadBilletes[1][1] = Billetes10Actuales;

    } else {
        alert("no se puede cantidades negativas");
        cargarBilletes10();
    }
}
function cargarBilletes20() {
    let cantBille20Ingre = prompt(` Ingrese cantidad de billetes de 20`);
    if (cantBille20Ingre >= 0) {
        let Billetes20Actuales = cantidadBilletes[2][1];
        let cantBille20IngreIn = parseInt(cantBille20Ingre);
        let Billetes20ActualesIn = parseInt(Billetes20Actuales);
        Billetes20Actuales = Billetes20ActualesIn + cantBille20IngreIn;

        cantidadBilletes[2][1] = Billetes20Actuales;

    } else {
        alert("no se puede cantidades negativas");
        cargarBilletes20();
    }
}

function cargarBilletes50() {
    let cantBille50Ingre = prompt(` Ingrese cantidad de billetes de 50`);
    if (cantBille50Ingre >= 0) {
        let Billetes50Actuales = cantidadBilletes[3][1];
        let cantBille50IngreIn = parseInt(cantBille50Ingre);
        let Billetes50ActualesIn = parseInt(Billetes50Actuales);
        Billetes50Actuales = Billetes50ActualesIn + cantBille50IngreIn;

        cantidadBilletes[3][1] = Billetes50Actuales;

    } else {
        alert("no se puede cantidades negativas");
        cargarBilletes50();
    }
}
function cargarBilletes100() {
    let cantBille100Ingre = prompt(` Ingrese cantidad de billetes de 100`);
    if (cantBille100Ingre >= 0) {
        let Billetes100Actuales = cantidadBilletes[4][1];
        let cantBille100IngreIn = parseInt(cantBille100Ingre);
        let Billetes100ActualesIn = parseInt(Billetes100Actuales);
        Billetes100Actuales = Billetes100ActualesIn + cantBille100IngreIn;

        cantidadBilletes[4][1] = Billetes100Actuales;

    } else {
        alert("no se puede cantidades negativas");
        cargarBilletes100();
    }
}




