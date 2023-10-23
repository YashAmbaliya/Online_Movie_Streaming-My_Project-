export default function localstorage() {

    if(localStorage.getItem("user") != null){
        return JSON.parse(localStorage.getItem("user"));
    }else{
        return null;
    }
  
}
