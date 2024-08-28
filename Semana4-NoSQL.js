//Semana 4 - Demo 1 **********************
use ucu

db.Usuarios.deleteMany(
{}
);

db.getCollection("Usuarios").find({});

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

db.Usuarios.updateMany(
{},
{ $set: { edad: 0, sueldo: 0 } }
);

db.Usuarios.updateMany(
{},
{ $set: { "departamento": "" } }
);

db.Usuarios.updateMany(
{ $where: "this.origen.includes('UYU')" },
{ $set: { edad: 25, sueldo: 15000 } }
);

db.Usuarios.updateMany(
{ $where: "this.origen.includes('UYU')" },
{ $set: { departamento : "Montevideo" } }
);

db.Usuarios.updateMany(
{ $where: "this.origen.includes('ARG')" },
{ $set: { edad: 35, sueldo: 10000 } }
);

db.Usuarios.updateMany(
{ $where: "this.origen.includes('BRA')" },
{ $set: { edad: 75, sueldo: 35000 } }
);

db.Usuarios.aggregate([
    { $match: { "origen": "UYU" } },
    { $group: { _id: "$edad", promedioEdad: { $avg: "$edad" } } },
    { $sort: { "_id": 1 } },
    { $out: "resultados" }
])

db.Usuarios.aggregate([
    { $match: { "origen": "UYU" } },
    { $group: { _id: "$departamento", promedioEdad: { $avg: "$edad" } } },
    { $sort: { "promedioEdad": 1 } },
    { $out: "resultados" }
])

// Mostrar el contenido de la nueva colección
db.resultados.find().pretty()

db.Usuarios.aggregate([
    {$match: {} },
    { $group: { _id: "$origen", promedioEdad: { $avg: "$edad" } } },
    { $sort: { "_id": -1 } },
    { $out: "resultados" }
])

// Mostrar el contenido de la nueva colección
db.resultados.find().pretty()

db.Usuarios.aggregate([
    {$match: {} },
    { $group: { _id: "$origen", promedioSueldo: { $avg: "$sueldo" } } },
    { $sort: { "promedioSueldo": -1 } },
    { $out: "resultados" }
])

// Mostrar el contenido de la nueva colección
db.resultados.find().pretty()

//Semana 4 - Demo 2 **********************

db.estudiantes.deleteMany(
{}
);

db.getCollection("estudiantes").find({});

db.createCollection("estudiantes", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["documento", "nombre", "email", "generacion"],
         properties: {
            "documento": {
               bsonType: "string",
               description: "Debe ser una cadena de texto y es obligatorio"
            },
            "nombre": {
               bsonType: "string",
               description: "Debe ser una cadena de texto y es obligatorio"
            },
            "email": {
               bsonType: "string",
               pattern: "^.+@.+$",
               description: "Debe ser un email válido y es obligatorio"
            },
            "generacion": {
               bsonType: "int",
               minimum: 2020,
               maximum: 2024,
               description: "Debe ser un número entre 2020 y 2024, y es obligatorio"
            },
            "edad": {
               bsonType: "int",
               minimum: 18,
               maximum: 120,
               description: "Debe ser un número entre 18 y 120, y es opcional"
            },
            "direcciones": {
               bsonType: "array",
               items: {
                  bsonType: "object",
                  required: ["calle", "ciudad", "pais"],
                  properties: {
                     "calle": {
                        bsonType: "string",
                        description: "Debe ser una cadena de texto y es obligatorio"
                     },
                     "ciudad": {
                        bsonType: "string",
                        description: "Debe ser una cadena de texto y es obligatorio"
                     },
                     "pais": {
                        bsonType: "string",
                        description: "Debe ser una cadena de texto y es obligatorio"
                     }
                  }
               }
            }
         }
      }
   },
   validationLevel: "strict",
   validationAction: "error"
});

db.estudiantes.insertOne(
{"documento": "UY1001", "nombre":"Jorge Martinez", "email": "email@email.com", "generacion": 2021, "edad": 19, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]}
);

