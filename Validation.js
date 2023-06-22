function Validation(){
    this.KiemTraTrong = function(value){
        if(value === "" || value.trim === ""){
            return true;
        }
        return false;
    }

    // this.KiemTraEmail = function (value){
    //     var re =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //     return re.test(email.trim());

    // }
    this.KiemTraEmail = function (email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    this.KiemTraSDT = function(value){
        var re = /^\d+$/;
        
        if (re.test(value) && value.length >= 10){
            return true;
        }
        return false;

    }

}