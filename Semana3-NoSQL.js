db.createCollection("Usuarios");

db.Usuarios.insertOne(
{cedula:111,nombre:"Jorge Martinez", edad:25});

use ucu

db.Usuarios.insertMany([
{"cedula": 1001, "nombre":"Jorge Martinez", "origen":'UYU'},
{"cedula": 1002, "nombre":"John Wick", "origen":'BRA'},
{"cedula": 1003, "nombre":"Elon Musk", "origen":'ARG'},
{"cedula": 1004, "nombre":"Katerin Johnson", "origen":'UYU'},
{"cedula": 1005, "nombre":"Britney Spears", "origen":'ARG'},
{"cedula": 1006, "nombre":"Lenny Kravitz", "origen":'UYU'},
{"cedula": 1007, "nombre":"Miley Cirus", "origen":'BRA'},
{"cedula": 1008, "nombre":"Bon Jovi", "origen":'ARG'},
{"cedula": 1009, "nombre":"Blondie", "origen":'UYU'},
{"cedula": 1010, "nombre":"Britney Spears", "origen":'ARG'},
{"cedula": 1011, "nombre":"Emiliano Brancciari", "origen":'UYU'},
{"cedula": 1012, "nombre":"Julieta Rada", "origen":'BRA'},
{"cedula": 1013, "nombre":"Ruben Rada", "origen":'ARG'},
{"cedula": 1014, "nombre":"Tabare Cardozo", "origen":'UYU'},
{"cedula": 1015, "nombre":"Laura Canoura", "origen":'ARG'},
{"cedula": 1016, "nombre":"Catherine Vergnes", "origen":'UYU'},
{"cedula": 1017, "nombre":"Ricky Martin", "origen":'ARG'},
{"cedula": 1018, "nombre":"Jennifer Lopez", "origen":'ARG'},
{"cedula": 1019, "nombre":"Ricardo Arjona", "origen":'BRA'},
{"cedula": 1020, "nombre":"Julieta Venegas", "origen":'BRA'}
]);

db.getCollection("Usuarios").find({});





//Demo 2 ----------------------

db.Usuarios.find({ $where: "this.nombre.startsWith('J')" });

db.Usuarios.find({ $where: "this.nombre.startsWith('K') && this.nombre.endsWith('n')" });

db.Usuarios.find( { $where: "this.cedula.includes('222')" });



//Demo 3 ----------------------

//Agregar:
db.Usuarios.updateMany(
{ },
{ $set: { fecha_nacimiento: new Date() } }
);

db.Usuarios.updateMany(
{ $where: "this.nombre.startsWith('J')" },
{ $set: { cedula: 999 } }
);

//Eliminar:
db.Usuarios.updateMany({}, 
{ $unset: { "fecha_nacimiento":"" } });

//Agregar campo origen:
db.Usuarios.updateMany(
{ },
{ $set: { origen: "" } }
);

db.Usuarios.updateOne( 
{}, 
{ $set : { origen : 'UYU' } } 
);

db.Usuarios.updateMany( 
{} , 
{ $set : { origen : 'ARG' } } 
);

db.Usuarios.updateOne( 
{ $where: "this.origen.includes('ARG')" } , 
{ $set : { origen : 'BRA' } } 
);

db.Usuarios.updateMany( 
{ $where: "this.origen.includes('ARG')" } , 
{ $set : { origen : 'PRY' } } 
);


//Demo 4 ----------------------

db.Usuarios.drop();

db.Usuarios.deleteOne(
{ $where: "this.origen.includes('BRA')"}
);

db.Usuarios.deleteMany(
{}
);


db.Usuarios.updateMany(
{},
{ $set: { fecha_nacimiento: ISODate('2024-07-18T12:00:00.000Z') } }
);
