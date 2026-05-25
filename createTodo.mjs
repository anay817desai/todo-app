import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {

  const userId = "user-1";
  const body = JSON.parse(event.body);

  const newTodo = {
    userId: userId,
    todoId: Date.now().toString(),
    text: body.text,
    done: false
  };

  await db.send(new PutCommand({
    TableName: "Todos",
    Item: newTodo
  }));

  return {
    statusCode: 201,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(newTodo)
  };
};
