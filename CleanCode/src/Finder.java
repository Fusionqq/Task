import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


/**
 * Created by Алескандр on 27.02.2016.
 */
public class Finder {
    public Finder() {

    }

    public void searchByAuthor(BufferedReader reader, List<Message> messages, FileWriter writer) {
        try {
            if (!messages.isEmpty()) {
                System.out.println("Enter the name:");

                String name = reader.readLine();
                Boolean found = false;
                int count = 0;

                for (Message message : messages)
                    if (message.getAuthor().equals(name)) {
                        found = true;
                        count++;
                        System.out.println(message.toString());
                    }
                if (!found) {
                    System.out.println("No message from " + name);
                }

                writer.write("Request: searching by author on " + new Timestamp(System.currentTimeMillis())
                        + "\t Amount of messages: " + count + "\n");
                writer.flush();
            } else {
                System.out.println("File is empty!");
            }
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }


    public void searchByKeyword(BufferedReader reader, List<Message> messages, FileWriter writer) {
        try {
            if (!messages.isEmpty()) {
                System.out.println("Enter the keyword:");

                String word = reader.readLine();
                Boolean found = false;
                int count = 0;

                for (Message it : messages)
                    if (it.getMessage().contains(word)) {
                        found = true;
                        count++;
                        System.out.println(it.toString());
                    }
                if (!found) {
                    System.out.println("No message contains " + word);
                }

                writer.write("Request: searching by keyword on " + new Timestamp(System.currentTimeMillis())
                        + "\t Amount of messages: " + count + "\n");
                writer.flush();
            } else {
                System.out.println("File is empty!");
            }
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }

    public void viewMessagesForThePeriod(BufferedReader reader, List<Message> messages, FileWriter writer) {
        try {
            if (!messages.isEmpty()) {
                System.out.println("Enter the beginning of period: yyyy-MM-dd HH:mm:ss");
                String begin = reader.readLine();
                System.out.println("Enter the end of period: yyyy-MM-dd HH:mm:ss");
                String end = reader.readLine();

                int count = 0;

                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

                try {
                    Date dateBegin = format.parse(begin);
                    Date dateEnd = format.parse(end);
                    Timestamp time1 = new Timestamp(dateBegin.getTime());
                    Timestamp time2 = new Timestamp(dateEnd.getTime());

                    if (time2.compareTo(time1) < 0) {
                        System.out.println("Wrong input.");
                        return;
                    }

                    for (Message it : messages)
                        if (it.getTimestamp().compareTo(time1) >= 0 && it.getTimestamp().compareTo(time2) <= 0) {
                            System.out.println(it.toString());
                            count++;
                        }
                    writer.write("Request: searching by a period of time on " + new Timestamp(System.currentTimeMillis())
                            + "\t Amount of found messages: " + count + "\n");
                    writer.flush();

                } catch (ParseException e) {
                    System.out.println(e.getMessage());
                }

            } else {
                System.out.println("File is empty!");
            }
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }
}
