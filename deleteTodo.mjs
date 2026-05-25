import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {

  const userId = "user-1";
  const todoId = event.pathParameters.todoId;

  await db.send(new DeleteCommand({
    TableName: "Todos",
    Key: {
      userId: userId,
      todoId: todoId
    }
  }));

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ message: "Deleted" })
  };
};
