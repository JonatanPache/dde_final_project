const inputFile = document.getElementById("inpFile");
var existeImagen = false;
var imgContent;

inputFile.addEventListener("change", function () {
    const files = this.files;
    if (files.length > 0) {
        var type = files[0].type;
        if (type != "image/png" && type != "image/jpeg") {
            alert("Seleccione solo imagenes PNG o JPEG");
            return;
        }
        var imgTag = document.getElementById("uploadedImg");

        const fileReader = new FileReader();
        fileReader.addEventListener("load", function () {
            var originalBase64 = this.result;
            imgTag.setAttribute("src", originalBase64);
            imgTag.style.display = "block"; 
        });
        fileReader.readAsDataURL(files[0]);
        existeImagen = true;
    }
});

//GET BASE64 IMG
async function optimizarB64() {
    if (!existeImagen) {
        alert("Seleccione una imagen...");
        return;
    }
    const file = document.getElementById("inpFile").files[0];
    const reader = new FileReader();
    var imgTag = document.getElementById("uploadedImg");
    reader.readAsDataURL(file);
    reader.addEventListener("load", function () {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 400;
        const scaleSize = MAX_WIDTH / imgTag.width;
        canvas.width = MAX_WIDTH;
        canvas.height = imgTag.height * scaleSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(imgTag, 0, 0, canvas.width, canvas.height);
        imgContent = ctx.canvas.toDataURL("image/jpeg", 0.4);
        document.getElementById("upImgBtn").style.display = "block";
        //console.log("new b64:" + imgContent.length);
        //document.getElementById("modifiedImg").setAttribute("src", imgContent);
    });
}


//UPLOAD IMG METHOD
async function uploadImg() {
    if (existeImagen === false) {
        alert("Seleccione una imagen primero");
        return;
    }
    var usuemail = document.getElementById("usu_email").textContent;
    //console.log(usuemail)
    var data = {
        img_content: imgContent,
        usu_email: usuemail
    };
    //const url = "http://127.0.0.1:3004/uploadImg";
    const url = "http://48.216.243.186:3004/uploadImg";
    var response;
    try {
        response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json());
    } catch (err) {
        alert(err.message);
        return;
    }
    if (response.ok == true) {
        alert("Imagen guardada");
        window.location.href = "/profile"; 
    } else {
        alert(response.msg);
    }
    return;
    /*const fileInput = document.getElementById("inpFile");
    const files = fileInput.files;

    if (files.length === 0) {
        alert("Seleccione una imagen primero");
        return;
    }

    const formData = new FormData();
    formData.append("imagen", files[0]);

    const response = await fetch("/upload", {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    if (result.ok) {
        alert("Imagen subida con éxito");
        window.location.href = "/profile";
    } else {
        alert("Error al subir: " + result.msg);
    }
}

async function uploadImg2(){
    const fileInput = document.getElementById("inpFile");
    const files = fileInput.files;

    if (files.length === 0) {
        alert("Seleccione una imagen primero");
        return;
    }

    const formData = new FormData();
    formData.append("imagen", files[0]);

    const response = await fetch("/upload", {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    if (result.ok) {
        alert("Imagen subida con éxito");
        window.location.href = "/profile";
    } else {
        alert("Error al subir: " + result.msg);
    }*/
}
