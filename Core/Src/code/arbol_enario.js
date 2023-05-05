// CLASE NODO 
class Tnode{
    
    constructor(folderName){
        this.folderName = folderName;
        this.files = [];
        this.children = []; // TODOS LOS NODOS HIJOS
        this.id = null; // PARA GENERAR LA GRÁFICA
        this.type = "-";
    }
}


class Tree_Enario{
    constructor(){
        this.root = new Tnode('/');
        this.root.id = 0;
        this.size = 1; // Para generar los ids
    }

    insert(folderName, fatherPath){ 
        let newNode =  new Tnode(folderName);
        let fatherNode = this.getFolder(fatherPath);
        if(fatherNode){
            this.size += 1;
            newNode.id = this.size;
            fatherNode.children.push(newNode);
        }else{
            console.log("Ruta no existe");
        }
    }
    
    insert2(folderName, fatherPath, type){ 
        let newNode =  new Tnode(folderName);
        newNode.type = type;
        let fatherNode = this.getFolder(fatherPath);
        if(fatherNode){
            this.size += 1;
            newNode.id = this.size;
            fatherNode.children.push(newNode);
        }else{
            console.log("Ruta no existe");
        }
    }


    getFolder(path){
        // Padre sea una '/'
        // console.log(path);
        if(path == this.root.folderName){
            return this.root;
        }else{
            let temp = this.root;
            let folders = path.split('/');
            folders = folders.filter( str => str !== '');
            let folder = null;
            while(folders.length > 0){
                let currentFolder = folders.shift()
                folder = temp.children.find(child => child.folderName == currentFolder);
                if(typeof folder == 'undefined' || folder == null){
                    return null;
                }
                temp = folder;
            }
            return temp;
        }
    }

    graph(){
        let nodes = "";
        let connections = "";

        let node = this.root;
        let queue = [];
        queue.push(node);
        while(queue.length !== 0){
            let len = queue.length;
            for(let i = 0; i < len; i ++){
                let node = queue.shift();
                nodes += `S_${node.id}[label="${node.folderName}"];\n`;
                node.children.forEach( item => {
                    connections += `S_${node.id} -> S_${item.id};\n`
                    queue.push(item);
                });
            }
        }
        return 'node[shape="record"];\n' + nodes +'\n'+ connections;
    }

    
    
    
    getHTML(path){
        let node = this.getFolder(path);
        let code = "";
        node.children.map(child => {
            Insertar_Carpeta_Div(child.folderName);
            
        })
        // console.log(node.files)
        node.files.map(file => {
            if(file.type === 'text/plain'){
                let archivo = new Blob([file.content], file.type);
                const url = URL.createObjectURL(archivo);

                Insertar_Carpeta_Div(file.name);
   
            }else{

                Insertar_Carpeta_Div(file.name);
                
            }
        })
        return code;
    }


    Delete_Node(path,folder_delete){
        let node = this.getFolder(path);
        let status = false;


        node.children.map(child => {
            if(child.folderName == folder_delete){
                status = true;
            }
        })

        if(status){
            let index = node.children.findIndex(carpeta => carpeta.folderName === folder_delete);
            node.children.splice(index,1);
            console.log("Se elimino una carpeta");
        }

    }
    
    
    


    // insertFile(path, fileName, content, type){
    //     let temp = this.getFolder(path);
    //     temp.matriz.insertHeaderOnly(fileName, content, type);
    // }    

    // matrixGrpah(path){
    //     let temp = this.getFolder(path);
    //     console.log(temp.matriz);
    //     return temp.matriz.graph();
    // }

}