//Sin errores
db.estudiantes.insertMany([
{"documento": "UY1002", "nombre":"Jorge Martinez", "email": "email@email.com", "generacion": 2021, "edad": 19, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]},
{"documento": "UY1003", "nombre":"John Wick", "email": "email@email.com", "generacion": 2020, "edad": 21, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]},
{"documento": "UY1004", "nombre":"Elon Musk", "email": "email@email.com", "generacion": 2022, "edad": 25, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"} ]},
{"documento": "UY1005", "nombre":"Katerin Johnson", "email": "email@email.com", "generacion": 2023, "edad": 42, "direcciones":[ { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]},
{"documento": "UY1006", "nombre":"Britney Spears", "email": "email@email.com", "generacion": 2021, "edad": 28, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]},
{"documento": "UY1007", "nombre":"Lenny Kravitz", "email": "email@email.com", "generacion": 2020, "edad": 35, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]},
{"documento": "UY1008", "nombre":"Miley Cirus", "email": "email@email.com", "generacion": 2020, "edad": 19, "direcciones":[ { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]},
{"documento": "UY1009", "nombre":"Emiliano Brancciari", "email": "email@email.com", "generacion": 2023, "edad": 27, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]},
{"documento": "UY1010", "nombre":"Julieta Rada", "email": "email@email.com", "generacion": 2022, "edad": 51, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]},
{"documento": "UY1011", "nombre":"Laura Canoura", "email": "email@email.com", "generacion": 2020, "edad": 22, "direcciones":[ { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]}
]);

//Con errores
db.estudiantes.insertMany([
{"documento": "UY5002", "nombre":"Jorge Martinez", "email": "email@email.com", "generacion": 2021, "edad": 19, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]},
{"nombre":"John Wick", "email": "email@email.com", "generacion": 2020, "edad": 21, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]},
{"documento": "UY5004", "email": "email@email.com", "generacion": 2022, "edad": 25, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"} ]},
{"documento": "UY5005", "nombre":"Katerin Johnson", "email": "emailemail.com", "generacion": 2023, "edad": 42, "direcciones":[ { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]},
{"documento": "UY5006", "nombre":"Britney Spears", "email": "email@email.com", "generacion": 1990, "edad": 28, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]},
{"documento": "UY5007", "nombre":"Lenny Kravitz", "email": "email@email.com", "generacion": 2020, "edad": 15, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]},
{"documento": "UY5008", "nombre":"Miley Cirus", "email": "email@email.com", "generacion": 2020, "edad": 19, "direcciones":[ { "ciudad":"Concordia", pais:"ARG" } ]},
{"documento": "UY5009", "nombre":"Emiliano Brancciari", "email": "email@email.com", "generacion": 2023, "edad": 27, "direcciones":[ {"calle":"uno 111", "pais":"UYU"}, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]},
{"documento": "UY5010", "nombre":"Julieta Rada", "email": "email@email.com", "generacion": 2022, "edad": 51, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu" }, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]},
{"documento": "UY5011", "nombre":"Laura Canoura", "email": "email@email.com", "generacion": 2020, "edad": 22, "direcciones":[ { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]}
]);

//Con errores individuales
db.estudiantes.insertOne(
{"documento": "UY7001", "nombre":"Jorge Martinez", "email": "email@email.com", "generacion": 2021, "edad": 19, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]}
);
db.estudiantes.insertOne(
{"nombre":"Jorge Martinez", "email": "email@email.com", "generacion": 2021, "edad": 19, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]}
);
db.estudiantes.insertOne(
{"documento": "UY1001", "email": "email@email.com", "generacion": 2021, "edad": 19, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]}
);
db.estudiantes.insertOne(
{"documento": "UY1001", "nombre":"Jorge Martinez", "email": "emailemail.com", "generacion": 2021, "edad": 19, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]}
);
db.estudiantes.insertOne(
{"documento": "UY1001", "nombre":"Jorge Martinez", "email": "email@email.com", "generacion": 1990, "edad": 19, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]}
);
db.estudiantes.insertOne(
{"documento": "UY1001", "nombre":"Jorge Martinez", "email": "email@email.com", "generacion": 2021, "edad": 12, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]}
);
db.estudiantes.insertOne(
{"documento": "UY1001", "nombre":"Jorge Martinez", "email": "email@email.com", "generacion": 2021, "edad": 19, "direcciones":[ {"ciudad":"Paysandu", "pais":"UYU"}, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]}
);
db.estudiantes.insertOne(
{"documento": "UY1001", "nombre":"Jorge Martinez", "email": "email@email.com", "generacion": 2021, "edad": 19, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"dos 222", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia", pais:"ARG" } ]}
);
db.estudiantes.insertOne(
{"documento": "UY1001", "nombre":"Jorge Martinez", "email": "email@email.com", "generacion": 2021, "edad": 19, "direcciones":[ {"calle":"uno 111", "ciudad":"Paysandu", "pais":"UYU"}, { "calle":"dos 222", "ciudad":"Durazno", "pais":"UYU" }, { "calle":"tres 333", "ciudad":"Concordia" } ]}
);