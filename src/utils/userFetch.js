"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const api_1 = __importDefault(require("./api"));
//hook para hacer consultas
//Devuelve una terna: {data, status, error}
//Los datos que devuelve son estados de React. Cualquier cambio en sus valores produce un re-render de los componentes que los utilicen
function useFetch(url) {
    //Definimos los tres estados que vamos a seguir. El hook solo retorna el valor del estado; Esto significa que es el propio hook el unico que puede cambiar el valor del estado
    const [data, setData] = (0, react_1.useState)(); //datos
    const [error, setError] = (0, react_1.useState)(null); //estado
    const [status, setStatus] = (0, react_1.useState)("idle"); //error
    //Usamos un useEffect. De esta forma la recuperación de datos se inicia una vez se ha hecho el renderizado de componentes. Con suspense mejoraremos las opciones, y tendremos la posibilidad de recuperar datos al mismo tiempo que se hace el renderizado
    (0, react_1.useEffect)(() => {
        let doUpdate = true; //En caso de que el componente se destruya, nos permite abortar cualquier cambio de estado que fuera necesario hacer cuando una Promise se resuelva
        //Estados iniciales
        setStatus("loading");
        setData(undefined);
        setError(null);
        //Este método devuelve una Promise que se resuelve con la respuesta de la api - con el json
        (0, api_1.default)(url)
            .then(data => {
            if (doUpdate) { //Actualizamos los estados para indicar que ya tenemos los datos
                setData(data);
                setStatus("success");
            }
        })
            .catch(error => {
            if (doUpdate) {
                setError(error);
                setStatus("error");
            }
        });
        return () => doUpdate = false;
    }, [url]);
    return { data, status, error };
}
exports.default = useFetch;
