import com.mongodb.MongoClientSettings;
import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;
import java.util.Arrays;
import java.util.logging.Level;
import java.util.logging.Logger;



public class Principal {

        // Variables globales para la conexión y la colección
        private static MongoClient mongoClient;
        private static MongoDatabase database;
        private static MongoCollection<Document> coleccionUsuarios;
    
        public static void main(String[] args) {
            try {
                // Configurar la conexión a MongoDB
                mongoClient = MongoClients.create("mongodb://localhost:27017");
                database = mongoClient.getDatabase("ucu"); // Reemplaza con el nombre de tu base de datos
                coleccionUsuarios = database.getCollection("Usuarios"); // Reemplaza con el nombre de tu colección
    
                System.out.println("--------------- Listado Inicial de Usuarios ----------------");
                listarUsuarios();
                System.out.println("***********************************************");


                // Operaciones CRUD
                System.out.println("--------------- Crear un usuario ----------------");
                crearUsuario(8888, "Juan Pérez", "USA");
                listarUsuarios();
                System.out.println("***********************************************");
    
                // Obtener el ID del usuario recién creado para actualizarlo
                ObjectId idUsuario = coleccionUsuarios.find(new Document("nombre", "Juan Pérez"))
                                                      .first()
                                                      .getObjectId("_id");
                System.out.println("--------------- Actualizar un usuario ----------------");
                actualizarUsuario(idUsuario, 0, "Juan Pérez Actualizado", null);
                listarUsuarios();
                System.out.println("***********************************************");
    
                System.out.println("--------------- Eliminar un usuario ----------------");
                ObjectId idUsuarioDel = coleccionUsuarios.find(new Document("nombre", "Elon Musk"))
                                                      .first()
                                                      .getObjectId("_id");
                eliminarUsuario(idUsuarioDel);
                listarUsuarios();
                System.out.println("***********************************************");
    
            } catch (MongoException e) {
                System.err.println("Error en la operación con MongoDB: " + e);
            } finally {
                // Cerrar la conexión
                if (mongoClient != null) {
                    mongoClient.close();
                }
            }
        }
    
        // Método para crear un usuario
        public static void crearUsuario(int cedula, String nombre, String origen) {
            try {
                Document usuario = new Document("cedula", cedula)
                                        .append("nombre", nombre)
                                        .append("origen", origen);
                coleccionUsuarios.insertOne(usuario);
                System.out.println("Usuario creado con ID: " + usuario.getObjectId("_id"));
            } catch (MongoException e) {
                System.err.println("Error al crear usuario: " + e);
            }
        }
    
        // Método para listar todos los usuarios
        public static void listarUsuarios() {
            try {
                for (Document usuario : coleccionUsuarios.find()) {
                    System.out.println(usuario.toJson());
                }
            } catch (MongoException e) {
                System.err.println("Error al listar usuarios: " + e);
            }
        }
    
        // Método para actualizar un usuario
        public static void actualizarUsuario(ObjectId idUsuario, int nuevaCedula, String nuevoNombre, String nuevoOrigen) {
            try {
                Document filtro = new Document("_id", idUsuario);
                Document nuevosDatos = new Document();
    
                if (nuevaCedula > 0) {
                    nuevosDatos.append("cedula", nuevaCedula);
                }
                if (nuevoNombre != null) {
                    nuevosDatos.append("nombre", nuevoNombre);
                }
                if (nuevoOrigen != null) {
                    nuevosDatos.append("origen", nuevoOrigen);
                }
    
                if (!nuevosDatos.isEmpty()) {
                    Document actualizacion = new Document("$set", nuevosDatos);
                    coleccionUsuarios.updateOne(filtro, actualizacion);
                    System.out.println("Usuario con ID " + idUsuario + " actualizado.");
                } else {
                    System.out.println("No se proporcionaron nuevos datos para actualizar.");
                }
            } catch (MongoException e) {
                System.err.println("Error al actualizar usuario: " + e);
            }
        }
    
        // Método para eliminar un usuario
        public static void eliminarUsuario(ObjectId idUsuario) {
            try {
                Document filtro = new Document("_id", idUsuario);
                coleccionUsuarios.deleteOne(filtro);
                System.out.println("Usuario con ID " + idUsuario + " eliminado.");
            } catch (MongoException e) {
                System.err.println("Error al eliminar usuario: " + e);
            }
        }

}
