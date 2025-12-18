const {fetchKunna}=require("../services/kunnaService");
const Acquire=require("../models/acquire")
function health(req,res){
    res.json({
    status: "ok",
    service: "acquire"
  });
}


async function data(req,res){
  try{
    let target_date = new Date();
    const hora = target_date.getHours();
    const hoy=target_date.toISOString();
    

    
    
    if (hora >= 23) {
      target_date.setDate(target_date.getDate()+1);
      
    }
    
    let fechaInicio = new Date(target_date);
    let fechaFinal = new Date(target_date);

    fechaInicio.setDate(fechaInicio.getDate()-4);
    fechaFinal.setDate(fechaFinal.getDate()-1);
    
    target_date_datos=target_date.toISOString();
    fechaFinal=fechaFinal.toISOString();
    fechaInicio=fechaInicio.toISOString();
    console.log(target_date);
    console.log(fechaInicio);
    console.log(fechaFinal);
    data= await fetchKunna(fechaInicio,fechaFinal)
    
    const numeros = data.values.map(fila => fila[2]);

    console.log(numeros); 

    const datosAGuardar={
      time_start: fechaInicio,
      time_end: fechaFinal,
      target_date:target_date_datos,
      consumos:numeros
    }
    let nuevo_acquire=new Acquire(datosAGuardar);
    console.log('Guardar acquire en base datos')
    const acquireStored=await nuevo_acquire.save();

    let features=[numeros[0],numeros[1],numeros[2],target_date.getHours(),target_date.getDay(),target_date.getMonth(),target_date.getDate()];
    res.status(201).json({
      dataId:acquireStored._id,
      features,
      featureCount:7,
      scalerVersion:"v1",
      createdAt:hoy
    }); 
  } catch (err) {
    console.error("Error en /acquire:", err);
    res.status(500).json({ error: "Internal error" });
  }
}




module.exports = {
  health,
  data
};