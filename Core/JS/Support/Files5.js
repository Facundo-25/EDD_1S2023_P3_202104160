class NodoC {
    constructor(valor,accion,fecha,hora) {
      this.valor = valor;
      this.accion = accion;
      this.fecha = fecha;
      this.hora = hora;
      this.siguiente = null;
    }
  }
  
  class ListaCircular {
    constructor() {
      this.primero = null;
      this.ultimo = null;
    }
  
    agregar(valor,accion,fecha,hora) {
      const nuevoNodo = new NodoC(valor,accion,fecha,hora);
  
      if (!this.primero) {
        this.primero = nuevoNodo;
        this.ultimo = nuevoNodo;
        nuevoNodo.siguiente = this.primero;
      } else {
        this.ultimo.siguiente = nuevoNodo;
        nuevoNodo.siguiente = this.primero;
        this.ultimo = nuevoNodo;
      }
    }
  
    eliminar(valor) {
      if (!this.primero) {
        return;
      }
  
      let nodoActual = this.primero;
      let nodoAnterior = null;
  
      while (nodoActual.valor !== valor) {
        if (nodoActual.siguiente === this.primero) {
          return;
        }
  
        nodoAnterior = nodoActual;
        nodoActual = nodoActual.siguiente;
      }
  
      if (nodoActual === this.primero && nodoActual === this.ultimo) {
        this.primero = null;
        this.ultimo = null;
      } else if (nodoActual === this.primero) {
        this.primero = nodoActual.siguiente;
        this.ultimo.siguiente = this.primero;
      } else if (nodoActual === this.ultimo) {
        this.ultimo = nodoAnterior;
        this.ultimo.siguiente = this.primero;
      } else {
        nodoAnterior.siguiente = nodoActual.siguiente;
      }
    }
  
    imprimir() {
      if (!this.primero) {
        console.log("La lista está vacía.");
        return;
      }
  
      let nodoActual = this.primero;
  
      do {
        console.log(nodoActual.accion);
        nodoActual = nodoActual.siguiente;
      } while (nodoActual !== this.primero);
    }



    
    

    generarDOT() {
      let dot = "digraph ListaCircular {\n";
      dot += "  rankdir=\"LR\";\n"; // Dirección del flujo del grafo (de izquierda a derecha)
      
      dot += " label=\"Lista Enlazada Circular\";  \n  labelloc=top;   \n  labeljust=center; \n labelbgcolor=white;  \n   fontsize=18; \n bgcolor=\"#3d3f3d\"; \n node[style=filled, color=\"#50AC7F\", fontname=\"Times New Roman\", fontsize=12]; \n \n  edge[color=\"#FCE308\"]; \n"; // Forma de los nodos (círculos)

      let nodoActual = this.primero;
      do {
        dot += `${nodoActual.valor}[label="${nodoActual.accion} \n  ${nodoActual.fecha} \n ${nodoActual.hora}"]\n`;
        nodoActual = nodoActual.siguiente;
      } while (nodoActual !== this.primero);



      
      nodoActual = this.primero;
      do {
        dot += `  ${nodoActual.valor} -> ${nodoActual.siguiente.valor};\n`;
        nodoActual = nodoActual.siguiente;
      } while (nodoActual !== this.primero);
  
      dot += `  ${this.ultimo.valor} -> ${this.primero.valor};\n`; // Agregar arista del último nodo al primer nodo para cerrar el ciclo
      dot += "}\n";
  
      return dot;
    }

  }
  