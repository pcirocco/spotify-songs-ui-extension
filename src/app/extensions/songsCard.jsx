import React, { useCallback, useState } from "react";
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
    DescriptionListItem,
    Image
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      fetchProperties(["firstname", "lastname"])
        .then(properties => {
          setFirstName(properties.firstname);
          setLastName(properties.lastname);
      });
  }, [fetchProperties]);
    
      useEffect(() => {
        const executeServerlessFunction = async () => {
          try {
            const serverlessResult = await runServerless({
              name: "myFunc",
              parameters: { firstName, lastName }
            });
    
            if (serverlessResult.status === "SUCCESS" && Object.values(serverlessResult.response).length !== 0) {
              setRes(serverlessResult);
              setIsLoading(false);
              console.log(serverlessResult)
            } else {
              console.error("Error executing serverless function: ", serverlessResult);
            }
          } catch (error) {
            console.error("An error occurred: ", error);
          }
        };
    
        executeServerlessFunction();
      }, [isLoading, firstName, lastName]);
    
      useEffect(() => {
        console.log(res);
      }, [res]);
    
    
      //This is the code for the first url to return static T-swift infomation
      return (
        <>
          {isLoading ? (
            <Flex>
              <Text>Loading...</Text>
            </Flex>
            
          ) : (
            <Flex>
              <Table bordered={true} paginated={false} pageCount="5">
                <TableHead>
                  <TableRow>
                    <TableHeader>Song Name</TableHeader>
                    <TableHeader>Album</TableHeader>
                    <TableHeader>Album Cover</TableHeader>
                    <TableHeader>Song Link</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {res.response.trackInfo.tracks.map((track, index) => (
                    <TableRow>
                        <TableCell>{track.name}</TableCell>
                        <TableCell>{track.album.name}</TableCell>
                        <TableCell><Image 
                          alt="Taylor swift album cover"
                          src={track.album.images[2].url}
                        /></TableCell>
                        <TableCell><Link href={track.external_urls.spotify} target="_blank">{track.external_urls.spotify}</Link></TableCell>
                   </TableRow>
                  ))} 

                </TableBody>
              </Table>
              
              
            </Flex>
          )}
        </>
      );
    
  }