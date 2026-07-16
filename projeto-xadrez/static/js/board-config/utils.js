export function toast(texto){

    Swal.fire({

        toast:true,

        position:"top-end",

        timer:2000,

        showConfirmButton:false,

        icon:"success",

        title:texto

    });

}