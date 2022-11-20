import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall,unmarshall } from "@aws-sdk/util-dynamodb";
import { ddbClient } from "./ddbClient";
import { v4 as uuidv4 } from 'uuid';

async function createItem(record){
  try {
    
    const params = {
        TableName : "orders",
        /* Item properties will depend on your application concerns */
        Item: {
            orderId:uuidv4(),
            order: record
        }
    }

    const createResult = await ddbClient.send(new PutItemCommand(params));
    console.log(createResult);

  } catch (err) {
    console.log("Error: " + err);
    return err;
  }
}


export const handler = async(event) => {
    // TODO implement
    try {   

        //console.log(event['Records']);

        event['Records'].forEach(async record  => {
            await createItem(record['body'])
          } 
        );        

        return { body: 'Successfully created item!' }

  } catch (err) {
    console.log("Error: " + err);
    return { error: err }
  }
    
};


