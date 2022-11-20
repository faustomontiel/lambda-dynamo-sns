// Import required AWS SDK clients and commands for Node.js
import { PublishCommand } from "@aws-sdk/client-sns";
import { snsClient } from "./snsClient.js";

async function sendEmail(new_record){
    try {
        
        var data = "";
        
        var params = {
            TargetArn: '<ARN-SNS>',
            Message:JSON.stringify({'default': JSON.stringify(new_record)}),
            //MessageStructure:'json'
          };
        
        if (new_record != undefined){
            data = await snsClient.send(new PublishCommand(params));
            console.log("Success send.",  data);
        }
        
        return data; 
      }  catch (err) {
      console.log("Error: " + err);
      return err;
    }
  }

export const handler = async(event) => {
    // TODO implement
    try {   
        
        for (const record of event['Records']) {
          await sendEmail(record['dynamodb']['NewImage'])
        }
        
        return { body: 'Successfully SNS send!' }

  } catch (err) {
    console.log("Error: " + err);
    return { error: err }
  }
    
};
