
const entradaBusqueda = document.getElementById ("entradaBusqueda");
const btnBuscar = document.getElementById ("btn-buscar");
const listaCiudades = document.getElementById("listaCiudades");
const nombreCiudad = document.getElementById ("nombreCiudad");
const descripcionCiudad = document.getElementById ("descripcionCiudad");
const iconoDescripcion = document.getElementById("iconoDescripcion");
let icono
let iconitoJS
const coordenadas = document.getElementById("coordenadasCiudad");

const banner = document.getElementById(".banner")
const mapa = document.getElementById("mapa");
const datosHumedad = document.getElementById("datosHumedad");
const datosPresion = document.getElementById("datosPresion");
const datosTemperatura = document.getElementById("datosTemperatura");
const datosTemperaturaMaxima = document.getElementById("datosTemperaturaMaxima");
const datosViento = document.getElementById("datosViento");
const datosTemperaturaMinima = document.getElementById("datosTemperaturaMinima");












fetch('./ciudadesArg.list.json')    //Lee la lista JSON de ciudades Argentinas.
.then ((Response) => Response.json())
   .then((list)   => {
       
       for(elemento in list){
         const option = document.createElement("option");
           let agregar = list[elemento].name;
           option.innerHTML = agregar;
           listaCiudades.appendChild(option);
           
           
       }
       
    });


 btnBuscar.addEventListener('click', (e) =>{
        
        e.preventDefault()
        if (entradaBusqueda.value!=undefined){
            const bienvenida = document.getElementById("bienvenida").style.display="none";
            const main = document.getElementById("main").style.display="block";
        }
        
        fetch('./ciudadesArg.list.json')    //Lee la lista JSON de ciudades Argentinas.
        .then ((Response) => Response.json())
           .then((list)   => {
               
               for(elemento in list){
                   if (list[elemento].name==entradaBusqueda.value){
                    
                     const API_URL = `https://api.openweathermap.org/data/2.5/weather?id=${list[elemento].id}&appid=f2b7eaeb3f0c3e8f71321a39ef18fc84`
    
                    fetch(`${API_URL}`)
                    .then ((Response) => Response.json())
                        .then((weather)   => {
                         icono = (weather.weather[0].id);
                        iconitoJS = (weather.weather[0].icon);
                       
                        
                        nombreCiudad.textContent =`${entradaBusqueda.value}`
                        descripcionCiudad.textContent = `${descripcion()}`
                        
                        iconoDescripcion.innerHTML =`<img src="https://openweathermap.org/img/wn/${iconitoJS}@2x.png">`
                        coordenadas.textContent = ` Longitud: ${weather.coord.lon} Latitud: ${weather.coord.lat}`
                        
                        
                        mapa.innerHTML = `<img src="https://stadiamaps.com/static/alidade_smooth?api_key=aceff0b5-97e1-42f9-9ff7-42656870225b&center=${weather.coord.lat},${weather.coord.lon}&zoom=7&markers=${weather.coord.lat},${weather.coord.lon}|${weather.coord.lat},${weather.coord.lon}&size=600x400@2x">`
                        datosHumedad.innerHTML =`<i class="bi bi-moisture"></i> Humedad: ${weather.main.humidity}%`

                         datosPresion.innerHTML = `<i class="bi bi-chevron-double-down"></i> Presión: ${weather.main.pressure} hPa`
                         datosTemperatura.innerHTML = `<i class="bi bi-thermometer-high"></i> Temperatura: ${Math.round(weather.main.temp-273.15)}ºC `
                         
                         datosViento.innerHTML = `<i class="bi bi-wind"></i> Viento: ${Math.round(weather.wind.speed)*3.6} kms/h `
                         
                        });  
                    }
                }
            });
        });



    
descripcion = () =>{                //define segun el ID del icono que banner y descripcion mostrar.
            
           if(icono<=531){
                if(iconitoJS.charAt(iconitoJS.length-1)=="n"){   
                    const cieloNocturno = document.getElementById("cieloNocturno").style.display="block"; 
                    return "Es una noche lluviosa"  
                }else{
                    const cieloDespejado = document.getElementById("cieloDespejado").style.display="none";
                    const cieloNublado = document.getElementById("cieloNublado").style.display="none";
                    const cieloNevando = document.getElementById("cieloNevando").style.display="none";
                    const cieloLluvioso = document.getElementById("cieloLluvioso").style.display="block";
                    return "Está lloviendo"
                }



            }
            else if(icono>=600 && icono<=622){
                if(iconitoJS.charAt(iconitoJS.length-1)=="n"){   
                    const cieloNocturno = document.getElementById("cieloNocturno").style.display="block"; 
                    return "Esta noche esta nevando"  
                }else{
                    const cieloDespejado = document.getElementById("cieloDespejado").style.display="none";
                    const cieloNublado = document.getElementById("cieloNublado").style.display="none";
                    const cieloNevando = document.getElementById("cieloNevando").style.display="block";
                    const cieloLluvioso = document.getElementById("cieloLluvioso").style.display="none";
                return "Está nevando"
                }
            }
            else if(icono>=701 && icono<=781){
                if(iconitoJS.charAt(iconitoJS.length-1)=="n"){   
                    const cieloNocturno = document.getElementById("cieloNocturno").style.display="block"; 
                    return "Esta noche hay polvo o niebla en el aire"  
                }else{
                    const cieloDespejado = document.getElementById("cieloDespejado").style.display="none";
                    const cieloNublado = document.getElementById("cieloNublado").style.display="block";
                    const cieloNevando = document.getElementById("cieloNevando").style.display="none";
                    const cieloLluvioso = document.getElementById("cieloLluvioso").style.display="none";
                return "Hay polvo o niebla en el aire"
                }
            }
            else if(icono==800){
                if(iconitoJS.charAt(iconitoJS.length-1)=="n"){   
                    const cieloNocturno = document.getElementById("cieloNocturno").style.display="block"; 
                    return "La noche está despejada"  
                }else{
                    const cieloDespejado = document.getElementById("cieloDespejado").style.display="block";
                    const cieloNublado = document.getElementById("cieloNublado").style.display="none";
                    const cieloNevando = document.getElementById("cieloNevando").style.display="none";
                    const cieloLluvioso = document.getElementById("cieloLluvioso").style.display="none";
                    return "Tiempo despejado"
                }
            }
            else if(icono>=801 && icono<=804){
                if(iconitoJS.charAt(iconitoJS.length-1)=="n"){   
                    const cieloNocturno = document.getElementById("cieloNocturno").style.display="block"; 
                    return "La noche está nublada"  
                }else{
                    
                    const cieloDespejado = document.getElementById("cieloDespejado").style.display="none";
                    const cieloNublado = document.getElementById("cieloNublado").style.display="block";
                    const cieloNevando = document.getElementById("cieloNevando").style.display="none";
                    const cieloLluvioso = document.getElementById("cieloLluvioso").style.display="none";
                    return "Está nublado"
                }
            }
            
        };


