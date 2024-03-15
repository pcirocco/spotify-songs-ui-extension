import React, { useState } from "react";
import {
  Divider,
  Link,
  Button,
  Text,
  Input,
  Stack,
  Flex,
  hubspot,
  Accordion,
  DescriptionList,
  DescriptionListItem
} from "@hubspot/ui-extensions";


// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    onAlertClick={actions.addAlert}
  />
));



const Extension = ({ context, runServerless, onAlertClick}) => {
  const [inputValue, setInputValue] = useState("");
  const executeServerlessFunction = async () => {
    const serverlessResult = await runServerless({
      name: "myFunc",
      parameters: { inputValue }
    });
    if (serverlessResult.status === 'SUCCESS') {
      onAlertClick({message: serverlessResult.response.alertMessage, type: "success"})
    } else {
      console.error("Error executing serverless: ", serverlessResult.message)
    }
  }
  return (
    <>
      <Flex>
        <Input
          name='text'
          label="Send to serverless"
          onInput={(inputValue) => setInputValue(inputValue)}
        />
        <Button type="submit" onClick={executeServerlessFunction}>
          Click me
        </Button>
      </Flex>
    </>
  )
}

// Define the Extension component, taking in runServerless, context, & sendAlert as props
// const Extension = ({ context, runServerless, sendAlert }) => {
//   const [text, setText] = useState("");

//   // Call serverless function to execute with parameters.
//   // The `myFunc` function name is configured inside `serverless.json`
//   const handleClick = async () => {
//     const { response } = await runServerless({ name: "myFunc", parameters: { text: text } });
//     sendAlert({ message: response });
//   };

//   return (
//     <>
//       <Accordion title="Test Item One" defaultOpen={false}>
//         <DescriptionList>
//           <DescriptionListItem label={'Name'}>
//             <Text>
//               {context.user.firstName}
//             </Text>
//           </DescriptionListItem>
//           <DescriptionListItem label={'Last Name'}>
//             <Text>
//               {context.user.lastName}
//             </Text>
//           </DescriptionListItem>
//         </DescriptionList>
//       </Accordion>
//       <Accordion title="Test Item Two" defaultOpen={false}>
//         <Text> This is test text between the second accordian title</Text>
//       </Accordion>
//     </>
//   );
// };
