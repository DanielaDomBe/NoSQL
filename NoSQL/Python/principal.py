from pymongo import MongoClient, errors
from pprint import pprint
from bson.objectid import ObjectId

# 1. Conectar a la base de datos y a la colección
try:
    client = MongoClient('mongodb://localhost:27017/') # URI de conexion a MongoDB
    db = client['ucu']  # Nombre de la base de datos a utilizar
    coleccion_usuarios = db['Usuarios']  # Nombre de la coleccion a utilizar
except errors.ConnectionFailure as e:
    print(f"Error al conectar con MongoDB: {e}")
except errors.ConfigurationError as e:
    print(f"Error de configuración en MongoDB: {e}")

# 2. Función para crear un usuario (Create)
def crear_usuario(cedula, nombre, origen):
    try:
        usuario = {
            "cedula": cedula,
            "nombre": nombre,
            "origen": origen
        }
        resultado = coleccion_usuarios.insert_one(usuario)
        print(f"----- Usuario creado con ID: {resultado.inserted_id} -----")
    except Exception as e:
        print(f"Error al crear usuario: {e}")

# 3. Función para leer todos los usuarios (Read)
def listar_usuarios():
    try:
        if coleccion_usuarios.count_documents({}) == 0:
            print("No se encontraron usuarios.")
        else:
            usuarios = coleccion_usuarios.find({})
            for usuario in usuarios:
                pprint(usuario)
    except Exception as e:
        print(f"Error al listar usuarios: {e}")

# 4. Función para actualizar un usuario por su ID (Update)
def actualizar_usuario(id_usuario, nueva_cedula=None, nuevo_nombre=None, nuevo_origen=None):
    try:
        filtro = {"_id": ObjectId(id_usuario)}
        nuevos_datos = {}

        if nueva_cedula:
            nuevos_datos["cedula"] = nueva_cedula
        if nuevo_nombre:
            nuevos_datos["nombre"] = nuevo_nombre
        if nuevo_origen:
            nuevos_datos["origen"] = nuevo_origen

        if nuevos_datos:
            resultado = coleccion_usuarios.update_one(filtro, {"$set": nuevos_datos})
            if resultado.modified_count > 0:
                print(f"----- Usuario con ID {id_usuario} actualizado. -----")
            else:
                print(f"No se encontró o no se modificó el usuario con ID {id_usuario}.")
        else:
            print("No se proporcionaron nuevos datos para actualizar.")
    except Exception as e:
        print(f"Error al actualizar usuario: {e}")

# 5. Función para eliminar un usuario por su ID (Delete)
def eliminar_usuario(id_usuario):
    try:
        filtro = {"_id": ObjectId(id_usuario)}
        resultado = coleccion_usuarios.delete_one(filtro)
        if resultado.deleted_count > 0:
            print(f"----- Usuario con ID {id_usuario} eliminado -----")
        else:
            print(f"No se encontró el usuario con ID {id_usuario}.")
    except Exception as e:
        print(f"Error al eliminar usuario: {e}")

# 6. Ejemplo de uso de las funciones CRUD
if __name__ == "__main__":
    try:

        print("---------- Listado Inicial de Usuarios ------------")
        listar_usuarios()
        print("*******************************************")
    
        # Crear un usuario
        print("---------- Creando un usuario ------------")
        crear_usuario(888, "Juan Pérez", "COL")
        print("*******************************************")
        
        # Leer todos los usuarios
        print("---------- Listado de usuarios ------------")
        listar_usuarios()
        print("*******************************************")
        
        # Actualizar un usuario (Reemplaza `id_usuario` con un ID válido)
        # Supongamos que queremos actualizar el nombre de un usuario con un cierto ID
        print("---------- Actualizando un usuario ------------")
        id_usuario = coleccion_usuarios.find_one({"nombre": "Juan Pérez"})["_id"]
        actualizar_usuario(id_usuario, nuevo_nombre="Juan Pérez Actualizado", nuevo_origen="USA")
        
        # Leer todos los usuarios nuevamente
        print("---------- Listado de usuarios actualizada (update) ------------")
        listar_usuarios()
        print("*******************************************")
        
        # Eliminar un usuario (Reemplaza `id_usuario` con un ID válido)
        print("---------- Eliminando un usuario ------------")
        id_usuario = coleccion_usuarios.find_one({"origen": "UYU"})["_id"]
        eliminar_usuario(id_usuario)
        
        # Leer todos los usuarios nuevamente
        print("---------- Listado de usuarios actualizada (delete) ------------")
        listar_usuarios()
        print("*******************************************")
    
    except Exception as e:
        print(f"Ocurrió un error en la operación principal: {e}")
