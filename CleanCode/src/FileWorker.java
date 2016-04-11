import javax.json.*;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.StringReader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.util.List;

/**
 * Created by Алескандр on 27.02.2016.
 */
public class FileWorker {
    public void fromFile(List<Message> messages) {
        try {
            String data = Files.readAllLines(Paths.get("Chat.json")).toString();
            JsonReader reader = Json.createReader(new StringReader(data));
            JsonArray personArray = reader.readArray();

            if (personArray.size() == 0) {
                System.out.println("File is empty!");
            } else {
                JsonArray newArray = personArray.getJsonArray(0);
                reader.close();

                for (int i = 0; i < newArray.size(); i++) {
                    JsonObject newObject = newArray.getJsonObject(i);

                    Timestamp time = new Timestamp(newObject.getJsonNumber("timestamp").longValue());
                    Message letter = new Message(newObject.getString("id"),
                            newObject.getString("message"),
                            newObject.getString("author"), time);

                    messages.add(letter);
                }

                for (Message it : messages) {
                    System.out.println(it.toString());
                }
            }
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }

    public void inFile(List<Message> messages) {
        try {
            if (!messages.isEmpty()) {
                File file = new File("Chat.json");
                FileWriter writer = new FileWriter(file);
                JsonWriter jsonWriter = Json.createWriter(writer);
                JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

                for (Message it : messages) {
                    arrayBuilder.add(Json.createObjectBuilder().add("id", it.getId())
                            .add("message", it.getMessage())
                            .add("author", it.getAuthor())
                            .add("timestamp", it.getTimestamp().getTime()).build());
                }

                JsonArray personArray = arrayBuilder.build();
                jsonWriter.writeArray(personArray);
                jsonWriter.close();
                writer.close();
            } else {
                System.out.println("File is empty!");
            }
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }
}
