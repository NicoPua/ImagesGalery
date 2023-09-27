const validationNewPhoto = ({description, location, categories} : FormDataInterface) => {
    const regexWithoutNumbers : RegExp = /^[^0-9]*$/;
    const regexOnlyLetters : RegExp = /^[a-zA-Z,.\s]+$/;

    const error = {
        categories: "",
        description: "",  
        location: "",
        flag: false
    }
    
    if(description.length === 0){
        error.flag = true;
        error.description = "- La descripción es requerida.";
    }else if(!regexWithoutNumbers.test(description)){
        error.flag = true;
        error.description = "- La descripción no debe contener números.";
    }else if(description.length < 5 || description.length > 300){
        error.flag = true;
        error.description = "- La descripción debe contener entre 5 a 300 caracteres.";
    }


    if(location.length === 0){
        error.flag = true;
        error.location = "- La location es requerida.";
    }else if(!regexOnlyLetters.test(location)){
        error.flag = true;
        error.location = "- La location debe contener sólo texto.";
    }else if(location.length <= 2 || location.length >= 50){
        error.flag = true;
        error.location = "- La location debe contener entre 2 a 50 caracteres.";
    }

    if(categories.length === 0){
        error.categories = "- Debe estar seleccionada al menos UNA categoría.";
        error.flag = true;
    }
    
    return error;
}

export default validationNewPhoto;

interface FormDataInterface{
    user: string,
    description: string,  
    location: string, 
    image: string,
    rating: number, 
    likes: number,
    categories: string, 
    reviews: string     //CAMBIAR EN UN FUTURO
}

