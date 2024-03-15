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
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableHeader,
    TableFooter,
    TableRow,
    Accordion,
    DescriptionList,
    DescriptionListItem
  } from "@hubspot/ui-extensions";
  import { useEffect } from "react";


  // Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
    <SongsCard
      context={context}
      runServerless={runServerlessFunction}
      fetchProperties={actions.fetchCrmObjectProperties}
      onAlertClick={actions.addAlert}
    />
  ));

  


  const SongsCard = ({ fetchProperties, runServerless, onAlertClick }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [res, setRes] = useState({})
    const [songsArray, setSongsArray] = useState([])

    const executeServerlessFunction = () => {
      
      const serverlessResult = runServerless({
          name: "myFunc",
          parameters: { firstName: firstName, lastName: lastName }
        })
        
        if (serverlessResult.status === 'SUCCESS') {
          setRes(serverlessResult)
          console.log(res)
        }
        else {
          console.error("Error executing serverless function: ", serverlessResult.err)
        }
        
    }
    executeServerlessFunction();
    
    // useEffect(() => {
    //   executeServerlessFunction();
    //   console.log(res);
    // },[])
    




    // useEffect(() => {
    //     fetchProperties(["firstname", "lastname"])
    //         .then(properties => {
    //             setFirstName(properties.firstname);
    //             setLastName(properties.lastname);
    //         })
    // }, [fetchProperties]);

    // const executeServerlessFunction = async () => {
    //   const [res, setRes] = useState({})
    //   useEffect(async () => {
    //     const serverlessResult = await runServerless({
    //       name: "myFunc",
    //       parameters: { firstName: firstName, lastName: lastName }
    //     })
    //     if (serverlessResult.status === 'SUCCESS') {
    //       //onAlertClick({message: serverlessResult.response.alertMessage, type: "success"})
    //       //setRes(JSON.stringify(serverlessResult))
    //       setRes(serverlessResult)
    //       //console.log('output of serverlessResult is ' + (JSON.stringify(serverlessResult)))
    //       //const songsArray = res.tracks.map(track => ({ name: track.name }))
    //       //const songsArray = res.tracks.map(track => setSongsArray(track.name))
    //       //console.log(res.tracks.map(track => ({ name: track.name })))
    //       //console.log(JSON.parse(JSON.stringify(res)))
    //       console.log(res)
    //     } else {
    //       console.error("Error executing serverless: ", serverlessResult.message)
    //     }
    //   }, [])
    // }

    // executeServerlessFunction();

    // useEffect(() => {
    //   const executeServerlessFunction = async () => {
    //     const [res, setRes] = useState({})
    //     const serverlessResult = await runServerless({
    //       name: "myFunc",
    //       parameters: { firstName: firstName, lastName: lastName }
    //     })
    //     if (serverlessResult.status === 'SUCCESS') {
    //       setRes(serverlessResult)
    //       console.log(res)
    //     }
    //     else {
    //       console.error("Error executing serverless function: ", serverlessResult.message)
    //     }
    //   }
    // })

    // useEffect(async () => {
    //   const serverlessResult = await runServerless({
    //     name: "myFunc",  
    //     parameters: { firstName: firstName, lastName: lastName }
    //   })
    //   if (serverlessResult.status === 'SUCCESS') {
    //     //onAlertClick({message: serverlessResult.response.alertMessage, type: "success"})
    //     //setRes(JSON.stringify(serverlessResult))
    //     setRes(serverlessResult)
    //     //console.log('output of serverlessResult is ' + (JSON.stringify(serverlessResult)))
    //     //const songsArray = res.tracks.map(track => ({ name: track.name }))
    //     //const songsArray = res.tracks.map(track => setSongsArray(track.name))
    //     //console.log(res.tracks.map(track => ({ name: track.name })))
    //     //console.log(JSON.parse(JSON.stringify(res)))
    //     console.log(res)
    //   } else {
    //     console.error("Error executing serverless: ", serverlessResult.message)
    //   }
    // }, [])

    


    // useEffect(() => {
    //   serverlessResult.tracks.map(track => setTrack(track))
    // })

    // const executeServerlessFunction = async () => {
    //   const serverlessResult = await runServerless({
    //     name: "myFunc",
    //     parameters: { firstName: firstName, lastName: lastName }
    //   })
    //   if (serverlessResult.status === 'SUCCESS') {
    //     //onAlertClick({message: serverlessResult.response.alertMessage, type: "success"})
    //     //setRes(JSON.stringify(serverlessResult))
    //     setRes(serverlessResult)
    //     //console.log('output of serverlessResult is ' + (JSON.stringify(serverlessResult)))
    //     //const songsArray = res.tracks.map(track => ({ name: track.name }))
    //     //const songsArray = res.tracks.map(track => setSongsArray(track.name))
    //     //console.log(res.tracks.map(track => ({ name: track.name })))
    //     //console.log(JSON.parse(JSON.stringify(res)))
    //     console.log(res)
    //   } else {
    //     console.error("Error executing serverless: ", serverlessResult.message)
    //   }
    // }
    return(
      <>
        <Table bordered={true} paginated={true} pageCount="5">
          <TableHead>
            <TableRow>
              <TableHeader>Song Name</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Tim Robinson</TableCell>
            </TableRow>
          </TableBody>
       </Table>
      </>
    
    
    
    
    
    
)

    // return (
    //   <>
    //     <Flex>
    //       <Button type="submit" onClick={executeServerlessFunction}>
    //         Click me
    //       </Button>
    //       <Text>Hi</Text>
    //       <Text>
    //         <ul>
    //           {res.tracks.map((track, index)=> {
    //             <li key={index}>
    //               <span>Name: {track.name}</span>

    //             </li>
    //           })}
    //         </ul>
    //       </Text>
    //     </Flex>

        
    //   </>
    // )

    
  }