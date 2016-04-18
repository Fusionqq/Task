import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.rmi.server.UID;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by Алескандр on 27.02.2016.
 */
public class Chat {
    private FileWorker worker;
    private Finder finder;

    public Chat() {
        worker = new FileWorker();
        finder = new Finder();
    }

    public void goChat() {
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
            List<Message> messages = new ArrayList<>();
            FileWriter writer = new FileWriter("logfile.txt", true);
            String s = "";
            System.out.println("Select action:");
            System.out.println("1:Loading from file.");
            System.out.println("2:Writing into file.");
            System.out.println("3:Writing a new message.");
            System.out.println("4:Delete the message by ID.");
            System.out.println("5:Chronological order of messages.");
            System.out.println("6:Search by author.");
            System.out.println("7:Search by keyword.");
            System.out.println("8:View messages for the period.");
            System.out.println("9:Exit.");

            switcher(reader, messages, writer, s);
            writer.close();
            reader.close();
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }

    public void switcher(BufferedReader reader, List<Message> messages, FileWriter writer, String s) {
        try {
            while (!s.equals("10")) {
                s = reader.readLine();

                switch (s) {
                    case "1": {
                        worker.fromFile(messages);
                        break;
                    }
                    case "2": {
                        worker.inFile(messages);
                        break;
                    }
                    case "3": {
                        newMessage(reader, messages, writer);
                        break;
                    }
                    case "4": {
                        deleteMessage(reader, messages, writer);
                        break;
                    }
                    case "5": {
                        chronologicalOrder(messages);
                        break;
                    }
                    case "6": {
                        finder.searchByAuthor(reader, messages, writer);
                        break;
                    }
                    case "7": {
                        finder.searchByKeyword(reader, messages, writer);
                        break;
                    }
                    case "8": {
                        finder.viewMessagesForThePeriod(reader, messages, writer);
                        break;
                    }
                    case "9": {
                        System.out.println("Goodbye!");
                        System.exit(0);
                        break;
                    }
                    default: {
                        System.out.println("Error!");
                        writer.write("Error! " + new Timestamp(System.currentTimeMillis()) + "\n");
                        writer.flush();
                        break;
                    }
                }
            }
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }

    private void chronologicalOrder(List<Message> messages) {
        if (!messages.isEmpty()) {
            Collections.sort(messages);
            for (Message it : messages) {
                System.out.println(it.toString());
            }
        } else {
            System.out.println("File is empty!");
        }
    }

    public void newMessage(BufferedReader reader, List<Message> messages, FileWriter writer) {
        try {
            System.out.println("Enter a new name:");
            String author = reader.readLine();
            System.out.println("Enter a new message:");
            String message = reader.readLine();
            int count  = 0;

            if (message.length() > 140) {
                System.out.println("Message is too large!");
                writer.write("Message is too large on "
                        + new Timestamp(System.currentTimeMillis()).toString() + "\n");
                return;
            }

            Message newMessage = new Message(new UID().toString(), message, author, new Timestamp(System.currentTimeMillis()));
            messages.add(newMessage);
            count++;

            writer.write("Request: new message on " + new Timestamp(System.currentTimeMillis())
                    + "\t Amount of new messages: " + count + "\n");
            writer.flush();

            System.out.println("Message has been successfully add.");
            System.out.println(newMessage.toString());
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }

    public void deleteMessage(BufferedReader reader, List<Message> messages, FileWriter writer) {
        try {
            if (!messages.isEmpty()) {
                System.out.println("Enter id:");
                String id = reader.readLine();
                int size = messages.size();

                for (int i = 0; i < messages.size(); i++) {
                    if (messages.get(i).getId().equals(id)) {
                        messages.remove(i);
                    }
                }

                writer.write("Request: delete message on " + new Timestamp(System.currentTimeMillis())
                        + "\t Amount of deleted messages: " + (size - messages.size()) + "\n");
                writer.flush();
                System.out.println("Message has been successfully removed.");
            } else {
                System.out.println("File is empty!");
            }
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }
}
